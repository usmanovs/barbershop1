import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Scissors, 
  MapPin, 
  Clock, 
  Calendar, 
  RefreshCw, 
  ChevronDown, 
  Bot, 
  User, 
  ShoppingBag,
  ExternalLink,
  Phone
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
  onOpenAiConsultant: () => void;
  onOpenCart?: () => void;
}

const renderFormattedText = (text: string, isUser: boolean) => {
  if (isUser) {
    return <span className="font-medium text-black">{text}</span>;
  }

  return (
    <div className="space-y-1.5 leading-relaxed">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={i} className={isBullet ? 'pl-2 text-white/95 flex items-start gap-1.5' : ''}>
            <div>
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-bold text-[#e6c987]">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function getClientSideFallback(query: string, language: Language): { text: string; actionType?: 'book' | 'menu' | 'ai_consultant' | 'contact' | 'apothecary'; suggestedQuestions?: string[] } {
  const q = (query || "").toLowerCase();
  const isKy = language === 'ky' || /[өүңӨҮҢ]|дарек|убакыт|кызмат|баа|брондоо|чебер|чач|сакал|салондун/i.test(q);
  const isRu = !isKy && (language === 'ru' || /[а-яА-ЯёЁ]/.test(q));

  if (isKy) {
    if (q.includes("дарек") || q.includes("кайда") || q.includes("убакыт") || q.includes("саат") || q.includes("салондун")) {
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
    if (q.includes("баа") || q.includes("кызмат") || q.includes("канча") || q.includes("брон") || q.includes("жазыл")) {
      return {
        text: `✂️ **Sovereign & Co. Элиталык Кызматтары:**
• **Signature Sovereign Cut** — $75 (45 мин, ысык сүлгү, кыруу, элиталык суусундук)
• **Imperial Beard Sculpt** — $55 (35 мин, сакал контуру жана органикалык май)
• **The Sovereign Ceremony** — $120 (75 мин, чач + сакал + бет күтүмү + массаж)

Сиз сайттан онлайн брондоо кыла аласыз.`,
        actionType: "book",
        suggestedQuestions: ["Дарегиңиз жана иш убактыңыз?", "Чеберлер жөнүндө", "AI Стилист менен кеңешүү"]
      };
    }
    return {
      text: `Саламатсызбы! Мен **Sovereign Concierge** — сиздин жеке виртуалдык чебериңизмин.

Сизге кызматтарды тандоодо, баалар боюнча, Гейтерсбургдагы салонго онлайн брондоодо же чач/сакал стили боюнча кеңеш берүүгө даярмын.`,
      actionType: "menu",
      suggestedQuestions: ["Салондун дареги жана иш убактысы", "Кызматтар жана баалар кандай?", "Онлайн брондоо жасоо"]
    };
  }

  if (isRu) {
    if (q.includes("адрес") || q.includes("где") || q.includes("время") || q.includes("час") || q.includes("график")) {
      return {
        text: `📍 **Адрес:** 120 Rio Blvd, Suite 400, Rio Lakefront, Gaithersburg, MD 20878.
📞 **Телефон:** (301) 840-7700

⏰ **Часы работы:**
• Пн - Сб: 9:00 – 20:00
• Вс: 10:00 – 18:00

Для наших гостей предусмотрен бесплатный просторный паркинг у набережной Rio Lakefront.`,
        actionType: "contact",
        suggestedQuestions: ["Записаться онлайн", "Услуги и цены", "Стилист по форме лица"]
      };
    }
    if (q.includes("цен") || q.includes("услуг") || q.includes("скольк") || q.includes("запис")) {
      return {
        text: `✂️ **Услуги Sovereign & Co.:**
• **Signature Sovereign Cut** — $75 (45 мин)
• **Imperial Beard Sculpt** — $55 (35 мин)
• **The Sovereign Ceremony** — $120 (75 мин)

Забронируйте визит к мастеру в удобное для вас время прямо на сайте.`,
        actionType: "book",
        suggestedQuestions: ["Адрес и график работы", "Мастера студии", "AI Стилист"]
      };
    }
    return {
      text: `Здравствуйте! Я — **Sovereign Concierge**, ваш персональный AI-ассистент барбершопа Sovereign & Co. Чем я могу вам помочь?`,
      actionType: "menu",
      suggestedQuestions: ["Адрес и график работы", "Услуги и цены", "Записаться онлайн"]
    };
  }

  if (q.includes("address") || q.includes("location") || q.includes("hour") || q.includes("time") || q.includes("where") || q.includes("phone")) {
    return {
      text: `📍 **Atelier Location:** 120 Rio Blvd, Suite 400, Rio Lakefront, Gaithersburg, MD 20878.
📞 **Phone:** (301) 840-7700

⏰ **Operating Hours:**
• Mon - Sat: 9:00 AM – 8:00 PM
• Sun: 10:00 AM – 6:00 PM

Complimentary validated parking is available.`,
      actionType: "contact",
      suggestedQuestions: ["Book an appointment", "View full menu & prices", "AI Face-shape styling advice"]
    };
  }

  return {
    text: `Welcome to **Sovereign & Co.** How may I assist your grooming experience today in our Gaithersburg atelier?`,
    actionType: "menu",
    suggestedQuestions: ["Location & operating hours", "Services & pricing", "Book an appointment"]
  };
}

export const ChatbotWidget: React.FC<Props> = ({
  language,
  onOpenBooking,
  onOpenAiConsultant,
  onOpenCart
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getInitialMessages = (lang: Language): ChatMessage[] => {
    if (lang === 'ky') {
      return [
        {
          id: 'welcome-1',
          sender: 'bot',
          timestamp: 'Азыр',
          text: `Саламатсызбы! Мен **Sovereign Concierge** — Sovereign & Co. Bespoke Barbershop студиясынын жеке AI чебери жана онлайн консьержимин.

Сизге кызматтарды тандоодо, баалар боюнча, Гейтерсбургдагы салонго онлайн брондоодо же чач/сакал стили боюнча кеңеш берүүгө даярмын.`,
          suggestedQuestions: [
            "Салондун дареги жана иш убактысы",
            "Кызматтар жана баалар кандай?",
            "Онлайн брондоо жасоо",
            "Жүзүмө кайсы чач стили келет?"
          ]
        }
      ];
    }
    if (lang === 'ru') {
      return [
        {
          id: 'welcome-1',
          sender: 'bot',
          timestamp: 'Сейчас',
          text: `Здравствуйте! Я — **Sovereign Concierge**, ваш персональный AI-ассистент и мастер-консультант барбершопа Sovereign & Co. в Гейтерсбурге.

Я с радостью помогу вам подобрать услугу, сориентировать по ценам, забронировать визит к мастеру или подобрать форму стрижки и уход.`,
          suggestedQuestions: [
            "Адрес и график работы",
            "Услуги и актуальные цены",
            "Записаться онлайн к мастеру",
            "Подбор стрижки под форму лица"
          ]
        }
      ];
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        timestamp: 'Just now',
        text: `Welcome to **Sovereign & Co.** I am your personal **AI Concierge & Master Barber Consultant**.

How may I assist your grooming experience today in our Gaithersburg, MD atelier?`,
        suggestedQuestions: [
          "Location & operating hours",
          "What are your services & prices?",
          "Book an appointment online",
          "Which haircut fits my face shape?"
        ]
      }
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(language));

  // Update initial message on language change if conversation hasn't expanded much
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages(getInitialMessages(language));
    }
  }, [language]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setHasOpenedOnce(true);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setLoading(true);

    const abortController = new AbortController();
    const fetchTimeout = setTimeout(() => abortController.abort(), 7000);

    try {
      // Send conversation history to backend Gemini Chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          })),
          language
        })
      });

      clearTimeout(fetchTimeout);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionType: data.actionType,
          suggestedQuestions: data.suggestedQuestions
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error("No response reply in payload");
      }
    } catch (err) {
      console.warn("Chat message fetch error or timeout, applying intelligent instant fallback:", err);
      const fallback = getClientSideFallback(text, language);
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: fallback.text,
        actionType: fallback.actionType,
        suggestedQuestions: fallback.suggestedQuestions
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      clearTimeout(fetchTimeout);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(getInitialMessages(language));
  };

  const handleActionClick = (actionType?: string, actionData?: string) => {
    if (actionType === 'book') {
      setIsOpen(false);
      onOpenBooking(actionData);
    } else if (actionType === 'ai_consultant') {
      setIsOpen(false);
      onOpenAiConsultant();
    } else if (actionType === 'menu') {
      setIsOpen(false);
      const el = document.getElementById('services-menu-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'apothecary') {
      setIsOpen(false);
      const el = document.getElementById('apothecary-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'contact') {
      setIsOpen(false);
      const el = document.getElementById('location-hours-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            id="chatbot-trigger-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-[#111113] hover:bg-[#18181d] border border-[#c5a059]/60 hover:border-[#c5a059] text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.25)] transition-all duration-300 transform hover:scale-105 cursor-pointer"
            aria-label="Open Sovereign AI Concierge"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a059]"></span>
            </span>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059] animate-pulse" />
              <span className="font-cinzel text-xs font-bold tracking-wider text-[#f0f0f0]">
                {language === 'ky' ? "AI Чебер" : language === 'ru' ? "AI Консьерж" : "AI Concierge"}
              </span>
            </div>

            {unreadCount > 0 && !hasOpenedOnce && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c5a059] text-black text-[10px] font-bold flex items-center justify-center shadow-lg border border-black animate-bounce">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div 
          id="chatbot-window-panel"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#0f0f12] border border-[#c5a059]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#16161a] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#16161a]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-cinzel text-sm font-bold text-white tracking-wide">
                    Sovereign Concierge
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#c5a059]/20 text-[#c5a059] font-mono">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[11px] text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#c5a059]" />
                  <span>Gaithersburg, MD • Atelier Live</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick info alert banner */}
          <div className="px-3.5 py-1.5 bg-[#1a1a20] border-b border-white/5 flex items-center justify-between text-[11px] text-white/60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#c5a059]" />
              <span>Mon-Sat: 9AM - 8PM | Sun: 10AM - 6PM</span>
            </span>
            <button
              onClick={() => handleActionClick('book')}
              className="text-[#c5a059] hover:underline font-semibold text-[10px] uppercase tracking-wider"
            >
              {language === 'ky' ? "Брондоо" : language === 'ru' ? "Запись" : "Book Now"}
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0a0a0c]/80 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#1c1c22] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[84%] space-y-2`}>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#c5a059] to-[#b38f48] text-black font-medium rounded-tr-xs shadow-md'
                        : 'bg-[#16161b] text-white/90 border border-white/10 rounded-tl-xs shadow-md font-light'
                    }`}
                  >
                    {renderFormattedText(msg.text, msg.sender === 'user')}
                  </div>

                  {/* Contextual Action Button if bot recommended an action */}
                  {msg.sender === 'bot' && msg.actionType && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actionType === 'book' && (
                        <button
                          type="button"
                          onClick={() => handleActionClick('book')}
                          className="px-3 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#dfba6f] text-black font-semibold text-[11px] flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        >
                          <Scissors className="w-3 h-3" />
                          <span>{language === 'ky' ? "Чеберге жазылуу" : language === 'ru' ? "Записаться к барберу" : "Book Appointment Online"}</span>
                        </button>
                      )}

                      {msg.actionType === 'menu' && (
                        <button
                          type="button"
                          onClick={() => handleActionClick('menu')}
                          className="px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#252530] border border-[#c5a059]/50 text-[#c5a059] font-medium text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{language === 'ky' ? "Кызматтар тизмесин көрүү" : language === 'ru' ? "Смотреть меню услуг" : "View Service Menu"}</span>
                        </button>
                      )}

                      {msg.actionType === 'apothecary' && (
                        <button
                          type="button"
                          onClick={() => handleActionClick('apothecary')}
                          className="px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#252530] border border-white/10 text-white/80 font-medium text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#c5a059]" />
                          <span>{language === 'ky' ? "Apothecary Дүкөнү" : language === 'ru' ? "Бутик косметики" : "Apothecary Boutique"}</span>
                        </button>
                      )}

                      {msg.actionType === 'contact' && (
                        <button
                          type="button"
                          onClick={() => handleActionClick('contact')}
                          className="px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#252530] border border-white/10 text-white/80 font-medium text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <MapPin className="w-3 h-3 text-[#c5a059]" />
                          <span>{language === 'ky' ? "Дарек & Карта" : language === 'ru' ? "Адрес и карта" : "Location & Map"}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Suggested follow-up prompt chips */}
                  {msg.sender === 'bot' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-col gap-1 pt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="text-left px-2.5 py-1.5 rounded-lg bg-[#131317] hover:bg-[#1c1c24] border border-white/5 hover:border-[#c5a059]/40 text-[11px] text-white/70 hover:text-white transition-all cursor-pointer"
                        >
                          💬 {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] text-white/30 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-white/50">
                <div className="w-7 h-7 rounded-full bg-[#1c1c22] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="p-3 rounded-2xl bg-[#16161b] border border-white/10 rounded-tl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Category Bar */}
          <div className="px-3 py-2 bg-[#121216] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => handleSendMessage(language === 'ky' ? "Кызматтар жана баалар тизмеси" : language === 'ru' ? "Цены и список услуг" : "Services & Pricing Menu")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-white/70 hover:text-white transition-colors"
            >
              ✂️ {language === 'ky' ? "Баалар" : language === 'ru' ? "Цены" : "Prices"}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(language === 'ky' ? "Онлайн брондоо кандай иштейт?" : language === 'ru' ? "Как записаться онлайн?" : "How do I book online?")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-white/70 hover:text-white transition-colors"
            >
              📅 {language === 'ky' ? "Брондоо" : language === 'ru' ? "Запись" : "Booking"}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(language === 'ky' ? "Бет түзүлүшүмө жараша чач стилин кантип тандайм?" : language === 'ru' ? "Как подобрать стрижку по форме лица?" : "Help me choose a haircut for my face shape")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-white/70 hover:text-white transition-colors"
            >
              💈 {language === 'ky' ? "Стиль тандоо" : language === 'ru' ? "Стилист" : "Style Advice"}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(language === 'ky' ? "Гейтерсбургдагы салондун дареги жана байланыш" : language === 'ru' ? "Адрес салона в Гейтерсбурге" : "Location & Contact")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-white/70 hover:text-white transition-colors"
            >
              📍 {language === 'ky' ? "Дарек" : language === 'ru' ? "Адрес" : "Location"}
            </button>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#151518] border-t border-white/10 flex items-center gap-2">
            <input
              id="chatbot-input-field"
              type="text"
              value={inputMessage}
              disabled={loading}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                language === 'ky' 
                  ? "Сурооңузду жазыңыз..." 
                  : language === 'ru' 
                  ? "Задайте вопрос о стрижках, ценах..." 
                  : "Ask about haircuts, pricing, hours..."
              }
              className="flex-1 bg-[#0a0a0c] border border-white/10 focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition-colors"
            />
            <button
              id="chatbot-send-btn"
              type="button"
              disabled={!inputMessage.trim() || loading}
              onClick={() => handleSendMessage()}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                inputMessage.trim() && !loading
                  ? 'bg-[#c5a059] hover:bg-[#dfba6f] text-black shadow-md'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
