import React from 'react';
import { Star, ShieldCheck, Quote, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { REVIEWS_DATA, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
}

export const ReviewsSection: React.FC<Props> = ({ language }) => {
  const d = DICTIONARY[language];

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Кардарлардын Пикирлери" : language === 'ru' ? "Отзывы Гостей" : "Client Accolades"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {language === 'ky' ? "МЭРИЛЕНД ДЖЕНТЛЬМЕНДЕРИНИН БААСЫ" : "UNBLEMISHED CLIENT REPUTATION"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#c5a059] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#c5a059]" />
            ))}
            <span className="font-cinzel font-bold text-lg text-white ml-2">5.0 / 5.0</span>
          </div>
          <p className="text-xs text-white/50 font-light">
            {language === 'ky' ? "Montgomery County жана Washington D.C. аймагындагы элиталык кардарлардын пикирлери." : "Verified reviews from business leaders, surgeons, and discerning gentlemen across Maryland & D.C."}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl p-7 bg-[#111113] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between relative shadow-lg"
            >
              <Quote className="w-8 h-8 text-[#c5a059]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#c5a059]">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#c5a059]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed italic">
                  "{rev.comment[language]}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-6">
                <div>
                  <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" title="Verified Guest" />
                    )}
                  </h4>
                  <p className="text-[11px] text-[#c5a059]">{rev.title}</p>
                  <p className="text-[10px] text-white/40">{rev.location}</p>
                </div>
                <span className="text-[10px] text-white/40">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
