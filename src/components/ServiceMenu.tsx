import React, { useState } from 'react';
import { Clock, DollarSign, Sparkles, Check, ChevronDown, ChevronUp, Wine, Scissors, ShieldAlert } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { SERVICES_DATA, ADDONS_DATA, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onSelectService: (serviceId: string) => void;
}

export const ServiceMenu: React.FC<Props> = ({ language, onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair' | 'shave' | 'beard' | 'vip_rituals'>('all');
  const [expandedRitualId, setExpandedRitualId] = useState<string | null>(SERVICES_DATA[0].id);
  const d = DICTIONARY[language];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: d.allCategories },
    { id: 'hair', label: d.haircuts },
    { id: 'shave', label: d.shaves },
    { id: 'beard', label: d.beards },
    { id: 'vip_rituals', label: d.vipRituals },
  ];

  return (
    <section id="services" className="py-24 bg-[#0e0e11] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <Scissors className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Меню & Ритуалдар" : language === 'ru' ? "Меню и Ритуалы" : "Bespoke Menu"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.services}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {language === 'ky' 
              ? "Ар бир кызмат жөн гана чач кыркуу эмес, бул эркектин күчүн жана сымбатын ачуучу толук кандуу калыбына келтирүү ритуалы."
              : language === 'ru'
              ? "Каждая процедура — это законченный ритуал преображения с премиальной косметикой, японским озоновым паром и авторской техникой."
              : "Each appointment is an immersive grooming ceremony executed with surgical precision, botanical tonics, and classic straight razor mastery."}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#c5a059] text-black shadow-[0_0_20px_rgba(197,160,89,0.35)] font-bold'
                  : 'bg-[#151518] text-white/50 border border-white/5 hover:border-[#c5a059]/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service) => {
            const isExpanded = expandedRitualId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group rounded-2xl bg-[#111113] border border-white/10 hover:border-[#c5a059]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Service Image Banner */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/40"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {service.popular && (
                        <span className="px-3 py-1 rounded-full bg-[#c5a059] text-black font-cinzel font-bold text-[11px] uppercase tracking-wider shadow-lg">
                          Signature
                        </span>
                      )}
                      {service.includesBeverage && (
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#dfba6f] text-[11px] flex items-center gap-1 font-medium">
                          <Wine className="w-3 h-3 text-[#c5a059]" />
                          <span>Single Malt / Coffee</span>
                        </span>
                      )}
                    </div>

                    {/* Price & Duration Badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-lg bg-[#0a0a0b]/90 backdrop-blur-md border border-[#c5a059]/50 text-right">
                        <div className="text-xl font-bold font-cinzel text-[#c5a059]">
                          ${service.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{service.durationMin} {d.duration}</span>
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-[#f0f0f0] group-hover:text-[#c5a059] transition-colors mb-2">
                      {service.name[language]}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm font-light mb-4 line-clamp-2">
                      {service.tagline[language]}
                    </p>

                    {/* Ritual steps accordion toggle */}
                    <button
                      onClick={() => setExpandedRitualId(isExpanded ? null : service.id)}
                      className="w-full flex items-center justify-between py-2 text-xs text-[#c5a059] font-semibold uppercase tracking-wider border-t border-b border-white/10 hover:text-[#dfba6f] transition-colors my-3"
                    >
                      <span>{language === 'ky' ? "Ритуалдын этаптары" : language === 'ru' ? "Этапы ритуала" : "Ceremony Steps"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="py-2 space-y-2 text-xs text-white/80 animate-in fade-in duration-300 bg-[#0a0a0b]/60 p-3 rounded-lg border border-white/5 my-2">
                        {service.rituals[language].map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    id={`book-service-${service.id}`}
                    onClick={() => onSelectService(service.id)}
                    className="w-full py-3 rounded-xl bg-[#151518] hover:bg-[#c5a059] text-white/90 hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-[#c5a059] flex items-center justify-center gap-2"
                  >
                    <span>{d.bookNow}</span>
                    <span>•</span>
                    <span>${service.price}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111113] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#f0f0f0] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c5a059]" />
                <span>{language === 'ky' ? "Атайын Кошумча Премиум Процедуралар" : language === 'ru' ? "Премиум Дополнения к Визиту" : "VIP Add-On Enhancements"}</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">
                {language === 'ky' 
                  ? "Ар кандай кызматка кошуп, эс алууңузду ого бетер жогорку деңгээлге чыгарыңыз."
                  : language === 'ru'
                  ? "Могут быть добавлены к любой стрижке или ритуалу бритья."
                  : "Elevate your appointment with targeted apothecary & recovery treatments."}
              </p>
            </div>
            <button
              onClick={() => onSelectService(SERVICES_DATA[0].id)}
              className="px-5 py-2.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#dfba6f] hover:text-black font-semibold text-xs transition-all border border-[#c5a059]/40"
            >
              {language === 'ky' ? "Кошумчалар менен брондоо" : language === 'ru' ? "Записаться с дополнениями" : "Book with Add-ons"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDONS_DATA.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-xl bg-[#151518]/70 border border-white/5 flex flex-col justify-between hover:border-[#c5a059]/40 transition-colors"
              >
                <div>
                  <div className="font-medium text-sm text-[#f0f0f0] mb-1">
                    {addon.name[language]}
                  </div>
                  <div className="text-xs text-white/50">
                    +{addon.durationMin} {d.duration}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-cinzel font-bold text-[#c5a059] text-sm">+${addon.price}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Add-on</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
