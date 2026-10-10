import React, { useState, useEffect } from 'react';
import { Scissors, Phone, ShoppingBag, Sparkles, Menu, X, Globe, MapPin } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY, LOCATION_DETAILS } from '../data/barbershopData';

interface Props {
  language: Language;
  setLanguage?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenAiConsultant: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<Props> = ({
  language,
  setLanguage,
  onLanguageChange,
  onOpenBooking,
  onOpenAiConsultant,
  onOpenCart,
  cartCount
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const d = DICTIONARY[language] || DICTIONARY.en;

  const changeLanguage = (newLang: Language) => {
    if (typeof setLanguage === 'function') {
      setLanguage(newLang);
    }
    if (typeof onLanguageChange === 'function') {
      onLanguageChange(newLang);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: d.services, href: "#services" },
    { label: d.barbers, href: "#barbers" },
    { label: d.gallery, href: "#gallery" },
    { label: d.apothecary, href: "#apothecary" },
    { label: d.vipClub, href: "#vip" },
    { label: d.location, href: "#location" },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-[#0a0a0b]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/60 flex items-center justify-center bg-[#111113] group-hover:border-[#c5a059] transition-colors shadow-[0_0_15px_rgba(197,160,89,0.2)]">
              <Scissors className="w-5 h-5 text-[#c5a059] transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div>
              <div className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.2em] text-[#f0f0f0] group-hover:text-[#c5a059] transition-colors">
                SOVEREIGN & CO.
              </div>
              <div className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/50 font-medium">
                <MapPin className="w-2.5 h-2.5 text-[#c5a059]" />
                <span>Gaithersburg, MD • Atelier</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-[#c5a059] transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c5a059] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Book CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-[#151518] border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                id="lang-btn-en"
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  language === 'en' ? 'bg-[#c5a059] text-black shadow-sm' : 'text-white/50 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                id="lang-btn-ky"
                type="button"
                onClick={() => changeLanguage('ky')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  language === 'ky' ? 'bg-[#c5a059] text-black shadow-sm' : 'text-white/50 hover:text-white'
                }`}
                title="Кыргызча"
              >
                KG
              </button>
              <button
                id="lang-btn-ru"
                type="button"
                onClick={() => changeLanguage('ru')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  language === 'ru' ? 'bg-[#c5a059] text-black shadow-sm' : 'text-white/50 hover:text-white'
                }`}
                title="Русский"
              >
                RU
              </button>
            </div>

            {/* AI Consultant Button */}
            <button
              id="nav-ai-consultant-btn"
              onClick={onOpenAiConsultant}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#151518] border border-[#c5a059]/40 text-[#dfba6f] hover:border-[#c5a059] hover:bg-[#1b1b20] text-xs font-medium transition-all"
              title={d.consultAi}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
              <span>{d.consultAi}</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#151518] border border-white/10 hover:border-[#c5a059]/50 text-white/70 hover:text-white transition-colors"
              title={d.cartTitle}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-black font-bold text-[10px] flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Phone Concierge */}
            <a
              href={`tel:${LOCATION_DETAILS.phone}`}
              className="hidden md:flex items-center justify-center p-2 rounded-lg bg-[#151518] border border-white/10 hover:border-[#c5a059]/50 text-white/70 hover:text-[#c5a059] transition-colors"
              title={`Call Concierge: ${LOCATION_DETAILS.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Main Booking Button */}
            <button
              id="nav-book-btn"
              onClick={() => onOpenBooking()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#9e7a32] hover:from-[#dfba6f] hover:to-[#c5a059] text-black font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-[0_6px_25px_rgba(197,160,89,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {d.bookNow}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e11] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          
          {/* Language Selection in Mobile Drawer */}
          <div className="pb-3 border-b border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Language / Тил / Язык</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  changeLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'bg-[#151518] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  changeLanguage('ky');
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  language === 'ky'
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'bg-[#151518] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                Кыргызча
              </button>
              <button
                type="button"
                onClick={() => {
                  changeLanguage('ru');
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  language === 'ru'
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'bg-[#151518] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                Русский
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wider text-white/80 hover:text-[#c5a059] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiConsultant();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#151518] border border-[#c5a059]/50 text-[#dfba6f] text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              {d.consultAi}
            </button>

            <a
              href={`tel:${LOCATION_DETAILS.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#151518] border border-white/10 text-white/80 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span>{LOCATION_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
