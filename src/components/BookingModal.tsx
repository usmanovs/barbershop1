import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, User, Scissors, Sparkles, Coffee, Wine, ShieldCheck, Download, ChevronRight, ChevronLeft, MapPin, Phone } from 'lucide-react';
import { Language, BookingState, ServiceItem, BarberArtisan } from '../types';
import { SERVICES_DATA, ADDONS_DATA, BARBERS_DATA, LUXURY_BEVERAGES, LOCATION_DETAILS, DICTIONARY } from '../data/barbershopData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialServiceId?: string;
  initialBarberId?: string;
}

export const BookingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  initialServiceId,
  initialBarberId
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const d = DICTIONARY[language];

  // Generate next 10 dates
  const availableDates = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayNames = language === 'ky' 
      ? ['Жек', 'Дүй', 'Шей', 'Шар', 'Бей', 'Жум', 'Ише'] 
      : language === 'ru' 
      ? ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] 
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = language === 'ky'
      ? ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
      : language === 'ru'
      ? ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      monthName: monthNames[d.getMonth()]
    };
  });

  const timeSlots = [
    { time: "09:30 AM", period: "morning" },
    { time: "10:30 AM", period: "morning" },
    { time: "11:45 AM", period: "morning" },
    { time: "01:15 PM", period: "afternoon" },
    { time: "02:30 PM", period: "afternoon" },
    { time: "03:45 PM", period: "afternoon" },
    { time: "05:00 PM", period: "evening" },
    { time: "06:15 PM", period: "evening" },
    { time: "07:30 PM", period: "evening" },
    { time: "08:15 PM", period: "evening" },
  ];

  const [booking, setBooking] = useState<BookingState>({
    selectedServiceIds: [initialServiceId || SERVICES_DATA[0].id],
    selectedAddonIds: [],
    selectedBarberId: initialBarberId || null,
    selectedDate: availableDates[0].dateString,
    selectedTime: "11:45 AM",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    selectedBeverage: "bourbon",
    specialRequests: "",
    status: 'draft',
    bookingReference: ""
  });

  useEffect(() => {
    if (initialServiceId) {
      setBooking(prev => ({
        ...prev,
        selectedServiceIds: [initialServiceId]
      }));
    }
    if (initialBarberId) {
      setBooking(prev => ({
        ...prev,
        selectedBarberId: initialBarberId
      }));
    }
  }, [initialServiceId, initialBarberId]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setBooking(prev => {
      const exists = prev.selectedServiceIds.includes(id);
      if (exists && prev.selectedServiceIds.length > 1) {
        return { ...prev, selectedServiceIds: prev.selectedServiceIds.filter(s => s !== id) };
      } else {
        return { ...prev, selectedServiceIds: [id] }; // Single primary service for clarity
      }
    });
  };

  const toggleAddon = (id: string) => {
    setBooking(prev => {
      const exists = prev.selectedAddonIds.includes(id);
      return {
        ...prev,
        selectedAddonIds: exists 
          ? prev.selectedAddonIds.filter(a => a !== id) 
          : [...prev.selectedAddonIds, id]
      };
    });
  };

  const calculateTotal = () => {
    const servicesTotal = booking.selectedServiceIds.reduce((sum, id) => {
      const s = SERVICES_DATA.find(item => item.id === id);
      return sum + (s ? s.price : 0);
    }, 0);

    const addonsTotal = booking.selectedAddonIds.reduce((sum, id) => {
      const a = ADDONS_DATA.find(item => item.id === id);
      return sum + (a ? a.price : 0);
    }, 0);

    return servicesTotal + addonsTotal;
  };

  const calculateDuration = () => {
    const servicesDur = booking.selectedServiceIds.reduce((sum, id) => {
      const s = SERVICES_DATA.find(item => item.id === id);
      return sum + (s ? s.durationMin : 0);
    }, 0);

    const addonsDur = booking.selectedAddonIds.reduce((sum, id) => {
      const a = ADDONS_DATA.find(item => item.id === id);
      return sum + (a ? a.durationMin : 0);
    }, 0);

    return servicesDur + addonsDur;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.clientName || !booking.clientPhone) {
      alert(language === 'ky' ? "Сураныч, атыңызды жана телефон номериңизди жазыңыз." : "Please provide your name and phone number.");
      return;
    }

    const ref = `SVG-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setBooking(prev => ({
      ...prev,
      status: 'confirmed',
      bookingReference: ref
    }));
    setCurrentStep(5);
  };

  const downloadCalendarFile = () => {
    const primaryService = SERVICES_DATA.find(s => s.id === booking.selectedServiceIds[0]);
    const barber = BARBERS_DATA.find(b => b.id === booking.selectedBarberId);
    const title = `Sovereign & Co. Appointment - ${primaryService?.name.en || 'Master Grooming'}`;
    const desc = `Bespoke Grooming at Sovereign & Co. Gaithersburg\\nArtisan: ${barber?.name || 'Master Barber'}\\nRef: ${booking.bookingReference}\\nAddress: ${LOCATION_DETAILS.address}, ${LOCATION_DETAILS.city}`;
    
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sovereign and Co//Grooming Pass//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:${LOCATION_DETAILS.address}, ${LOCATION_DETAILS.city}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Sovereign_Appointment_${booking.bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedPrimaryService = SERVICES_DATA.find(s => s.id === booking.selectedServiceIds[0]);
  const selectedBarber = BARBERS_DATA.find(b => b.id === booking.selectedBarberId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div 
        id="booking-modal-card"
        className="relative w-full max-w-3xl bg-[#111113] border border-[#c5a059]/40 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden my-8"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#151518]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/50 flex items-center justify-center">
              <Scissors className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#f0f0f0] tracking-wider">
                SOVEREIGN & CO. RESERVATION
              </h3>
              <p className="text-[11px] text-white/50">
                {LOCATION_DETAILS.address} • Gaithersburg, MD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress */}
        {booking.status !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#0a0a0b] border-b border-white/5 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-1">
              {[
                { step: 1, label: d.stepService },
                { step: 2, label: d.stepBarber },
                { step: 3, label: d.stepDateTime },
                { step: 4, label: d.stepBeverage },
              ].map(st => (
                <button
                  key={st.step}
                  onClick={() => currentStep > st.step && setCurrentStep(st.step)}
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                    currentStep === st.step
                      ? 'text-[#c5a059] font-bold'
                      : currentStep > st.step
                      ? 'text-white/80 hover:text-white'
                      : 'text-white/30'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep === st.step 
                      ? 'bg-[#c5a059] text-black font-bold' 
                      : currentStep > st.step 
                      ? 'bg-[#c5a059]/30 text-[#c5a059]' 
                      : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {st.step}
                  </span>
                  <span className="hidden sm:inline">{st.label}</span>
                </button>
              ))}
            </div>
            <div className="text-white/50 font-cinzel font-bold text-xs shrink-0 pl-2">
              ${calculateTotal()} • {calculateDuration()} {d.duration}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: SERVICES & ADD-ONS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">
                  {language === 'ky' ? "Негизги Кызматты тандаңыз" : language === 'ru' ? "Выберите основную услугу" : "Select Bespoke Service"}
                </h4>
                <p className="text-xs text-white/50 mb-4 font-light">
                  {language === 'ky' ? "Ар бир кызматка премиум баш жуу жана ысык сүлгү кошулган." : "All services include craft consultation and hot towel tonic finish."}
                </p>

                <div className="space-y-3">
                  {SERVICES_DATA.map((srv) => {
                    const isSelected = booking.selectedServiceIds.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#18181d] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                            : 'bg-[#151518] border-white/10 hover:border-[#c5a059]/40'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#c5a059] border-[#c5a059] text-black' : 'border-neutral-500'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[#f2ede4] flex items-center gap-2">
                              <span>{srv.name[language]}</span>
                              {srv.popular && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-semibold uppercase">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-white/50 mt-0.5 font-light">
                              {srv.durationMin} {d.duration} • {srv.tagline[language]}
                            </div>
                          </div>
                        </div>

                        <div className="font-cinzel font-bold text-base text-[#c5a059] shrink-0">
                          ${srv.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons Sub-section */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-cinzel text-sm font-bold text-[#dfba6f] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>{language === 'ky' ? "Премиум Кошумчалар (Каалоо боюнча)" : language === 'ru' ? "VIP Дополнения к Визиту" : "VIP Add-On Enhancements"}</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADDONS_DATA.map((addon) => {
                    const isSelected = booking.selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#18181d] border-[#c5a059]'
                            : 'bg-[#151518]/80 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#c5a059] border-[#c5a059] text-black' : 'border-neutral-500'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-medium text-white/90">{addon.name[language]}</div>
                            <div className="text-white/40 text-[11px]">+{addon.durationMin} min</div>
                          </div>
                        </div>
                        <span className="font-bold text-[#c5a059]">+${addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MASTER BARBER SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">
                  {language === 'ky' ? "Мастер Чеберди тандаңыз" : language === 'ru' ? "Выберите мастера" : "Select Master Artisan"}
                </h4>
                <p className="text-xs text-white/50 mb-4 font-light">
                  {language === 'ky' ? "Бардык чеберлер жогорку квалификацияга жана көп жылдык тажрыйбага ээ." : "Every artisan brings distinct guild certifications and bespoke tailoring mastery."}
                </p>
              </div>

              {/* Any Barber Option */}
              <div
                onClick={() => setBooking({ ...booking, selectedBarberId: null })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  booking.selectedBarberId === null
                    ? 'bg-[#18181d] border-[#c5a059]'
                    : 'bg-[#151518] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">
                      {language === 'ky' ? "Биринчи бош турган мастер (First Available)" : language === 'ru' ? "Первый свободный мастер" : "First Available Senior Artisan"}
                    </div>
                    <div className="text-xs text-white/50 font-light">
                      {language === 'ky' ? "Эң ыңгайлуу убакытты алуу үчүн сунушталат" : "Optimal for most flexible appointment scheduling"}
                    </div>
                  </div>
                </div>
                {booking.selectedBarberId === null && <Check className="w-5 h-5 text-[#c5a059]" />}
              </div>

              {/* Barbers List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BARBERS_DATA.map((barber) => {
                  const isSelected = booking.selectedBarberId === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setBooking({ ...booking, selectedBarberId: barber.id })}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#18181d] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                          : 'bg-[#151518] border-white/10 hover:border-[#c5a059]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 mb-3">
                        <img
                          src={barber.photo}
                          alt={barber.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-full object-cover border border-[#c5a059]/50"
                        />
                        <div>
                          <h5 className="font-semibold text-sm text-white flex items-center gap-1.5">
                            <span>{barber.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                          </h5>
                          <p className="text-xs text-[#c5a059] font-medium">{barber.title[language]}</p>
                          <p className="text-[11px] text-white/50">{barber.experienceYears}+ {language === 'ky' ? 'жыл тажрыйба' : 'years craft'}</p>
                        </div>
                      </div>

                      <div className="text-xs text-white/80 font-light border-t border-white/5 pt-2">
                        <span className="text-white/50 font-medium">{language === 'ky' ? 'Багыты:' : 'Specialty:'}</span> {barber.specialties[language][0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">
                  {language === 'ky' ? "Күндү жана Убакытты тандаңыз" : language === 'ru' ? "Выберите дату и время" : "Select Date & Time Slot"}
                </h4>
                <p className="text-xs text-white/50 mb-4 font-light">
                  Gaithersburg Atelier • Rio Lakefront Suite 240
                </p>

                {/* Date Slider */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
                  {availableDates.map((item) => {
                    const isSelected = booking.selectedDate === item.dateString;
                    return (
                      <button
                        key={item.dateString}
                        onClick={() => setBooking({ ...booking, selectedDate: item.dateString })}
                        className={`flex flex-col items-center justify-center min-w-[70px] py-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-lg'
                            : 'bg-[#151518] border-white/10 text-white/70 hover:border-[#c5a059]/40'
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider">{item.dayName}</span>
                        <span className="text-lg font-cinzel font-extrabold my-0.5">{item.dayNum}</span>
                        <span className="text-[10px] opacity-80">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <h5 className="font-medium text-xs text-white/70 uppercase tracking-wider mb-3">
                  {language === 'ky' ? "Жеткиликтүү убакыттар:" : language === 'ru' ? "Доступное время:" : "Available Master Slots:"}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = booking.selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        onClick={() => setBooking({ ...booking, selectedTime: slot.time })}
                        className={`py-2.5 px-2 rounded-lg text-xs font-semibold tracking-wide border transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-md'
                            : 'bg-[#151518] border-white/10 text-white/70 hover:border-[#c5a059]/50 hover:text-white'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BEVERAGE & CONTACT DETAILS */}
          {currentStep === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6 animate-in fade-in duration-300">
              
              {/* Complimentary Beverage */}
              <div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1 flex items-center gap-2">
                  <Wine className="w-4 h-4 text-[#c5a059]" />
                  <span>{language === 'ky' ? "Акысыз VIP Суусундук (Complimentary Bar)" : language === 'ru' ? "Элитный напиток к вашему визиту" : "Complimentary VIP Bar Selection"}</span>
                </h4>
                <p className="text-xs text-white/50 mb-3 font-light">
                  {language === 'ky' ? "Креслого отурганыңызда сиз үчүн жаңы демделип даярдалат." : "Served upon arrival in our private lounge."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {LUXURY_BEVERAGES.map((bev) => {
                    const isSelected = booking.selectedBeverage === bev.id;
                    return (
                      <div
                        key={bev.id}
                        onClick={() => setBooking({ ...booking, selectedBeverage: bev.id })}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#18181d] border-[#c5a059] text-[#dfba6f]'
                            : 'bg-[#151518] border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span className="font-medium">{bev.name[language]}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#c5a059]" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-cinzel text-base font-bold text-white">
                  {language === 'ky' ? "Коноктун Маалыматы" : language === 'ru' ? "Контакты гостя" : "Guest Information"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1.5 font-medium">
                      {language === 'ky' ? "Толук аты-жөнүңүз *" : language === 'ru' ? "Ваше имя *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Sterling / Азамат"
                      value={booking.clientName}
                      onChange={(e) => setBooking({ ...booking, clientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 focus:border-[#c5a059] text-sm text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1.5 font-medium">
                      {language === 'ky' ? "Телефон номериңиз *" : language === 'ru' ? "Номер телефона *" : "Phone Number (for SMS confirmation) *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (301) 555-0199"
                      value={booking.clientPhone}
                      onChange={(e) => setBooking({ ...booking, clientPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 focus:border-[#c5a059] text-sm text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">
                    {language === 'ky' ? "Электрондук почта (Календарь жана квитанция үчүн)" : language === 'ru' ? "Электронная почта" : "Email Address (Optional)"}
                  </label>
                  <input
                    type="email"
                    placeholder="vip.client@example.com"
                    value={booking.clientEmail}
                    onChange={(e) => setBooking({ ...booking, clientEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 focus:border-[#c5a059] text-sm text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1.5 font-medium">
                    {language === 'ky' ? "Атайын суроо-талап же комментарий" : language === 'ru' ? "Пожелания мастеру" : "Special Grooming Notes / Consultation Requests"}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Sensitive skin on neckline, preparing for evening executive gala..."
                    value={booking.specialRequests}
                    onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#151518] border border-white/10 focus:border-[#c5a059] text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>{language === 'ky' ? "Акысыз жокко чыгаруу (сапарга 2 саат калганга чейин)." : "Guaranteed appointment reservation with complimentary rescheduling."}</span>
              </div>

              <button
                type="submit"
                id="submit-booking-btn"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7a32] hover:from-[#dfba6f] hover:to-[#c5a059] text-black font-cinzel font-bold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(197,160,89,0.35)] transition-all"
              >
                {language === 'ky' ? `Брондоону тастыктоо • $${calculateTotal()}` : language === 'ru' ? `Подтвердить визит • $${calculateTotal()}` : `Confirm Bespoke Reservation • $${calculateTotal()}`}
              </button>
            </form>
          )}

          {/* STEP 5: DIGITAL VIP PASS (CONFIRMED) */}
          {currentStep === 5 && (
            <div className="space-y-6 py-2 animate-in zoom-in-95 duration-500 text-center">
              
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border-2 border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest text-[#c5a059] uppercase">
                  {language === 'ky' ? "Кезек Ийгиликтүү Брондолду" : language === 'ru' ? "Запись успешно подтверждена" : "Reservation Confirmed"}
                </span>
                <h4 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {booking.clientName}, We Await You
                </h4>
                <p className="text-xs text-white/50 mt-1">
                  SMS & Calendar confirmation generated for reference <span className="font-mono text-[#c5a059]">{booking.bookingReference}</span>
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-b from-[#18181c] to-[#111113] border-2 border-[#c5a059]/60 p-6 text-left shadow-2xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#c5a059]/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div>
                    <div className="font-cinzel font-bold text-sm text-white tracking-widest">SOVEREIGN VIP PASS</div>
                    <div className="text-[10px] text-white/40">Gaithersburg, Maryland Atelier</div>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded border border-[#c5a059]/30">
                    {booking.bookingReference}
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">{language === 'ky' ? "Кызмат:" : "Service:"}</span>
                    <span className="font-semibold text-white text-right">{selectedPrimaryService?.name[language]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/40">{language === 'ky' ? "Чебер:" : "Artisan:"}</span>
                    <span className="font-semibold text-[#c5a059]">{selectedBarber?.name || "Senior Master Barber"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/40">{language === 'ky' ? "Күнү & Убактысы:" : "Date & Time:"}</span>
                    <span className="font-semibold text-white">{booking.selectedDate} at {booking.selectedTime}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/40">{language === 'ky' ? "Суусундук:" : "Beverage:"}</span>
                    <span className="font-semibold text-white/80">
                      {LUXURY_BEVERAGES.find(b => b.id === booking.selectedBeverage)?.name[language]}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                    <span className="text-white/70">{language === 'ky' ? "Жалпы баасы:" : "Total Balance:"}</span>
                    <span className="font-cinzel text-[#c5a059]">${calculateTotal()}</span>
                  </div>
                </div>

                {/* Location reminder */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2 text-[11px] text-white/40">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>{LOCATION_DETAILS.address}, {LOCATION_DETAILS.city} (Valet Parking Included)</span>
                </div>
              </div>

              {/* Pass Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={downloadCalendarFile}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#151518] hover:bg-[#1f1f25] border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#c5a059]" />
                  <span>{language === 'ky' ? "Календарга кошуу (.ics)" : "Add to Apple / Google Calendar"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#dfba6f] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {language === 'ky' ? "Түшүндүм, Жабуу" : "Done"}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Controls (Step 1-3 Navigation) */}
        {booking.status !== 'confirmed' && currentStep < 4 && (
          <div className="px-6 py-4 bg-[#111113] border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/70 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'ky' ? "Артка" : "Back"}</span>
              </button>
            ) : <div></div>}

            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#dfba6f] text-black font-cinzel font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span>{language === 'ky' ? "Улантуу" : "Continue"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
