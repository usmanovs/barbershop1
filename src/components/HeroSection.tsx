import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star, Award, MapPin } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, LOCATION_DETAILS } from '../data/barbershopData';

interface Props {
  language: Language;
  onOpenBooking: () => void;
  onOpenAiConsultant: () => void;
}

export const HeroSection: React.FC<Props> = ({ language, onOpenBooking, onOpenAiConsultant }) => {
  const d = DICTIONARY[language];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0a0a0b]">
      {/* Cinematic Background with atmospheric layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=85"
          alt="Sovereign & Co. Luxury Barbershop Gaithersburg"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 scale-105"
        />
        {/* Gradients to blend smoothly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-transparent to-[#0a0a0b]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a059]/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151518]/90 border border-[#c5a059]/40 text-[#c5a059] text-xs font-semibold tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-lg shadow-[#c5a059]/5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{d.heroBadge}</span>
        </div>

        {/* Main Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f0f0f0] max-w-5xl leading-[1.15] mb-6">
          {language === 'ky' ? (
            <>
              ЭРКЕКТЕРДИН ЭҢ ЖОГОРКУ <span className="text-gold-gradient italic">ЭСТЕТИКАСЫ</span> & САЛТЫ
            </>
          ) : language === 'ru' ? (
            <>
              ВЫСШИЙ СТАНДАРТ <span className="text-gold-gradient italic">МУЖСКОГО УХОДА</span> В МЭРИЛЕНДЕ
            </>
          ) : (
            <>
              THE APOTHEOSIS OF <span className="text-gold-gradient italic">GENTLEMEN'S GROOMING</span>
            </>
          )}
        </h1>

        {/* Refined Subtitle */}
        <p className="max-w-3xl text-sm sm:text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10">
          {d.heroDesc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#dfba6f] to-[#9e7a32] hover:from-[#e5c57d] hover:to-[#c5a059] text-black font-cinzel font-bold text-sm tracking-[0.15em] uppercase shadow-[0_4px_30px_rgba(197,160,89,0.4)] hover:shadow-[0_8px_35px_rgba(197,160,89,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <Calendar className="w-4 h-4" />
            <span>{d.bookNow}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-ai-btn"
            onClick={onOpenAiConsultant}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#151518]/90 border border-[#c5a059]/50 hover:border-[#c5a059] text-[#f0f0f0] hover:text-[#c5a059] font-medium text-sm tracking-wider transition-all backdrop-blur-md flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-4 h-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
            <span>{d.consultAi}</span>
          </button>
        </div>

        {/* Key Luxury Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-white/10">
          
          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#111113]/60 border border-white/5">
            <div className="flex items-center gap-1 text-[#c5a059] mb-1">
              <Star className="w-4 h-4 fill-[#c5a059]" />
              <span className="font-bold text-lg font-cinzel text-white">5.0</span>
            </div>
            <span className="text-xs text-white/50 font-medium">
              {language === 'ky' ? "Кемчиликсиз Рейтинг" : language === 'ru' ? "Идеальный рейтинг" : "Guild Rating"}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#111113]/60 border border-white/5">
            <div className="flex items-center gap-1 text-[#c5a059] mb-1">
              <Award className="w-4 h-4" />
              <span className="font-bold text-lg font-cinzel text-white">14+</span>
            </div>
            <span className="text-xs text-white/50 font-medium">
              {language === 'ky' ? "Жылдык Тажрыйба" : language === 'ru' ? "Лет опыта" : "Years Heritage"}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#111113]/60 border border-white/5">
            <div className="flex items-center gap-1 text-[#c5a059] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-lg font-cinzel text-white">100%</span>
            </div>
            <span className="text-xs text-white/50 font-medium">
              {language === 'ky' ? "Дамаск Болаты & Гигиена" : language === 'ru' ? "Стерильность & Damascus" : "Surgical Purity"}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 rounded-xl bg-[#111113]/60 border border-white/5">
            <div className="flex items-center gap-1 text-[#c5a059] mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-bold text-lg font-cinzel text-white">Rio/Crown</span>
            </div>
            <span className="text-xs text-white/50 font-medium">
              {language === 'ky' ? "Valet Parking Акысыз" : language === 'ru' ? "Valet Parking включен" : "Valet Parking"}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
