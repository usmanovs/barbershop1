import { Language, ServiceItem, BarberArtisan, ApothecaryProduct, LookbookItem, CustomerReview, VipClubTier } from '../types';

export const LOCATION_DETAILS = {
  name: "SOVEREIGN & CO. ATELIER",
  address: "101 Boardwalk Place, Suite 240, Rio Lakefront / Downtown Crown",
  city: "Gaithersburg, MD 20878",
  phone: "+1 (301) 840-7799",
  conciergeEmail: "concierge@sovereign-barbers.com",
  valetParking: "Complimentary Valet Parking at Rio Lakefront North Garage & VIP Portico",
  coordinates: {
    lat: 39.1177,
    lng: -77.1994
  },
  hours: [
    { days: { ky: "Дүйшөмбү – Жума", en: "Monday – Friday", ru: "Понедельник – Пятница" }, time: "09:00 – 21:00" },
    { days: { ky: "Ишемби", en: "Saturday", ru: "Суббота" }, time: "08:30 – 20:00" },
    { days: { ky: "Жекшемби", en: "Sunday", ru: "Воскресенье" }, time: "10:00 – 18:00 (VIP Private Appointments Only)" },
  ]
};

export const LUXURY_BEVERAGES = [
  { id: "bourbon", name: { ky: "Woodford Reserve Double Oaked Bourbon", en: "Woodford Reserve Double Oaked Bourbon", ru: "Woodford Reserve Double Oaked Bourbon" }, icon: "GlassWater" },
  { id: "espresso", name: { ky: "Artisan Double Shot Ristretto Espresso", en: "Artisan Double Shot Ristretto Espresso", ru: "Двойной эспрессо ристретто" }, icon: "Coffee" },
  { id: "macallan", name: { ky: "The Macallan 12 Highland Single Malt", en: "The Macallan 12 Highland Single Malt", ru: "The Macallan 12 Highland Single Malt" }, icon: "Wine" },
  { id: "sparkling", name: { ky: "San Pellegrino & Fresh Mint Infusion", en: "San Pellegrino & Fresh Mint Infusion", ru: "San Pellegrino с мятой и лаймом" }, icon: "Sparkles" },
  { id: "matcha", name: { ky: "Ceremonial Japanese Uji Matcha", en: "Ceremonial Japanese Uji Matcha", ru: "Японский чай Удзи Матча" }, icon: "CupSoda" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "sovereign_cut",
    category: "hair",
    name: {
      ky: "The Sovereign Signature Cut",
      en: "The Sovereign Signature Cut",
      ru: "The Sovereign Signature Cut"
    },
    tagline: {
      ky: "Премиум кайчы жана триммер чеберчилиги, баш терисин массаждоо",
      en: "Bespoke shear & clipper architecture with invigorating scalp tonic",
      ru: "Архитектурная стрижка ножницами и машинкой с массажем кожи головы"
    },
    durationMin: 50,
    price: 85,
    description: {
      ky: "Сиздин баш формаңызга жана стилиңизге ылайыкташтырылган чеберчилик. Чачты даярдоочу шампунь, жеке кайчы чеберчилиги, моюнду ысык сүлгү менен таза кыруу жана стилдөө.",
      en: "A comprehensive haircut tailored to your cranial structure, hair density, and lifestyle. Includes botanical cleanse, hot towel neck shave, and custom pomade styling.",
      ru: "Индивидуальная стрижка с учетом анатомии лица и структуры волос. Включает мытье головы премиум-шампунем, бритье шеи с горячим полотенцем и премиальный стайлинг."
    },
    rituals: {
      ky: ["Консультация & Баш формасын анализдөө", "Ботаникалык эссенция менен чач жуу", "Так кайчы жана триммер архитектурасы", "Ысык сүлгү & Моюнду устара менен кыруу", "Sovereign Matte Clay стилдөө"],
      en: ["Consultation & Cranial Proportion Analysis", "Botanical Scalp Cleanse & Acupressure", "Precision Scissor & Taper Architecture", "Steamed Hot Towel Razor Neck Cleanup", "Finished Styling with Bespoke Pomade"],
      ru: ["Консультация и подбор формы", "Мытье головы с тоником мяты и эвкалипта", "Точная техника ножниц и фейда", "Распаривание и бритье шеи лезвием", "Финишный стайлинг матовой глиной"]
    },
    includesBeverage: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "royal_shave",
    category: "shave",
    name: {
      ky: "Royal Damascus Hot Towel Shave",
      en: "Royal Damascus Hot Towel Shave",
      ru: "Королевское бритье Damascus & Hot Towel"
    },
    tagline: {
      ky: "Салттуу ысык сүлгү, дамаск устарасы жана япондук муз бальзамы",
      en: "Multi-layered hot towel straight razor shave with cold stone compress",
      ru: "Традиционное бритье опасной бритвой с 4 слоями распаривания и ледяным камнем"
    },
    durationMin: 45,
    price: 75,
    description: {
      ky: "Эркектердин классикалык кырынуу ритуалы. Эвкалипт майлары, жылуу көбүк, колго жасалган курч дамаск устарасы, тешикчелерди жабуучу муздак таш компресси жана тынчтандыруучу бальзам.",
      en: "The zenith of traditional wet shaving. Involves pre-shave essential oils, badger brush hot lather, surgical-grade Damascus blade glide, and chilled obsidian stone finish.",
      ru: "Вершина классического влажного бритья. Эфирные масла, густая теплая пена барсучьим помазком, безупречное скольжение дамасской бритвы и закрытие пор ледяным обсидианом."
    },
    rituals: {
      ky: ["Пре-шейв эвкалипт жана сандал майы", "Япондук ысык озондуу сүлгү", "Жылуу крем менен Дамаск устарасында кыруу", "Муздак тоник & Алунит ташы", "Калыбына келтирүүчү гиалурон лосьону"],
      en: ["Essential Pre-Shave Oil Application", "Japanese Steam Infused Towel Layering", "Warm Botanical Lather Straight Razor Glide", "Cold Marble Stone & Witch Hazel Compression", "Soothing Sandalwood Recovery Balm"],
      ru: ["Нанесение подогретого масла сандала", "Двойное распаривание горячими полотенцами", "Бритье опасной бритвой Damascus", "Охлаждающий компресс и квасцы", "Успокаивающий восстанавливающий бальзам"]
    },
    includesBeverage: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "beard_sculpt",
    category: "beard",
    name: {
      ky: "Beard Sculpt & Ozone Steam Therapy",
      en: "Beard Sculpt & Ozone Steam Therapy",
      ru: "Скульптурирование бороды & Озоновый пар"
    },
    tagline: {
      ky: "Жаак сызыгынын геометриясы, озон буусу жана кашемир майы",
      en: "Architectural line-up, micro-mist ozone hydration, and cashmere beard oil",
      ru: "Геометрия контура, глубокое увлажнение озоном и кашемировое масло"
    },
    durationMin: 40,
    price: 65,
    description: {
      ky: "Сакалыңыздын формасын жүзүңүздүн сызыгына жараша так контурлоо. Озон буусу сакалдын түктөрүн жумшартып, терини азыктандырат. Курч устара менен кыруу жана органикалык бальзам.",
      en: "Detailed shaping and density balancing for discerning beards. Enhanced by nano-steam hydration and bespoke line sharpening with traditional straight blade.",
      ru: "Идеальная форма и баланс густоты бороды. Включает распаривание нано-паром, четкие контуры лезвием и питание маслом жожоба и кедра."
    },
    rituals: {
      ky: ["Сакалдын узундугун жана тыгыздыгын баланстоо", "Озондуу жылуу буу менен терини жумшартуу", "Курч устара менен так контур", "Жылуу кашемир майы менен сиңдирүү", "Премиум щетка менен формага келтирүү"],
      en: ["Proportion Trimming & Length Balance", "Nano Ozone Steam Infusion", "Razor Sharp Cheek & Neck Lineup", "Warm Organic Argan Oil Hydration", "Boar Bristle Brushing & Shaping"],
      ru: ["Моделирование длины и объема", "Озоновое распаривание", "Четкая окантовка опасным лезвием", "Горячее масляное обертывание", "Укладка бальзамом и щеткой из щетины кабана"]
    },
    includesBeverage: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "executive_ritual",
    category: "vip_rituals",
    name: {
      ky: "The Executive Royal Transformation (VIP)",
      en: "The Executive Royal Transformation (VIP)",
      ru: "The Executive Royal Transformation (VIP)"
    },
    tagline: {
      ky: "Толук премиум топтом: Чач + Сакал/Кырынуу + 24K Алтын бет маскасы",
      en: "Full spectrum mastery: Signature cut, royal shave, 24K gold facial & scalp detox",
      ru: "Полное преображение: стрижка, королевское бритье, золотая маска 24K и спа"
    },
    durationMin: 90,
    price: 165,
    description: {
      ky: "Биздин эң жогорку деңгээлдеги жеке ритуалыбыз. Sovereign Signature Cut, Royal Damascus Shave, көз алдындагы 24K алтын коллаген маскасы, баш терисинин детоксу жана эң мыкты суусундуктар.",
      en: "The pinnacle Sovereign experience. Combines the bespoke haircut, straight-razor shave ritual, deep scalp revitalizer, 24K gold hydrogel eye therapy, and reserved private lounge time.",
      ru: "Флагманский VIP-ритуал. Включает фирменную стрижку, королевское бритье опасной бритвой, детокс кожи головы, гидрогелевую маску 24K Gold и доступ в сигарную комнату."
    },
    rituals: {
      ky: ["Жеке VIP бөлмөсүндө тейлөө", "Sovereign Signature чач жасалгасы", "Royal Damascus ысык сүлгү менен кырынуу", "24K Gold коллаген көз маскасы", "Баш, моюн жана ийин массажы", "Woodford Reserve / Macallan 12 суусундугу"],
      en: ["Private Suite Accommodations", "Sovereign Signature Haircut", "Royal Damascus Hot Towel Shave", "24K Gold Collagen Eye Recovery Mask", "Scalp, Neck & Shoulder Tension Release", "Complimentary Vintage Single Malt Service"],
      ru: ["Обслуживание в отдельном VIP-сьюте", "Фирменная стрижка Sovereign", "Королевское бритье с распариванием", "Маска вокруг глаз с 24K золотом", "Массаж головы, шеи и плечевой зоны", "Подача элитного виски или ристретто"]
    },
    includesBeverage: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "father_heir",
    category: "vip_rituals",
    name: {
      ky: "Father & Heir Legacy Experience",
      en: "Father & Heir Legacy Experience",
      ru: "Отец и Наследник: Legacy Experience"
    },
    tagline: {
      ky: "Ата-бала үчүн катар турган эки креслодогу өзгөчө элиталык убакыт",
      en: "Generational bonding: Dual chair simultaneous master grooming with craft sodas & spirits",
      ru: "Традиция поколений: одновременный уход в двух смежных креслах"
    },
    durationMin: 60,
    price: 150,
    description: {
      ky: "Эркектик мурас жана сапаттуу убакыт. Атасы жана уулу үчүн бир убакта башталган мастерлик чач кыркуу, стилдөө жана премиум эс алуу.",
      en: "A cherished tradition of timeless gentlemen. Simultaneous tailored haircuts for Father and Son by our senior artisans, complete with artisan root beer for the heir and bourbon for the father.",
      ru: "Культура и традиции джентльменов. Одновременные стрижки для отца и сына от ведущих мастеров, крафтовые напитки и премиальный сервис."
    },
    rituals: {
      ky: ["Эки чебер бир убакта тейлейт", "Атасына жана уулуна жеке стилдөө", "Моюнду жумшак тазалоо жана стилдөө", "Атага Single Malt, балага Artisan Vanilla Root Beer"],
      en: ["Dual Master Artisan Allocation", "Bespoke Styling for Both Generations", "Gentle Neck Cleansing & Scalp Tonic", "Root Beer float for Heir & Single Malt for Father"],
      ru: ["Выделение двух топ-барберов", "Индивидуальный подбор стиля для обоих", "Уход за кожей головы и укладка", "Крафтовые напитки и памятное фото"]
    },
    includesBeverage: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "grey_blending",
    category: "hair",
    name: {
      ky: "Executive Grey Camouflage & Toning",
      en: "Executive Grey Camouflage & Toning",
      ru: "Камуфляж седины Executive Camouflage"
    },
    tagline: {
      ky: "Табигый, байкалбаган асыл түс берүү (10 мүнөттө)",
      en: "Subtle, ammonia-free dimensional grey blending for distinguished gentlemen",
      ru: "Благородное тонирование седины без эффекта окрашенных волос"
    },
    durationMin: 30,
    price: 55,
    description: {
      ky: "Асыл чачты толук боёп салбастан, 50-60% табигый көлөкө берип, жаш жана тыкан көрүнүш тартуулайт. Эч кандай саргычтыксыз, табигый көрүнүш.",
      en: "An undetectable semi-permanent color blend applied at the washbasin. Softens stark white tones into refined charcoal and graphite without looking artificial.",
      ru: "Безаммиачный уход у мойки, создающий естественный приглушенный оттенок графита без резких границ отрастания."
    },
    rituals: {
      ky: ["Түстү жекече аралаштыруу", "10 мүнөттүк экспресс сиңирүү", "Түстү бекемдөөчү чайкоо", "Антиоксиданттык кондиционер"],
      en: ["Custom Pigment Matrix Consultation", "10-Minute Rapid Washbasin Processing", "Color-Lock Botanical Rinse", "UV Shield Conditioning Treatment"],
      ru: ["Подбор индивидуального тона", "10-минутная экспозиция", "Фиксация цвета", "Уход с кератином"]
    },
    includesBeverage: false,
    popular: false,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  }
];

