import React, { useState } from 'react';
import { Camera, ZoomIn, Scissors } from 'lucide-react';
import { Language } from '../types';
import { LOOKBOOK_GALLERY, DICTIONARY } from '../data/barbershopData';

interface Props {
  language: Language;
  onBookStyle: (styleName: string) => void;
}

export const LookbookGallery: React.FC<Props> = ({ language, onBookStyle }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'classic' | 'fades' | 'beard' | 'rituals'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const d = DICTIONARY[language];

  const filteredItems = activeFilter === 'all'
    ? LOOKBOOK_GALLERY
    : LOOKBOOK_GALLERY.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', label: d.allCategories },
    { id: 'classic', label: language === 'ky' ? "Классика & Taper" : "Classic & Tapers" },
    { id: 'fades', label: language === 'ky' ? "Заманбап Фейд" : "Modern Skin Fades" },
    { id: 'beard', label: language === 'ky' ? "Сакал Геометриясы" : "Beard Architecture" },
    { id: 'rituals', label: language === 'ky' ? "Дамаск Ритуалдары" : "Damascus Rituals" },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#0e0e11] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'ky' ? "Ателье Лукбук" : language === 'ru' ? "Лукбук Образов" : "Lookbook & Archive"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            {d.gallery}
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            {language === 'ky' 
              ? "Биздин чеберлердин жасаган чыныгы эмгектери. Ар бир образ – кардардын мүнөзүнүн жана стилинин чагылышы."
              : language === 'ru'
              ? "Галерея реальных работ наших барберов. Точность линий, плавность переходов и чистота формы."
              : "A curated curation of bespoke silhouettes crafted at our Gaithersburg atelier."}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                activeFilter === f.id
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'bg-[#151518] text-white/50 border border-white/5 hover:border-[#c5a059]/30 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="group relative rounded-2xl overflow-hidden bg-[#111113] border border-white/10 hover:border-[#c5a059]/70 cursor-pointer transition-all duration-500 h-96 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title[language]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Top Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-semibold">
                  {item.barberName}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">
                  {item.title[language]}
                </h4>
                <p className="text-xs text-white/70 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {item.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#c5a059]/50 shadow-2xl">
            <img
              src={selectedImage}
              alt="Enlarged Grooming Style"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white border border-white/20 hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
