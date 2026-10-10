import React, { useState } from 'react';
import { Crown, Check, Sparkles, ArrowRight, ShieldCheck, Wine } from 'lucide-react';
import { Language, VipClubTier } from '../types';
import { VIP_TIERS, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onSelectTier: (tierName: string) => void;
}

export const VipClubSection: React.FC<Props> = ({ language, onSelectTier }) => {
  const [selectedTierModal, setSelectedTierModal] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const d = DICTIONARY[language];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <section id="vip" className="py-24 bg-[#0e0e11] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Элиталык Мүчөлүк" : language === 'ru' ? "Клуб Привилегий" : "The Gaithersburg Club Privé"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.vipClub}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {language === 'ky' 
              ? "Чексиз сапарлар, жеке VIP бөлмөсү, сигар залы жана атайын жеке мастердин кам көрүүсү."
              : language === 'ru'
              ? "Безлимитный уход за волосами и бородой, персональный сьют, доступ в сигарный лаунж и выезд мастера."
              : "Unrestricted monthly grooming access, guaranteed Private Suite reservations, and bespoke Scotch & Cigar Lounge privileges."}
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {VIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              id={`vip-tier-${tier.id}`}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#18181c] to-[#111113] border-2 border-[#c5a059] shadow-[0_10px_40px_rgba(197,160,89,0.25)] transform -translate-y-2'
                  : 'bg-[#111113] border border-white/10 hover:border-[#c5a059]/40'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c5a059] text-black font-cinzel font-bold text-[11px] uppercase tracking-wider shadow-lg whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-white/10">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-white/50 min-h-[32px] font-light">
                    {tier.tagline[language]}
                  </p>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="font-cinzel text-4xl font-extrabold text-[#c5a059]">${tier.pricePerMonth}</span>
                    <span className="text-xs text-white/50 font-medium">/ month</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="py-6 space-y-3.5">
                  {tier.features[language].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-white/80">
                      <div className="w-4 h-4 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedTierModal(tier.name)}
                  className={`w-full py-3.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#c5a059] hover:bg-[#dfba6f] text-black shadow-lg shadow-[#c5a059]/30'
                      : 'bg-[#151518] hover:bg-[#c5a059] text-white/80 hover:text-black border border-white/10 hover:border-[#c5a059]'
                  }`}
                >
                  <span>{language === 'ky' ? "Мүчөлүккө кошулуу" : "Inquire Membership"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Private Lounge Feature Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#141417] to-[#18181d] border border-[#c5a059]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] shrink-0">
              <Wine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-bold text-white">
                {language === 'ky' ? "Rio Lakefront Сигар & Single Malt Лаунж" : "Rio Lakefront Private Speakeasy & Cigar Room"}
              </h4>
              <p className="text-xs text-white/50 mt-0.5 font-light">
                {language === 'ky' ? "Бардык VIP мүчөлөр сапар учурунда коноктору менен эс ала алышат." : "Complimentary premium spirits bar, private high-speed Wi-Fi, and Cuban humidor for VIP members."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedTierModal("The Sovereign Crown Club")}
            className="px-6 py-3 rounded-xl bg-[#111113] border border-[#c5a059]/60 text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-cinzel font-bold text-xs uppercase transition-all tracking-wider shrink-0"
          >
            {language === 'ky' ? "Лаунж эрежелери & Суроо" : "Request Private Tour"}
          </button>
        </div>

      </div>

      {/* Membership Application Modal */}
      {selectedTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#111113] border border-[#c5a059]/50 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => {
                setSelectedTierModal(null);
                setIsSuccess(false);
              }}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>

            {!isSuccess ? (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="text-center">
                  <Crown className="w-8 h-8 text-[#c5a059] mx-auto mb-2" />
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    {selectedTierModal}
                  </h4>
                  <p className="text-xs text-white/50 mt-1">
                    {language === 'ky' ? "VIP Консьерж сиз менен 2 саат ичинде байланышат." : "Our Private Membership Concierge will reach out promptly."}
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    {language === 'ky' ? "Атыңыз" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Sterling"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 text-xs text-white focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    {language === 'ky' ? "Телефон номериңиз" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (301) 555-0199"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 text-xs text-white focus:border-[#c5a059] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#dfba6f] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all mt-2"
                >
                  {language === 'ky' ? "Өтүнмө жөнөтүү" : "Submit VIP Application"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <Check className="w-10 h-10 text-[#c5a059] mx-auto stroke-[3]" />
                <h4 className="font-cinzel text-lg font-bold text-white">
                  {language === 'ky' ? "Өтүнмө кабыл алынды!" : "Application Received"}
                </h4>
                <p className="text-xs text-white/80">
                  {language === 'ky' 
                    ? "Биздин башкы консьерж жакында байланышып, сиздин жеке VIP картаңызды активдештирет." 
                    : "Our Concierge Director will contact you within 2 business hours."}
                </p>
                <button
                  onClick={() => {
                    setSelectedTierModal(null);
                    setIsSuccess(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-white/10 text-xs font-semibold text-white mt-2"
                >
                  {language === 'ky' ? "Жабуу" : "Close"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
