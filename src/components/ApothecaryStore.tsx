import React from 'react';
import { ShoppingBag, Star, Sparkles, Check, Package, ShieldCheck } from 'lucide-react';
import { Language, ApothecaryProduct } from '../types';
import { APOTHECARY_PRODUCTS, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onAddToCart: (product: ApothecaryProduct) => void;
}

export const ApothecaryStore: React.FC<Props> = ({ language, onAddToCart }) => {
  const d = DICTIONARY[language];

  return (
    <section id="apothecary" className="py-24 bg-[#0a0a0b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Аптека & Косметика" : language === 'ru' ? "Премиальный Уход" : "Sovereign Apothecary"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.apothecary}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {language === 'ky' 
              ? "Органикалык майлар, бентонит чопосу, дамаск болаты жана табигый эссенциялар. Салондук сапат үй шартында."
              : language === 'ru'
              ? "Органические формулы холодного отжима, премиальные помады и кованые дамасские бритвы ручной работы."
              : "Handcrafted grooming formulations and forged Damascus metallurgy designed exclusively for our clientele."}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
          {APOTHECARY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              id={`product-card-${prod.id}`}
              className="group rounded-2xl bg-[#111113] border border-white/10 hover:border-[#c5a059]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-60 overflow-hidden bg-[#0e0e11]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/20"></div>

                  {/* Badge */}
                  {prod.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#c5a059] text-black font-cinzel font-bold text-[10px] uppercase tracking-wider shadow">
                      {prod.badge}
                    </div>
                  )}

                  {/* Volume */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] text-white/70 border border-white/10 font-mono">
                    {prod.volume}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#c5a059] mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#c5a059]" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-white/40 font-normal">({prod.reviewsCount})</span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#c5a059] transition-colors mb-2">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-white/70 font-light line-clamp-2 mb-3">
                    {prod.description[language]}
                  </p>

                  {/* Ingredients preview */}
                  <div className="flex flex-wrap gap-1">
                    {prod.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Price</div>
                  <div className="font-cinzel font-bold text-lg text-[#c5a059]">${prod.price}</div>
                </div>

                <button
                  id={`add-to-cart-${prod.id}`}
                  onClick={() => onAddToCart(prod)}
                  className="px-4 py-2 rounded-xl bg-[#151518] hover:bg-[#c5a059] text-white/90 hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-[#c5a059] flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{d.addToCart}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Brand Promise Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#111113] border border-white/10 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#c5a059] mb-2" />
            <h4 className="font-cinzel text-sm font-bold text-white mb-1">
              {language === 'ky' ? "100% Органикалык Формула" : "100% Botanical Purity"}
            </h4>
            <p className="text-xs text-white/50 font-light">
              {language === 'ky' ? "Парабенсиз жана химиялык кошулмаларсыз жасалган." : "Sulfate-free, paraben-free organic artisan formulations."}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Package className="w-6 h-6 text-[#c5a059] mb-2" />
            <h4 className="font-cinzel text-sm font-bold text-white mb-1">
              {language === 'ky' ? "Ательеде Тез Алуу (Curbside)" : "Gaithersburg Atelier Pickup"}
            </h4>
            <p className="text-xs text-white/50 font-light">
              {language === 'ky' ? "Сапарыңызда даяр белек кутусу менен кошо берилет." : "Complimentary bespoke luxury gift boxing on all orders."}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#c5a059] mb-2" />
            <h4 className="font-cinzel text-sm font-bold text-white mb-1">
              {language === 'ky' ? "Колго Жасалган Дамаск Болаты" : "Hand-Forged Damascus VG-10"}
            </h4>
            <p className="text-xs text-white/50 font-light">
              {language === 'ky' ? "Өмүр бою курчтугун сактоочу япондук болот." : "Lifetime razor sharpening guarantee with custom monogramming."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
