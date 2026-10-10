import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Resilient Gemini API Caller with Model Fallbacks & 503/429 High-Demand Retries
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    primaryModel?: string;
  }
) {
  // Recommended production models according to @google/genai guidelines
  const modelCandidates = [
    params.primaryModel || "gemini-3.7-flash",
    "gemini-3.1-flash-lite",
    "gemini-3.1-pro-preview",
  ];

  let lastError: any = null;

  for (const model of modelCandidates) {
    try {
      // Set a 6-second timeout per model attempt to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout calling model ${model}`)), 6000)
      );

      const generatePromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });

      const response: any = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code || err?.error?.code || err?.message || "unknown";
      console.warn(`[Gemini Fallback] Model '${model}' failed with (${status}). Trying alternative...`);
    }
  }

  throw lastError;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Server-side Gemini AI Grooming & Barber Consultation endpoint
  app.post("/api/ai-consultant", async (req, res) => {
    try {
      const { faceShape, hairType, beardStyle, occasion, lifestyle, notes, language = "ky" } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // High quality fallback tailored response if GEMINI_API_KEY is not yet populated
        const fallbackResponse = getFallbackConsultation(faceShape, hairType, beardStyle, occasion, language);
        return res.json({
          success: true,
          consultation: fallbackResponse,
          isAiGenerated: false
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const langInstructions = language === "ky" 
        ? "Respond in natural, elegant, and professional Kyrgyz language (кыргызча)." 
        : language === "ru" 
        ? "Respond in refined and professional Russian language." 
        : "Respond in sophisticated and articulate English.";

      const prompt = `You are the Head Master Barber & Creative Director of 'Sovereign & Co. Bespoke Barbershop' located in Gaithersburg, Maryland.
A discerning gentleman has requested a personalized grooming consultation.

Client Profile:
- Face Shape: ${faceShape || "Oval"}
- Hair Type / Texture: ${hairType || "Straight/Wavy"}
- Current / Desired Beard: ${beardStyle || "Sculpted Short Beard"}
- Primary Occasion / Goal: ${occasion || "Executive Daily & High-end events"}
- Lifestyle: ${lifestyle || "Professional / Active"}
- Additional Client Requests: ${notes || "Looking for sharp, timeless and low maintenance styling"}

Task:
${langInstructions}
Provide a structured, ultra-premium consultation containing:
1. Recommended Hairstyle & Precision Technique (Explain why this complements their face shape and hair texture)
2. Beard Architecture & Lineup Strategy (Cheekbone taper, jawline sharpness, neckline guidelines)
3. Styling & Daily Ritual Routine (Step-by-step 3-minute morning routine)
4. Recommended Sovereign Apothecary Products (e.g., Matte Clay, Argan Beard Elixir, Sea Salt Spray)
5. Maintenance Schedule (Recommended frequency of touch-ups at our Gaithersburg atelier)

Format the output clearly with stylish headings, bullet points, and an encouraging, distinguished master-barber tone.`;

      const response = await callGeminiWithFallback(ai, {
        primaryModel: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      const adviceText = response.text || "";

      return res.json({
        success: true,
        consultation: adviceText,
        isAiGenerated: true
      });
    } catch (error) {
      console.error("Gemini API Consultation Error:", error);
      const { faceShape, hairType, beardStyle, occasion, language = "ky" } = req.body;
      const fallbackResponse = getFallbackConsultation(faceShape, hairType, beardStyle, occasion, language);
      return res.json({
        success: true,
        consultation: fallbackResponse,
        isAiGenerated: false,
        errorNote: "Used expert master-barber fallback preset."
      });
    }
  });

  // Server-side Gemini AI Live Chatbot / Sovereign Concierge endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages = [], language = "en" } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const latestUserMessage = messages.filter((m: any) => m.role === "user" || m.sender === "user").slice(-1)[0]?.text || "";

      // Detect if user query is explicitly in Kyrgyz or Russian
      const isKyrgyzQuery = /[өүңӨҮҢ]|дарек|убакыт|кызмат|баа|брондоо|чебер|чач|сакал|салондун/i.test(latestUserMessage);
      const isRussianQuery = /[а-яА-ЯёЁ]/.test(latestUserMessage) && !isKyrgyzQuery;
      const effectiveLang = isKyrgyzQuery ? "ky" : (isRussianQuery ? "ru" : language);

      if (!apiKey) {
        const fallback = getFallbackChatResponse(latestUserMessage, effectiveLang);
        return res.json({
          success: true,
          reply: fallback.text,
          actionType: fallback.actionType,
          suggestedQuestions: fallback.suggestedQuestions,
          isAiGenerated: false
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const langDirective = effectiveLang === "ky"
        ? "Respond elegantly and courteously in Kyrgyz (кыргыз тилинде). Use natural, polite Kyrgyz phrasing."
        : effectiveLang === "ru"
        ? "Respond politely and refined in Russian. If the user writes in English, reply in English."
        : "Respond articulately, warmly, and refined in English. If the user writes in Kyrgyz or Russian, reply in their language.";

      const systemInstruction = `You are 'Sovereign Concierge', the prestigious AI Master Barber & Virtual Host for 'Sovereign & Co. Bespoke Barbershop' located at 120 Rio Blvd, Suite 400, Rio Lakefront / Downtown Crown, Gaithersburg, MD 20878. Phone: (301) 840-7700.

About Sovereign & Co.:
- Concept: An ultra-luxury men's grooming atelier & gentlemen's lounge. We blend Old-World European barbering with modern precision styling.
- Signature Amenities: Complimentary 18-year single malt scotch, espresso bar, eucalyptus-infused hot towels, imported Japanese Damascus steel razors, Italian Belmont leather chairs.
- Operating Hours: Monday to Saturday 9:00 AM – 8:00 PM, Sunday 10:00 AM – 6:00 PM.
- Atelier Location: 120 Rio Blvd, Suite 400, Rio Lakefront / Downtown Crown, Gaithersburg, MD 20878. Free customer parking available.
- Key Services & Pricing:
  * Signature Sovereign Cut ($75, 45 min) — Precision shear & taper work, straight razor neck lineup, hot towel aromatics, beverage.
  * Imperial Beard Sculpt & Hot Towel ($55, 35 min) — Razor-sharp cheeklines, length tailoring, organic oils.
  * The Sovereign Ceremony ($120, 75 min) — Full package: Haircut + Beard Sculpt + Purifying Facial + Scalp Massage.
  * Royal Straight Razor Shave ($65, 45 min) — 3-step hot lather & cold towel finish.
  * Father & Son Executive Package ($130, 75 min).
  * Gray Blending & Scalp Detox ($60, 40 min).
- Master Barbers:
  * Alexander "Sovereign" Vance (Founder & Scissor Maestro, 16 yrs exp)
  * Marcus Sterling (Fade Architect & Beard Specialist, 12 yrs exp)
  * Elijah Thorne (Classic Scissor & Shave Specialist, 14 yrs exp)
  * Christian Miller (Modern Texture & Fade Artist, 9 yrs exp)
- Sovereign Apothecary Products: Matte Clay Pomade ($32), Royal Cedarwood Beard Oil ($36), Sea Salt Texture Mist ($28), Damascus Straight Razor ($120).
- VIP Club: Silver Heritage ($120/mo), Gold Sovereign ($220/mo), Black Diamond Elite ($380/mo).

Guidelines for Sovereign Concierge:
- Tone: Highly distinguished, hospitable, knowledgeable, respectful, concise, and courteous (like a high-end luxury private club concierge).
- ${langDirective}
- Assist with booking appointments, styling advice for face shapes/hair types, product advice, hours, parking, or prices.
- When recommending services, mention that users can click 'Book Online' or select their preferred master barber directly on this page.
- Keep answers focused, practical, and structured with clean bullet points.`;

      // Build sanitized conversation contents for generateContent
      const rawItems = messages
        .map((m: any) => ({
          role: (m.role === "user" || m.sender === "user") ? "user" : "model",
          text: (m.text || m.content || "").trim()
        }))
        .filter((item: any) => item.text.length > 0);

      // Find first user message (Gemini API requires contents to start with role: 'user')
      const firstUserIdx = rawItems.findIndex((item: any) => item.role === "user");
      const validItems = firstUserIdx >= 0 ? rawItems.slice(firstUserIdx) : [{ role: "user", text: latestUserMessage || "Hello" }];

      // Collapse consecutive same-role messages
      const finalContents: any[] = [];
      for (const item of validItems) {
        if (finalContents.length > 0 && finalContents[finalContents.length - 1].role === item.role) {
          finalContents[finalContents.length - 1].parts[0].text += `\n\n${item.text}`;
        } else {
          finalContents.push({
            role: item.role,
            parts: [{ text: item.text }]
          });
        }
      }

      const response = await callGeminiWithFallback(ai, {
        primaryModel: "gemini-2.5-flash",
        contents: finalContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I am at your service. How may I assist your grooming experience today?";

      // Determine smart action prompts based on response context
      let actionType: string | undefined = undefined;
      const lowerReply = replyText.toLowerCase();
      if (lowerReply.includes("book") || lowerReply.includes("appointment") || lowerReply.includes("брондоо") || lowerReply.includes("жазыл") || lowerReply.includes("запис")) {
        actionType = "book";
      } else if (lowerReply.includes("product") || lowerReply.includes("apothecary") || lowerReply.includes("pomade") || lowerReply.includes("май") || lowerReply.includes("масло")) {
        actionType = "apothecary";
      } else if (lowerReply.includes("service") || lowerReply.includes("price") || lowerReply.includes("меню") || lowerReply.includes("баа")) {
        actionType = "menu";
      } else if (lowerReply.includes("gaithersburg") || lowerReply.includes("дарек") || lowerReply.includes("адрес") || lowerReply.includes("убакыт") || lowerReply.includes("саат")) {
        actionType = "contact";
      }

      return res.json({
        success: true,
        reply: replyText,
        actionType,
        isAiGenerated: true
      });
    } catch (error) {
      console.error("Chat API Error:", error);
      const { messages = [], language = "en" } = req.body;
      const latestUserMessage = messages.filter((m: any) => m.role === "user" || m.sender === "user").slice(-1)[0]?.text || "";
      const isKyrgyzQuery = /[өүңӨҮҢ]|дарек|убакыт|кызмат|баа|брондоо|чебер|чач|сакал|салондун/i.test(latestUserMessage);
      const isRussianQuery = /[а-яА-ЯёЁ]/.test(latestUserMessage) && !isKyrgyzQuery;
      const effectiveLang = isKyrgyzQuery ? "ky" : (isRussianQuery ? "ru" : language);
      const fallback = getFallbackChatResponse(latestUserMessage, effectiveLang);
      return res.json({
        success: true,
        reply: fallback.text,
        actionType: fallback.actionType,
        suggestedQuestions: fallback.suggestedQuestions,
        isAiGenerated: false
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sovereign & Co. Barbershop server running on http://0.0.0.0:${PORT}`);
  });
}

function getFallbackChatResponse(query: string, language: string): { text: string; actionType?: string; suggestedQuestions?: string[] } {
  const q = (query || "").toLowerCase();

  if (language === "ky") {
    if (q.includes("брон") || q.includes("жазыл") || q.includes("баа") || q.includes("канча") || q.includes("кызматы")) {
      return {
        text: `Саламатсызбы! **Sovereign & Co. Элиталык Барбершопуна** кош келиңиз.

Биздин популярдуу кызматтар:
• **Signature Sovereign Cut** — $75 (45 мүнөт, ысык сүлгү, кыруу жана элиталык суусундук)
• **Imperial Beard Sculpt** — $55 (35 мүнөт, сакал контуру жана органикалык май)
• **The Sovereign Ceremony** — $120 (75 мүнөт, чач + сакал + бет күтүмү + баш массажы)

Сиз сайттан түз эле чеберди жана ыңгайлуу убакытты тандап брондой аласыз.`,
        actionType: "book",
        suggestedQuestions: ["Дарегиңиз жана иш убактыңыз?", "Кайсы чеберди сунуштайсыз?", "Чач жасалгасын кантип тандоо керек?"]
      };
    }
    if (q.includes("дарек") || q.includes("кайда") || q.includes("убакыт") || q.includes("саат")) {
      return {
        text: `📍 **Биздин Дарек:** 120 Rio Blvd, Suite 400, Rio Lakefront / Downtown Crown, Gaithersburg, MD 20878.
📞 **Телефон:** (301) 840-7700

⏰ **Иш тартиби:**
• Дүйшөмбү - Ишемби: 09:00 – 20:00
• Жекшемби: 10:00 – 18:00

Студиянын алдында кардарлар үчүн акысыз ыңгайлуу унаа токтотуучу жай бар.`,
        actionType: "contact",
        suggestedQuestions: ["Брондоо жасоо", "Баалар тизмеси", "AI Стилист менен кеңешүү"]
      };
    }
    return {
      text: `Саламатсызбы! Мен **Sovereign Concierge** — сиздин жеке виртуалдык чебериңизмин.

Сизге төмөнкү багыттар боюнча жардам бере алам:
1. ✂️ **Чач жана сакал кызматтарын онлайн брондоо**
2. 💈 **Жүз түзүлүшүңүзгө ылайыктуу чач стилин тандоо**
3. 🧴 **Sovereign Apothecary премиум каражаттары жөнүндө кеңеш**
4. 📍 **Гейтерсбургдагы салонубуздун дареги жана убактысы**

Сурооңузду жазыңыз же төмөнкү баскычтарды басыңыз!`,
      actionType: "menu",
      suggestedQuestions: ["Кызматтар жана баалар", "Онлайн брондоо", "Гейтерсбургдагы дарек"]
    };
  }

  if (language === "ru") {
    if (q.includes("цен") || q.includes("запис") || q.includes("скольк") || q.includes("услуг") || q.includes("стрижк")) {
      return {
        text: `Добро пожаловать в **Sovereign & Co. Bespoke Barbershop**!

Наши флагманские услуги:
• **Signature Sovereign Cut** — $75 (45 мин, мытье, распаривание полотенцем, укладка, комплимент от бара)
• **Imperial Beard Sculpt** — $55 (35 мин, скульптурирование бороды бритвой Damascus)
• **The Sovereign Ceremony** — $120 (75 мин, полный комплекс: стрижка + борода + детокс лица)

Вы можете забронировать удобный слот прямо сейчас на сайте.`,
        actionType: "book",
        suggestedQuestions: ["Где вы находитесь?", "Каких мастеров посоветуете?", "Подбор стрижки через AI"]
      };
    }
    if (q.includes("адрес") || q.includes("где") || q.includes("время") || q.includes("час") || q.includes("график")) {
      return {
        text: `📍 **Адрес:** 120 Rio Blvd, Suite 400, Rio Lakefront, Gaithersburg, MD 20878.
📞 **Телефон:** (301) 840-7700

⏰ **Часы работы:**
• Пн - Сб: 9:00 – 20:00
• Вс: 10:00 – 18:00

Для наших гостей предусмотрен бесплатный просторный паркинг у набережной Rio Lakefront.`,
        actionType: "contact",
        suggestedQuestions: ["Забронировать визит", "Прайс-лист услуг", "Средства для укладки"]
      };
    }
    return {
      text: `Здравствуйте! Я — **Sovereign Concierge**, ваш персональный ассистент и мастер-стилист.

Чем могу помочь сегодня:
1. ✂️ **Запись к топ-барберам в Гейтерсбурге**
2. 💈 **Подбор идеальной стрижки под форму лица**
3. 🧴 **Рекомендации по уходовой косметике Sovereign Apothecary**
4. 📍 **Информация о локации, часах работы и напитках лаунджа**

Задайте любой вопрос или выберите быстрый вариант ниже!`,
      actionType: "menu",
      suggestedQuestions: ["Услуги и цены", "Записаться онлайн", "Адрес в Гейтерсбурге"]
    };
  }

  // English fallback
  if (q.includes("price") || q.includes("book") || q.includes("cost") || q.includes("service") || q.includes("haircut")) {
    return {
      text: `Welcome to **Sovereign & Co. Bespoke Barbershop** in Gaithersburg, MD.

Our core atelier rituals:
• **Signature Sovereign Cut** — $75 (45 min, bespoke shears & fade, straight-razor neck lineup, hot towel, lounge beverage)
• **Imperial Beard Sculpt & Razor Lineup** — $55 (35 min, straight-razor cheekbones, length tailoring, organic oils)
• **The Sovereign Ceremony** — $120 (75 min, complete royal treatment: Cut + Beard + Facial + Scalp Massage)
• **Royal Straight Razor Shave** — $65 (45 min)

You can select a master barber and reserve your chair directly on our website.`,
      actionType: "book",
      suggestedQuestions: ["Location & Hours in Gaithersburg?", "Recommend a style for my face shape", "Tell me about Sovereign Apothecary products"]
    };
  }

  if (q.includes("location") || q.includes("address") || q.includes("hour") || q.includes("time") || q.includes("where") || q.includes("phone") || q.includes("parking")) {
    return {
      text: `📍 **Atelier Location:**
120 Rio Blvd, Suite 400, Rio Lakefront / Downtown Crown, Gaithersburg, MD 20878
📞 **Direct Line:** (301) 840-7700

⏰ **Operating Hours:**
• Monday – Saturday: 9:00 AM – 8:00 PM
• Sunday: 10:00 AM – 6:00 PM

Complimentary validated parking is available directly adjacent to the lakeside entrance.`,
      actionType: "contact",
      suggestedQuestions: ["Book an appointment", "View Full Menu & Pricing", "Consult AI Stylist"]
    };
  }

  return {
    text: `Greetings! I am **Sovereign Concierge**, your dedicated Virtual Master Barber & Host at Sovereign & Co.

How may I assist your grooming experience today?
• ✂️ **Schedule a reservation** with Alexander, Marcus, Elijah, or Christian
• 💈 **Get personalized haircut & beard recommendations**
• 🧴 **Inquire about our cold-pressed apothecary grooming line**
• 📍 **Directions, operating hours, and private lounge perks**

Feel free to ask any question or tap a suggestion below.`,
    actionType: "menu",
    suggestedQuestions: ["View Services & Pricing", "Book an appointment", "Our Gaithersburg location"]
  };
}

function getFallbackConsultation(faceShape: string, hairType: string, beardStyle: string, occasion: string, language: string): string {
  if (language === "ky") {
    return `### Sovereign & Co. Башкы Чеберинин Жекече Сунушу (Гейтерсбург, МД)

**1. Сунушталган чач жасалгасы: Executive Scissor Fade & Textured Pompadour**
• Сиздин ${faceShape || "сопак"} жүз түзүлүшүңүзгө капталдары так кырылган (Mid-Skin Taper), үстү көлөмдүү жана текстураланган классикалык форма идеалдуу келет.
• Бул форма беттин пропорциясын визуалдык жактан узартып, жаак сызыгына ачык тактык берет.

**2. Сакалдын архитектурасы & Контур:**
• ${beardStyle || "Кыска сакал"}: Жаак сөөктөрүнүн бойлото 45 градустук курч сызык түзүп, моюн сызыгын кекиртектен 1.5 см жогору так кыруу керек. 
• Бул күнүмдүк бизнес жолугушууларда жана иш-чараларда көрктүү көрүнүш тартуулайт.

**3. Күнүмдүк 3 мүнөттүк кам көрүү ритуалы:**
• Эртең менен: Чачты бир аз нымдап, Sea Salt Spray чачып, фен менен артка багыттап кургатуу.
• Андан соң Sovereign Matte Clay пастасынан аз өлчөмдө алып, табигый жалтырабаган текстура берүү.
• Сакалга 3-4 тамчы жылуу Argan & Sandalwood майын тамызып, щетка менен тароо.

**4. Сунушталган Sovereign Apothecary каражаттары:**
• *Sovereign Matte Clay Pomade* (Күчтүү кармайт, жылтырабайт)
• *Cold-Pressed Cedarwood & Jojoba Beard Oil*
• *Botanical Aftershave Tonic with Witch Hazel*

**5. Гейтерсбург салонуна келүү графиги:**
• Форманы кемчиликсиз сактоо үчүн 2-3 жумада бир жолу биздин Rio Lakefront студиябызга келүүнү сунуштайбыз.`;
  } else if (language === "ru") {
    return `### Персональная консультация Шеф-Барбера Sovereign & Co. (Гейтерсбург, МД)

**1. Рекомендуемая стрижка: Executive Scissor Fade & Textured Pompadour**
• Для вашей формы лица (${faceShape || "Овальное"}) идеально подходит аккуратный плавный переход на висках с текстурным верхом средней длины.
• Это подчеркивает мужественность и визуально выделяет линию скул.

**2. Архитектура бороды и контуринг:**
• Четкие диагональные линии по щекам с бритьем опасной бритвой Damascus. Плавная растушевка у висков.

**3. Утренний 3-минутный ритуал:**
• Нанесение спрея с морской солью перед сушкой феном, фиксация матовой пастой Sovereign Matte Clay.
• 3 капли масла сандалового дерева для шелковистости бороды.

**4. Рекомендованные продукты:**
• Матовая помада Sovereign High-Hold Matte Pomade
• Эликсир для бороды Sovereign Royal Cedarwood Oil

**5. График обновления:**
• Рекомендуемый визит в наш салон в Downtown Crown / Rio Lakefront каждые 14–18 дней.`;
  } else {
    return `### Master Barber Bespoke Consultation | Sovereign & Co. Gaithersburg

**1. Recommended Cut: Executive Low-Taper Fade with Textured Contour**
• Crafted specifically for your ${faceShape || "oval"} profile and ${hairType || "textured"} hair, providing masculine symmetry and clean architectural lines.

**2. Beard Sculpting & Lineup:**
• Razor-sharp cheekline gradient with Japanese straight-razor hot towel precision finish.

**3. 3-Minute Daily Morning Routine:**
• Light sea salt mist on damp hair, blow-dry with vented brush, lock with Sovereign Matte Clay.
• Nourish facial hair with cold-pressed Jojoba & Sandalwood elixir.

**4. Curated Apothecary:**
• Sovereign High-Hold Clay Pomade & Damascus Steel Pocket Comb.

**5. Maintenance Cadence:**
• Bi-weekly refinement at our Gaithersburg, MD salon suite.`;
  }
}

startServer();
