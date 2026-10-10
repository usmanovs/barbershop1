import React from 'react';
import { Scissors, Sparkles, MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { LOCATION_DETAILS, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onLanguageChange?: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenAiConsultant: () => void;
}

export const Footer: React.FC<Props> = ({ language, onLanguageChange, onOpenBooking, onOpenAiConsultant }) => {
  const d = DICTIONARY[language] || DICTIONARY.en;

  const changeLanguage = (newLang: Language) => {
    if (typeof onLanguageChange === 'function') {
      onLanguageChange(newLang);
    }
  };

  return (
    <footer className="bg-[#070708] border-t border-white/10 pt-16 pb-12 text-white/50 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8a6a2a] flex items-center justify-center text-black font-cinzel font-black shadow-[0_0_15px_rgba(197,160,89,0.4)]">
                S
              </div>
              <div>
                <span className="font-cinzel text-base font-bold tracking-widest text-[#f0f0f0] block">
                  SOVEREIGN & CO.
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase block font-semibold">
                  Gaithersburg, MD
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 font-light leading-relaxed">
              {language === 'ky' 
                ? "Эркиндиктин, күчтүн жана элиталык сымбаттын символу. Мэриленд штатындагы эң жогорку деңгээлдеги мырзалар салону."
                : "The apotheosis of bespoke men's grooming, cranial styling, and royal hot towel straight-razor ceremonies."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-[#111113] border border-white/10 hover:border-[#c5a059] flex items-center justify-center text-white/70 hover:text-[#c5a059] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#111113] border border-white/10 hover:border-[#c5a059] flex items-center justify-center text-white/70 hover:text-[#c5a059] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-white uppercase tracking-wider">
              {language === 'ky' ? "Навигация" : "Navigation"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.services}
                </a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.barbers}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.gallery}
                </a>
              </li>
              <li>
                <a href="#apothecary" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.apothecary}
                </a>
              </li>
              <li>
                <a href="#vip" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.vipClub}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#c5a059] transition-colors text-white/60 hover:text-white">
                  {d.location}
                </a>
              </li>
            </ul>
          </div>

          {/* Bespoke Services */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-white uppercase tracking-wider">
              {language === 'ky' ? "VIP Кызматтар" : "Ceremonies"}
            </h4>
            <ul className="space-y-2 text-xs text-white/50">
              <li>The Sovereign Royal Haircut ($85)</li>
              <li>Damascus Straight-Razor Shave ($75)</li>
              <li>The Crown Imperial Experience ($210)</li>
              <li>Beard Sculpting & Ozone Steam ($65)</li>
              <li>24K Pure Gold Collagen Facial Mask ($45)</li>
              <li>Organic Botanical Scalp Detox ($40)</li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-white uppercase tracking-wider">
              {language === 'ky' ? "Байланыш & Дарек" : "Gaithersburg Atelier"}
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{LOCATION_DETAILS.address}, {LOCATION_DETAILS.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`tel:${LOCATION_DETAILS.phone}`} className="hover:text-[#c5a059]">{LOCATION_DETAILS.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`mailto:${LOCATION_DETAILS.conciergeEmail}`} className="hover:text-[#c5a059]">{LOCATION_DETAILS.conciergeEmail}</a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#dfba6f] hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all border border-[#c5a059]/40"
              >
                {d.bookNow}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Language selector */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} Sovereign & Co. Bespoke Barbershop LLC. Gaithersburg, Maryland. All rights reserved.
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {/* Language Switcher in Footer */}
            {onLanguageChange && (
              <div className="flex items-center gap-1.5 bg-[#111113] border border-white/10 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    language === 'en' ? 'bg-[#c5a059] text-black font-bold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('ky')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    language === 'ky' ? 'bg-[#c5a059] text-black font-bold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Кыргызча
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('ru')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    language === 'ru' ? 'bg-[#c5a059] text-black font-bold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Русский
                </button>
              </div>
            )}

            <span className="flex items-center gap-1 text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Licensed Maryland Master Barbers Guild</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
