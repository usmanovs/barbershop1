import React from 'react';
import { MapPin, Clock, Phone, Mail, Car, Shield, Compass, Navigation } from 'lucide-react';
import { Language } from '../types';
import { LOCATION_DETAILS, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onBookNow: () => void;
}

export const LocationHoursSection: React.FC<Props> = ({ language, onBookNow }) => {
  const d = DICTIONARY[language];

  return (
    <section id="location" className="py-24 bg-[#0e0e11] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Локация & График" : language === 'ru' ? "Адрес и Время" : "Atelier & Hours"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.locationHeading}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {LOCATION_DETAILS.address}, {LOCATION_DETAILS.city}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hours Card */}
            <div className="p-7 rounded-2xl bg-[#111113] border border-white/10 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Clock className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">
                  {language === 'ky' ? "Иштөө Сааттары (Hours of Craft)" : "Hours of Operation"}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                {LOCATION_DETAILS.hours.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-white/70 font-medium">{h.days[language]}</span>
                    <span className="font-mono text-[#c5a059] font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Valet Parking & Arrival */}
            <div className="p-7 rounded-2xl bg-[#111113] border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                    {language === 'ky' ? "Акысыз Valet Parking & Жеке Унаа Токтотуу" : "Complimentary Valet Parking & Private Access"}
                  </h4>
                  <p className="text-xs text-white/50 mt-0.5 font-light">
                    {LOCATION_DETAILS.valetParking}
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/70 font-light pt-2">
                {language === 'ky' 
                  ? "Rio Lakefront жана Downtown Crown аймагына келгениңизде унааңызды түз эле биздин VIP Portico кызматына тапшырсаңыз болот." 
                  : "Pull directly up to the Rio Lakefront Boardwalk North portico; our valet attendants will attend to your vehicle while you relax in our private lounge."}
              </p>
            </div>

            {/* Direct Contact & Concierge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${LOCATION_DETAILS.phone}`}
                className="p-5 rounded-xl bg-[#111113] border border-white/10 hover:border-[#c5a059]/50 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#151518] flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Direct Line</div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#c5a059] transition-colors">{LOCATION_DETAILS.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${LOCATION_DETAILS.conciergeEmail}`}
                className="p-5 rounded-xl bg-[#111113] border border-white/10 hover:border-[#c5a059]/50 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#151518] flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Private Concierge</div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#c5a059] transition-colors truncate max-w-[170px]">{LOCATION_DETAILS.conciergeEmail}</div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Interactive Google Map Card (5 Cols) */}
          <div id="google-maps-card" className="lg:col-span-5 rounded-2xl bg-[#111113] border border-[#c5a059]/30 p-6 flex flex-col justify-between overflow-hidden relative shadow-2xl">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#c5a059]" />
                  <span className="font-cinzel text-sm font-bold text-white tracking-widest">
                    RIO LAKEFRONT ATELIER
                  </span>
                </div>
                <span className="text-[10px] text-[#c5a059] px-2 py-0.5 rounded bg-[#c5a059]/20 font-mono">
                  MD 20878
                </span>
              </div>

              {/* Embedded Google Map Iframe */}
              <div id="google-map-iframe-container" className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-white/15 bg-[#0a0a0b] shadow-inner mb-4 group">
                <iframe
                  id="sovereign-google-map"
                  title="Sovereign & Co. Barbershop Google Map Location"
                  src="https://maps.google.com/maps?q=101+Boardwalk+Place,+Gaithersburg,+MD+20878&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale-[25%] contrast-[105%] hover:grayscale-0 transition-all duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <div className="px-2.5 py-1 rounded-md bg-black/85 text-[10px] font-bold text-[#e6c987] border border-[#c5a059]/40 backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    <span>Sovereign & Co.</span>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 pointer-events-none z-10 text-[9px] text-white/70 font-mono bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  Rio Lakefront • Gaithersburg
                </div>
              </div>

              {/* Directions description */}
              <div className="text-xs text-white/70 font-light space-y-1.5 mb-4">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                  {language === 'ky' ? "Кантип келүүгө болот:" : "Navigation & Directions:"}
                </p>
                <p className="text-white/50 text-[11px]">
                  • From I-270 N: Exit 9B onto Sam Eig Hwy, take Washingtonian Blvd toward Rio Lakefront.
                </p>
                <p className="text-white/50 text-[11px]">
                  • From Downtown Crown: 3 minutes west on Crown Park Ave to Boardwalk Place.
                </p>
              </div>
            </div>

            {/* Map Links & Book CTA */}
            <div className="space-y-2 pt-2">
              <a
                id="open-google-maps-btn"
                href="https://maps.google.com/?q=101+Boardwalk+Place+Gaithersburg+MD+20878"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#151518] hover:bg-[#1f1f25] border border-white/10 hover:border-[#c5a059]/50 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors group cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-0.5 transition-transform" />
                <span>{language === 'ky' ? "Google Картадан толук ачуу" : language === 'ru' ? "Открыть в Google Maps" : "Open in Google Maps / Turn-by-Turn"}</span>
              </a>

              <button
                id="book-appointment-location-btn"
                onClick={onBookNow}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7a32] hover:from-[#dfba6f] hover:to-[#c5a059] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                {d.bookNow}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
