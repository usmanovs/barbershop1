import React from 'react';
import { Star, Award, Scissors, Calendar, Instagram, CheckCircle2 } from 'lucide-react';
import { Language, BarberArtisan } from '../types';
import { BARBERS_DATA, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onBookBarber: (barberId: string) => void;
}

export const BarbersSection: React.FC<Props> = ({ language, onBookBarber }) => {
  const d = DICTIONARY[language];

  return (
    <section id="barbers" className="py-24 bg-[#0a0a0b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Атактуу Устаттар" : language === 'ru' ? "Шеф-Барберы" : "Master Guild"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.barbers}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {language === 'ky' 
              ? "Лондон, Нью-Йорк жана Вашингтондун алдыңкы академияларында такталган чеберчилик. Сиздин силуэтиңиз – биздин сыймыгыбыз."
              : language === 'ru'
              ? "Мастера с международными дипломами и безупречной репутацией. Индивидуальный почерк и ювелирная точность каждого среза."
              : "Each artisan is a seasoned master of cranial anatomy, classical scissor craftsmanship, and surgical straight-razor precision."}
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BARBERS_DATA.map((barber) => (
            <div
              key={barber.id}
              id={`barber-card-${barber.id}`}
              className="group rounded-2xl bg-[#111113] border border-white/10 hover:border-[#c5a059]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative h-72 overflow-hidden bg-[#0a0a0b]">
                  <img
                    src={barber.photo}
                    alt={barber.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] text-xs font-bold font-cinzel">
                    <Star className="w-3.5 h-3.5 fill-[#c5a059]" />
                    <span>{barber.rating}</span>
                    <span className="text-[10px] text-white/50 font-normal">({barber.reviewsCount})</span>
                  </div>

                  {/* Years badge */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#151518]/90 backdrop-blur-md border border-white/10 text-[11px] text-[#dfba6f] font-medium">
                    {barber.experienceYears}+ yrs
                  </div>

                  {/* Bottom title in photo */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      {barber.name}
                    </h3>
                    <p className="text-xs text-[#c5a059] font-medium">
                      {barber.title[language]}
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {barber.bio[language]}
                  </p>

                  {/* Specialties chips */}
                  <div>
                    <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {language === 'ky' ? "Адистешүүсү:" : "Signature Craft:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {barber.specialties[language].map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#151518] text-white/80 text-[11px] border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  {barber.awards.length > 0 && (
                    <div className="pt-2 border-t border-white/5 space-y-1">
                      {barber.awards.slice(0, 2).map((aw, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-white/60">
                          <CheckCircle2 className="w-3 h-3 text-[#c5a059] shrink-0" />
                          <span className="truncate">{aw}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Book with this Barber CTA */}
              <div className="p-5 pt-0">
                <button
                  id={`book-with-barber-${barber.id}`}
                  onClick={() => onBookBarber(barber.id)}
                  className="w-full py-2.5 rounded-xl bg-[#151518] hover:bg-[#c5a059] text-white/90 hover:text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-[#c5a059] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{language === 'ky' ? `${barber.name.split(' ')[0]} менен жазылуу` : `Book with ${barber.name.split(' ')[0]}`}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