export const ADDONS_DATA = [
  { id: "gold_mask", name: { ky: "24K Gold гидрогель көз маскасы", en: "24K Gold Hydrogel Undereye Recovery", ru: "Гидрогелевая маска 24K Gold" }, price: 25, durationMin: 15 },
  { id: "scalp_detox", name: { ky: "Детокс & Япондук озон терапиясы", en: "Japanese Scalp Detox & Ozone Infusion", ru: "Японский детокс кожи головы" }, price: 35, durationMin: 20 },
  { id: "ear_nose_wax", name: { ky: "Кулак жана мурунду тазалоо (Wax/Fire)", en: "Nose & Ear Botanical Wax Detailing", ru: "Ваксинг ушей и носа" }, price: 20, durationMin: 10 },
  { id: "hand_grooming", name: { ky: "Эркектердин экспресс кол кам көрүүсү", en: "Executive Gentlemen's Hand Refining", ru: "Экспресс-уход за руками" }, price: 30, durationMin: 15 },
];

export const BARBERS_DATA: BarberArtisan[] = [
  {
    id: "seyitbek",
    name: "Seyitbek Usmanov",
    title: {
      ky: "Негиздөөчүсү & Башкы чебер (Creative Director)",
      en: "Founder & Creative Director",
      ru: "Основатель и Шеф-Барбер"
    },
    bio: {
      ky: "14 жылдык эл аралык тажрыйбага ээ устат. Лондон жана Нью-Йорктун алдыңкы академияларын аяктаган. Ар бир кардардын жүз сөөгүнүн геометриясына ылайык уникалдуу форма жаратат.",
      en: "Trained in London and Manhattan with over 14 years of master craftsmanship. Known for architectural shear transitions, bespoke scissor work, and timeless silhouette design.",
      ru: "Более 14 лет опыта в Лондоне и Нью-Йорке. Эксперт в геометрических стрижках, классическом дизайне силуэта и персональном сервисе для топ-менеджеров."
    },
    experienceYears: 14,
    rating: 5.0,
    reviewsCount: 342,
    specialties: {
      ky: ["Кайчы менен так архитектуралык кесүү", "Executive Classic Silhouettes", "Дамаск устарасында кырынуу ритуалы"],
      en: ["Bespoke Scissor Architecture", "Executive Tapers & Pompadours", "Damascus Straight Razor Rituals"],
      ru: ["Стрижки ножницами высшей категории", "Классический тейпер и помпадур", "Королевское бритье лезвием"]
    },
    awards: ["Master of the Year 2024 (DMV Barber Guild)", "Sassoon Advanced Precision Certified", "Official Master Stylist for MD Gala"],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    instagramHandle: "@seyitbek.craft",
    availableDays: ["Дүйшөмбү", "Шейшемби", "Шаршемби", "Бейшемби", "Жума", "Ишемби"]
  },
  {
    id: "julian",
    name: "Julian Thorne",
    title: {
      ky: "Британиялык Салттуу Чебер (Master Artisan)",
      en: "British Heritage Master Artisan",
      ru: "Ведущий британский мастер"
    },
    bio: {
      ky: "Лондондун белгилүү Mayfair салонунан келген салттуу кырынуу жана классикалык чач жасалга чебери. Озон буусу жана ысык сүлгү ритуалынын адиси.",
      en: "Hailing from London's prestigious Mayfair district. Julian is a purist master in hot towel shaving rituals, tapered fades, and bespoke beard contouring.",
      ru: "Мастер классической британской школы из района Мейфэр, Лондон. Специализируется на идеальных переходах и традиционном бритье горячими полотенцами."
    },
    experienceYears: 11,
    rating: 4.98,
    reviewsCount: 289,
    specialties: {
      ky: ["Mayfair Hot Towel Shaving", "Low Skin Fades", "Сакал архитектурасы"],
      en: ["Traditional Mayfair Shaving", "Low-Drop Skin Fades", "Beard Sculpting"],
      ru: ["Традиционное бритье Mayfair", "Низкий плавный фейд", "Моделирование бороды"]
    },
    awards: ["British Barbers Association Finalist", "Master Wet Shaver Certified"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    instagramHandle: "@julian.thorne.cuts",
    availableDays: ["Шейшемби", "Шаршемби", "Бейшемби", "Жума", "Ишемби", "Жекшемби"]
  },
  {
    id: "alexander",
    name: "Alexander Vance",
    title: {
      ky: "Заманбап Фейд жана Текстура Адиси (Fade Specialist)",
      en: "Modern Fade & Texture Architect",
      ru: "Топ-стилист современных текстур и фейдов"
    },
    bio: {
      ky: "Кемчиликсиз микро-градиент фейддерди жана заманбап текстуралуу чач формаларын жасоо боюнча АКШнын чыгыш жээгиндеги эң популярдуу чеберлердин бири.",
      en: "Celebrated for seamless skin tapers, textured crops, and millimeter-precise razor line work. Trained in Miami and Washington D.C.",
      ru: "Известен безупречными переходами skin fade, текстурными стрижками и ювелирной прорисовкой линий бороды."
    },
    experienceYears: 9,
    rating: 4.97,
    reviewsCount: 215,
    specialties: {
      ky: ["Drop Fade & Burst Fade", "Textured French Crop", "Razor Lineup Art"],
      en: ["Drop & Burst Skin Fades", "Modern Textured Crop", "Crisp Razor Edging"],
      ru: ["Фейд любой сложности", "Текстурированный кроп", "Четкая геометрия линий"]
    },
    awards: ["DMV Fade Champion 2023", "Andis Platform Artist Guest"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    instagramHandle: "@alexander.vance.cuts",
    availableDays: ["Дүйшөмбү", "Шаршемби", "Бейшемби", "Жума", "Ишемби"]
  },
  {
    id: "elena",
    name: "Elena Rostova",
    title: {
      ky: "Премиум Түс жана Баш Терисин Калыбына Келтирүү Адиси",
      en: "Trichology & Master Colorist",
      ru: "Трихолог и колорист премиум-класса"
    },
    bio: {
      ky: "Эркектердин чачын табигый камуфляждоо, баш терисинин ден соолугун калыбына келтирүүчү озондук спа ритуалдарынын сертификатталган адиси.",
      en: "Specialist in subtle grey camouflaging, cranial scalp detox therapies, and anti-aging aesthetic treatments for distinguished gentlemen.",
      ru: "Специалист по деликатному камуфляжу седины, трихологическим ритуалам для кожи головы и премиальному спа-уходу."
    },
    experienceYears: 10,
    rating: 4.99,
    reviewsCount: 178,
    specialties: {
      ky: ["Grey Camouflage", "Scalp Detox & Ozone SPA", "Чачтын калыңдыгын дарылоо"],
      en: ["Executive Grey Blending", "Scalp Rejuvenation Therapy", "Hair Density Restoration"],
      ru: ["Камуфляж седины", "СПА-детокс кожи головы", "Уход против выпадения волос"]
    },
    awards: ["Certified Trichology Specialist", "L'Oréal Homme Master Certified"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    instagramHandle: "@elena.trichology",
    availableDays: ["Дүйшөмбү", "Шейшемби", "Жума", "Ишемби", "Жекшемби"]
  }
];

export const APOTHECARY_PRODUCTS: ApothecaryProduct[] = [
  {
    id: "pomade_clay",
    name: "Sovereign Matte Clay Pomade",
    brand: "Sovereign Atelier",
    price: 38,
    category: "pomade",
    rating: 4.9,
    reviewsCount: 142,
    description: {
      ky: "Бентонит чопосу жана бал мому кошулган, табигый жалтырабаган күчтүү кармоочу крем-помада.",
      en: "Bentonite clay and beeswax infused pomade providing high hold with zero artificial shine.",
      ru: "Матовая глина сильной фиксации на основе бентонита и пчелиного воска. Без блеска."
    },
    volume: "100ml / 3.4 oz",
    ingredients: ["Bentonite Clay", "Organic Beeswax", "Jojoba Seed Oil", "Bergamot Extract", "Cedarwood"],
    image: "https://images.unsplash.com/photo-1594913785162-e678a0c23cc7?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller"
  },
  {
    id: "beard_oil_royal",
    name: "Royal Amber & Oud Beard Elixir",
    brand: "Sovereign Apothecary",
    price: 45,
    category: "beard",
    rating: 5.0,
    reviewsCount: 98,
    description: {
      ky: "Суук сыгылган аргана, жожоба жана асыл уд жыты кошулган премиум сакал майы. Түктөрдү жумшартып, терини азыктандырат.",
      en: "Cold-pressed Moroccan Argan and Golden Jojoba infused with rare Arabian Oud and Smoked Amber.",
      ru: "Холодный отжим арганы и золотого жожоба с ароматом редкого уда и теплого янтаря."
    },
    volume: "50ml / 1.7 oz",
    ingredients: ["Moroccan Argan Oil", "Golden Jojoba", "Vitamin E", "Agarwood (Oud)", "Smoked Amber"],
    image: "https://images.unsplash.com/photo-1608248597359-5936830761e3?auto=format&fit=crop&w=600&q=80",
    badge: "Master Pick"
  },
  {
    id: "straight_razor",
    name: "Handcrafted Damascus Straight Razor",
    brand: "Sovereign Forge",
    price: 185,
    category: "razors",
    rating: 4.95,
    reviewsCount: 47,
    description: {
      ky: "Япондук 128 катмарлуу Дамаск болатынан колго жасалган, эбен жыгачынан сапталган элиталык устара.",
      en: "128-layer hand-forged Damascus steel blade with hand-turned African Ebony wood scales.",
      ru: "Кованая дамасская сталь в 128 слоев с рукоятью из натурального черного дерева (эбена)."
    },
    volume: "Custom Leather Sheath Included",
    ingredients: ["128-Layer VG-10 Damascus Core", "African Ebony Scales", "Brass Rivets"],
    image: "https://images.unsplash.com/photo-1590159763121-7c9ff3149e0a?auto=format&fit=crop&w=600&q=80",
    badge: "Limited Craft"
  },
  {
    id: "sea_salt_spray",
    name: "Atlantic Mineral Texture Sea Salt Spray",
    brand: "Sovereign Atelier",
    price: 32,
    category: "pomade",
    rating: 4.88,
    reviewsCount: 89,
    description: {
      ky: "Океан минералдары жана деңиз балырларынын экстракты менен чачка табигый көлөм жана текстура берүүчү спрей.",
      en: "Enriched with Atlantic sea minerals and kelp extract for effortless volume, grip, and matte finish.",
      ru: "Минералы Атлантики и экстракт ламинарии для текстуры, объема и легкого расчесывания."
    },
    volume: "200ml / 6.7 oz",
    ingredients: ["Atlantic Sea Salt", "Hydrolyzed Silk Protein", "Organic Kelp", "Lime Blossom"],
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
  }
];

export const LOOKBOOK_GALLERY: LookbookItem[] = [
  {
    id: "lb_1",
    title: { ky: "The Executive Low Taper & Side Part", en: "The Executive Low Taper & Side Part", ru: "The Executive Low Taper" },
    category: "classic",
    barberName: "Seyitbek Usmanov",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    description: {
      ky: "Кемчиликсиз бизнес стили, капталдары жумшак таралган, жаак сөөктөрүн ачып көрсөтөт.",
      en: "Sharp executive silhouette with razor-parted finish, crafted for C-suite meetings.",
      ru: "Идеальный деловой силуэт с ювелирной проработкой пробора и височной зоны."
    }
  },
  {
    id: "lb_2",
    title: { ky: "Textured Crop & Mid-Drop Skin Fade", en: "Textured Crop & Mid-Drop Skin Fade", ru: "Textured Crop & Mid-Drop Fade" },
    category: "fades",
    barberName: "Alexander Vance",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    description: {
      ky: "Заманбап европалык текстура, 0.5 мм микро-фейд жана табигый матовая помада.",
      en: "European textured crop paired with a surgical 0.5mm skin gradient.",
      ru: "Текстурный кроп с микро-градиентом на висках и матовой текстурой."
    }
  },
  {
    id: "lb_3",
    title: { ky: "Imperial Full Beard & Razor Lineup", en: "Imperial Full Beard & Razor Lineup", ru: "Imperial Full Beard" },
    category: "beard",
    barberName: "Julian Thorne",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    description: {
      ky: "Узун жана тыгыз сакалдын геометриялык контуру, озон буусу жана кашемир майы.",
      en: "Full masculine density sculpted with sharp 45-degree diagonal cheek taper.",
      ru: "Густая, ухоженная борода с четкими углами и распариванием озоном."
    }
  },
  {
    id: "lb_4",
    title: { ky: "Royal Damascus Straight Razor Experience", en: "Royal Damascus Straight Razor Experience", ru: "Royal Damascus Ritual" },
    category: "rituals",
    barberName: "Seyitbek Usmanov",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    description: {
      ky: "4 кабаттуу ысык сүлгү, эвкалипт майы жана муздак обсидиан компресси.",
      en: "Traditional four-layer steam towel shave with obsidian ice stone finish.",
      ru: "Традиционный ритуал горячих компрессов и скольжения дамасской бритвы."
    }
  }
];

export const VIP_TIERS: VipClubTier[] = [
  {
    id: "silver_blade",
    name: "The Artisan Society",
    pricePerMonth: 140,
    tagline: {
      ky: "Айына 2 жолу чач жасалгасы & ысык сүлгү ритуалы",
      en: "Bi-weekly signature grooming & priority access",
      ru: "2 визита в месяц и приоритетная запись"
    },
    features: {
      ky: [
        "Айына 2 Sovereign Signature чач кыркуусу",
        "Ар бир сапарда акысыз Single Malt же Espresso",
        "Брондоо кезегинде 1-орундуу артыкчылык",
        "Sovereign Apothecary косметикасына 10% арзандатуу"
      ],
      en: [
        "2 Sovereign Signature Cuts per month",
        "Complimentary Single Malt / Espresso on every visit",
        "Priority 48-hour advance calendar window",
        "10% off all Apothecary grooming products"
      ],
      ru: [
        "2 фирменные стрижки Sovereign в месяц",
        "Элитный бар (виски, эспрессо) при каждом визите",
        "Приоритетное окно онлайн-записи",
        "Скидка 10% на весь ассортимент косметики"
      ]
    }
  },
  {
    id: "sovereign_crown",
    name: "The Sovereign Crown Club",
    pricePerMonth: 250,
    popular: true,
    badge: "Most Distinguished",
    tagline: {
      ky: "Чексиз сапарлар, жеке VIP сьют & сигар бөлмөсүнө кирүү",
      en: "Unlimited monthly grooming, Private Suite & Cigar Lounge privileges",
      ru: "Безлимитный уход, отдельный VIP-сьют и сигарная комната"
    },
    features: {
      ky: [
        "Чексиз Sovereign Haircut & Beard Trim сапарлары",
        "Жеке VIP бөлмөсүндө тейлөө (Private Suite)",
        "Rio Lakefront сигар жана виски залына кирүү",
        "Айына 1 бекер Royal Damascus Hot Towel Shave",
        "Жеке чеберди каалаган убакта чакыруу мүмкүнчүлүгү",
        "Apothecary косметикасына 20% арзандатуу + белек топтому"
      ],
      en: [
        "Unlimited Haircuts & Beard Architecture visits",
        "Guaranteed Private VIP Grooming Suite",
        "Exclusive access to Rio Lakefront Cigar & Scotch Lounge",
        "1 Complimentary Royal Damascus Shave per month",
        "Direct Dedicated Master Barber On-Call Concierge",
        "20% off all Apothecary line + Welcome Luxury Kit"
      ],
      ru: [
        "Безлимитные стрижки и уход за бородой",
        "Гарантированное обслуживание в VIP-сьюте",
        "Доступ в приватный сигарный лаунж с элитным скотчем",
        "1 королевское бритье Damascus в месяц бесплатно",
        "Персональный консьерж и выбор любимого мастера",
        "Скидка 20% на косметику + подарочный бокс"
      ]
    }
  },
  {
    id: "imperial_patron",
    name: "Imperial Patron Black",
    pricePerMonth: 450,
    badge: "By Invitation Only",
    tagline: {
      ky: "Үйгө/офиске чыгуу, үй-бүлөлүк мүчөлүк жана 24/7 консьерж",
      en: "Mobile atelier visits, multi-guest privileges & 24/7 concierge",
      ru: "Выезд мастера в офис/резиденцию и 24/7 консьерж"
    },
    features: {
      ky: [
        "Бардык кызматтар чексиз (Чач, Сакал, Спа, 24K Маскалар)",
        "Айына 2 жолу жеке резиденцияга/офиске мастердин чыгуусу (MD/DC/VA)",
        "Үй-бүлө мүчөлөрүнө (уулу/атасы) толук камтуу",
        "24/7 жеке консьерж жана түнкү VIP сааттарда кабыл алуу",
        "Жылдык колго жасалган Дамаск устарасы белекке"
      ],
      en: [
        "All services completely unlimited across entire menu",
        "2 Bespoke On-Site Mobile Visits per month (MD/DC/NoVA)",
        "Includes Family Pass (Father & Sons)",
        "24/7 Private Concierge & After-Hours Atelier Access",
        "Annual Custom Monogrammed Damascus Steel Razor Gift"
      ],
      ru: [
        "Полный безлимит на все услуги и спа-ритуалы",
        "2 выезда шеф-барбера в офис или загородную резиденцию",
        "Семейный абонемент (включая сыновей)",
        "Круглосуточный консьерж и визиты в нерабочие часы",
        "Ежегодный подарок: персональная бритва Damascus"
      ]
    }
  }
];

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: "rev_1",
    author: "Marcus Sterling",
    title: "Executive VP, Biotech Potomac",
    location: "Potomac / Gaithersburg, MD",
    rating: 5,
    date: "August 2026",
    comment: {
      ky: "Мэриленд жана Вашингтон аймагындагы эң мыкты деңгээл! Сейитбектин кайчы чеберчилиги укмуштуудай так. Ысык сүлгү ритуалынан кийин өзүңүздү 10 жашка жашаргандай сезесиз. Woodford Reserve суусундугу жана сигар бөлмөсү – чыныгы эркектердин бейиши.",
      en: "Without a doubt the finest gentlemen's atelier in the DMV region. Seyitbek's precision with shears is unmatched. The hot towel shave is pure restorative therapy. Five stars aren't enough.",
      ru: "Безусловно, лучший мужской салон в регионе DMV. Сейитбек — настоящий виртуоз ножниц. Ритуал горячих полотенец восстанавливает лучше любого массажа. Элитный виски и атмосфера роскоши."
    },
    verified: true
  },
  {
    id: "rev_2",
    author: "Dr. David Harrison",
    title: "Chief of Surgery, Suburban Hospital",
    location: "Bethesda, MD",
    rating: 5,
    date: "July 2026",
    comment: {
      ky: "Гейтерсбургдагы бул жай – жөн гана чач кыркуу эмес, бул чыныгы искусство жана эс алуу. Жумуштан кийин келип, Джулиандын креслосунда отуруп эс алуу – жумалык эң сонун адатым болуп калды.",
      en: "Sovereign & Co. has set an entirely new benchmark for luxury grooming in Maryland. Impeccable hygiene, serene ambiance, and world-class artisans.",
      ru: "Этот барбершоп в Гейтерсбурге задал абсолютно новый стандарт. Идеальная стерильность, безупречный вкус, потрясающие мастера. Рекомендую VIP-членство."
    },
    verified: true
  },
  {
    id: "rev_3",
    author: "Amanbek Toktorov",
    title: "Tech Founder & Investor",
    location: "Gaithersburg, MD",
    rating: 5,
    date: "August 2026",
    comment: {
      ky: "Биздин мекендешибиз Сейитбек ачкан бул элиталык жай менен сыймыктанам! Американын эң жогорку стандарттарына жооп берген ультра-люкс деңгээл. Чач кыркуу, сакал контуру, кофе жана сервис 10/10.",
      en: "Incredible pride seeing this ultra-premium establishment thriving in Gaithersburg. The attention to detail from the scent of sandalwood to the straight razor glide is sublime.",
      ru: "Гордость за такой проект высочайшего уровня в Гейтерсбурге! Сервис 10 из 10, потрясающие интерьеры, лучший кофе и непревзойденное мастерство."
    },
    verified: true
  }
];

const DICTIONARY_MAP = {
  ky: {
    brandSubtitle: "Эркектердин Элиталык Ательеси & Барбершопу",
    locationHeading: "Гейтерсбург, Мэриленд",
    bookNow: "Кезекке жазылуу",
    consultAi: "AI Виртуалдык Стилист",
    services: "Кызматтар & Ритуалдар",
    barbers: "Биздин Чеберлер",
    gallery: "Галерея",
    apothecary: "Премиум Косметика",
    vipClub: "VIP Клуб",
    location: "Дарек & Сааттар",
    heroBadge: "ГЕЙТЕРСБУРГ, МЭРИЛЕНД • CROWN & RIO LAKEFRONT",
    heroTitle: "ЧЫНЫГЫ ЭРКЕКТЕРДИН ЭЛИ ЭСТЕТИКАСЫ ЖАНА МУРАСЫ",
    heroDesc: "Сиздин индивидуалдуулугуңузду чагылдырган премиум кайчы архитектурасы, Дамаск устарасында кырынуу ритуалы жана өзгөчө VIP меймандостук.",
    statClients: "5,000+ Туруктуу Кардарлар",
    statRating: "5.0 Жылдыздуу Рейтинг",
    statYears: "14 Жылдык Эл Аралык Чеберчилик",
    selectBarber: "Чеберди тандоо",
    selectService: "Кызматты тандоо",
    stepService: "1. Кызмат & Кошумчалар",
    stepBarber: "2. Мастер Чебер",
    stepDateTime: "3. Күнү & Убактысы",
    stepBeverage: "4. VIP Суусундук & Маалымат",
    stepConfirm: "5. Тастыктоо",
    allCategories: "Бардыгы",
    haircuts: "Чач кыркуу",
    shaves: "Устара & Кырынуу",
    beards: "Сакал архитектурасы",
    vipRituals: "VIP Ритуалдар",
    duration: "мүнөт",
    price: "$",
    addToCart: "Себетке кошуу",
    cartTitle: "Sovereign Apothecary Себети",
    emptyCart: "Себетиңиз бош",
    checkout: "Буйрутма берүү",
    aiTitle: "AI Master Barber Стилисти",
    aiSubtitle: "Gemini 3.7 Flash жасалма интеллект системасы сиздин жүзүңүзгө эң идеалдуу чач жана сакал формасын сунуштайт.",
    faceShape: "Жүзүңүздүн формасы",
    hairType: "Чачыңыздын түрү",
    beardGoal: "Сакалыңыздын максаты",
    lifestyle: "Стиль & Жашоо образы",
    generateAdvice: "Жекече Консультация алуу",
    analyzing: "Мастер-барбер анализдөөдө...",
    valetText: "Rio Lakefront жана Downtown Crown аймагында акысыз Valet Parking кызматы каралган.",
    audioPlaying: "Атмосфералык музыка күйүк",
    audioMuted: "Музыка өчүк"
  },
  en: {
    brandSubtitle: "Ultra-Premium Gentlemen's Atelier & Barbershop",
    locationHeading: "Gaithersburg, Maryland",
    bookNow: "Reserve Appointment",
    consultAi: "AI Master Stylist",
    services: "Services & Rituals",
    barbers: "Master Artisans",
    gallery: "Lookbook",
    apothecary: "Apothecary Grooming",
    vipClub: "VIP Club Privé",
    location: "Location & Hours",
    heroBadge: "GAITHERSBURG, MARYLAND • DOWNTOWN CROWN & RIO LAKEFRONT",
    heroTitle: "THE APOTHEOSIS OF GENTLEMEN'S GROOMING",
    heroDesc: "Bespoke shear architecture, hand-forged Damascus hot towel straight razor rituals, and unparalleled bespoke hospitality for discerning men.",
    statClients: "5,000+ Discerning Clients",
    statRating: "5.0 Star Unblemished Rating",
    statYears: "14+ Years Master Heritage",
    selectBarber: "Select Artisan",
    selectService: "Select Service",
    stepService: "1. Services & Add-ons",
    stepBarber: "2. Master Artisan",
    stepDateTime: "3. Date & Time Slot",
    stepBeverage: "4. VIP Beverage & Details",
    stepConfirm: "5. Confirmation Pass",
    allCategories: "All Offerings",
    haircuts: "Haircuts & Styling",
    shaves: "Royal Shaves",
    beards: "Beard Sculpting",
    vipRituals: "VIP Rituals",
    duration: "min",
    price: "$",
    addToCart: "Add to Bag",
    cartTitle: "Sovereign Apothecary Bag",
    emptyCart: "Your grooming bag is empty",
    checkout: "Proceed to Checkout",
    aiTitle: "AI Master Barber Consultation",
    aiSubtitle: "Powered by Gemini 3.7 Flash to engineer your optimal haircut, beard geometry, and apothecary ritual.",
    faceShape: "Face Shape / Cranial Structure",
    hairType: "Hair Texture & Density",
    beardGoal: "Beard Architecture Goal",
    lifestyle: "Lifestyle / Occasion",
    generateAdvice: "Generate Bespoke Grooming Blueprint",
    analyzing: "Master Barber analyzing your profile...",
    valetText: "Complimentary Valet Parking available at Rio Lakefront & Downtown Crown VIP Portico.",
    audioPlaying: "Lounge Ambiance Audio Playing",
    audioMuted: "Audio Muted"
  },
  ru: {
    brandSubtitle: "Элитное мужское ателье и барбершоп",
    locationHeading: "Гейтерсбург, Мэриленд",
    bookNow: "Записаться онлайн",
    consultAi: "AI Шеф-Стилист",
    services: "Услуги и Ритуалы",
    barbers: "Наши Мастера",
    gallery: "Галерея",
    apothecary: "Премиум Косметика",
    vipClub: "VIP Клуб",
    location: "Локация и График",
    heroBadge: "ГЕЙТЕРСБУРГ, МЭРИЛЕНД • CROWN & RIO LAKEFRONT",
    heroTitle: "ВЫСШИЙ СТАНДАРТ МУЖСКОГО УХОДА И ЭСТЕТИКИ",
    heroDesc: "Архитектурная стрижка ножницами, королевское бритье дамасской бритвой с горячими полотенцами и сервис экстра-класса в Гейтерсбурге.",
    statClients: "5,000+ Довольных гостей",
    statRating: "5.0 Звездный рейтинг",
    statYears: "14 Лет мастерства",
    selectBarber: "Выбрать мастера",
    selectService: "Выбрать услугу",
    stepService: "1. Услуги и дополнения",
    stepBarber: "2. Мастер-барбер",
    stepDateTime: "3. Дата и время",
    stepBeverage: "4. VIP-напиток и детали",
    stepConfirm: "5. Подтверждение",
    allCategories: "Все услуги",
    haircuts: "Стрижки",
    shaves: "Бритье лезвием",
    beards: "Оформление бороды",
    vipRituals: "VIP Ритуалы",
    duration: "мин",
    price: "$",
    addToCart: "В корзину",
    cartTitle: "Корзина Sovereign Apothecary",
    emptyCart: "Корзина пуста",
    checkout: "Оформить заказ",
    aiTitle: "AI Консультация Шеф-Барбера",
    aiSubtitle: "Нейросеть Gemini 3.7 подберет идеальную геометрию стрижки и бороды под черты вашего лица.",
    faceShape: "Форма лица",
    hairType: "Тип волос",
    beardGoal: "Цель для бороды",
    lifestyle: "Стиль и образ жизни",
    generateAdvice: "Получить план ухода",
    analyzing: "Шеф-барбер составляет план...",
    valetText: "Бесплатный Valet Parking в Rio Lakefront & Downtown Crown.",
    audioPlaying: "Атмосферный лаунж играет",
    audioMuted: "Звук выключен"
  }
};

export const DICTIONARY: Record<Language, typeof DICTIONARY_MAP.en> = new Proxy(DICTIONARY_MAP as Record<Language, typeof DICTIONARY_MAP.en>, {
  get(target, prop) {
    if (typeof prop === 'string' && prop in target) {
      return target[prop as Language];
    }
    return target.en || target.ky;
  }
});
