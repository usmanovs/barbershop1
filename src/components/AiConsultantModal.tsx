import React, { useState } from 'react';
import { X, Sparkles, Scissors, Check, RefreshCw, ArrowRight, BookOpen, ShieldCheck, Flame } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/barbershopData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onBookRecommendedStyle: (serviceId: string) => void;
}

export const AiConsultantModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onBookRecommendedStyle
}) => {
  const [faceShape, setFaceShape] = useState<string>('Oval');
  const [hairType, setHairType] = useState<string>('Straight & Thick');
  const [beardStyle, setBeardStyle] = useState<string>('Sculpted Short Beard');
  const [occasion, setOccasion] = useState<string>('Executive Daily & Business');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [consultationResult, setConsultationResult] = useState<string | null>(null);

  const d = DICTIONARY[language];

  if (!isOpen) return null;

  const faceShapes = [
    { id: 'Oval', label: { ky: 'Сопак (Oval)', en: 'Oval Shape', ru: 'Овальное' }, desc: 'Balanced proportions, versatile' },
    { id: 'Square', label: { ky: 'Чарчы (Square)', en: 'Square Jaw', ru: 'Квадратное' }, desc: 'Sharp angles, prominent jawline' },
    { id: 'Round', label: { ky: 'Тегерек (Round)', en: 'Round Face', ru: 'Круглое' }, desc: 'Soft curves, equal width & length' },
    { id: 'Diamond', label: { ky: 'Алмаз (Diamond)', en: 'Diamond Profile', ru: 'Ромбовидное' }, desc: 'High cheekbones, tapered chin' },
    { id: 'Oblong', label: { ky: 'Узун (Oblong)', en: 'Oblong / Rectangular', ru: 'Удлиненное' }, desc: 'Longer cranial structure' },
  ];

  const hairTypes = [
    { id: 'Straight & Thick', label: { ky: 'Түз & Калың', en: 'Straight & Thick', ru: 'Прямые и густые' } },
    { id: 'Wavy & Textured', label: { ky: 'Толкундуу & Текстуралуу', en: 'Wavy & Textured', ru: 'Волнистые' } },
    { id: 'Curly / Coiled', label: { ky: 'Байталдуу / Тармал', en: 'Curly / Coarse', ru: 'Кудрявые' } },
    { id: 'Fine / Receding', label: { ky: 'Жука / Маңдайы ачылган', en: 'Fine / Receding Taper', ru: 'Тонкие / С залысинами' } },
  ];

  const beardOptions = [
    { id: 'Sculpted Short Beard', label: { ky: 'Кыска формалуу сакал', en: 'Sculpted Short Beard', ru: 'Короткая оформленная борода' } },
    { id: 'Full Imperial Beard', label: { ky: 'Толук калың сакал', en: 'Full Imperial Beard', ru: 'Густая объемная борода' } },
    { id: 'Clean Shaven Straight Razor', label: { ky: 'Жылмакай кырылган (Clean Shave)', en: 'Clean Shaven Straight Razor', ru: 'Гладкое бритье' } },
    { id: 'Heavy Stubble Fade', label: { ky: '3 күндүк кырынбаган стиль', en: 'Heavy Stubble Fade', ru: '3-дневная щетина с фейдом' } },
  ];

  const occasionOptions = [
    { id: 'Executive Daily & Business', label: { ky: 'Бизнес & Лидерлик образ', en: 'C-Suite Executive / Business', ru: 'Деловой стиль / Руководитель' } },
    { id: 'Black Tie Gala / Wedding', label: { ky: 'Той / Элиталык Gala кечеси', en: 'Black Tie Gala / Wedding', ru: 'Торжество / Свадьба' } },
    { id: 'Modern Streetwear & Trend', label: { ky: 'Заманбап тренд & Кроп', en: 'Modern Textured & Edgy', ru: 'Современный трендовый стиль' } },
    { id: 'Low Maintenance Classic', label: { ky: 'Убакытты үнөмдөөчү классика', en: 'Low Maintenance Minimalist', ru: 'Классика без сложной укладки' } },
  ];

  const handleGenerateConsultation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faceShape,
          hairType,
          beardStyle,
          occasion,
          notes,
          language
        })
      });

      const data = await response.json();
      if (data.consultation) {
        setConsultationResult(data.consultation);
      } else {
        setConsultationResult("Consultation generation completed.");
      }
    } catch (e) {
      console.error("Consultation fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      <div 
        id="ai-consultant-modal-card"
        className="relative w-full max-w-3xl bg-[#111113] border border-[#c5a059]/50 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden my-8"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#151518]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#f0f0f0] flex items-center gap-2">
                <span>{d.aiTitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-mono">
                  Gemini 3.7
                </span>
              </h3>
              <p className="text-xs text-white/50">
                Sovereign Atelier Virtual Master Stylist • Gaithersburg, MD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          
          {!consultationResult ? (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-[#151518] border border-[#c5a059]/20 text-xs text-white/70 flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-0.5">{language === 'ky' ? "Жеке Архитектуралык Диагностика" : "Bespoke Anatomical Styling"}</div>
                  <div className="text-white/50">{d.aiSubtitle}</div>
                </div>
              </div>

              {/* 1. Face Shape */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-[#f0f0f0] uppercase tracking-wider mb-2">
                  1. {d.faceShape}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {faceShapes.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFaceShape(f.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        faceShape === f.id
                          ? 'bg-[#18181d] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                          : 'bg-[#151518] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{f.label[language]}</div>
                      <div className="text-[10px] text-white/40 mt-0.5 font-light">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Hair Texture */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-[#f0f0f0] uppercase tracking-wider mb-2">
                  2. {d.hairType}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {hairTypes.map(h => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHairType(h.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        hairType === h.id
                          ? 'bg-[#18181d] border-[#c5a059] text-[#c5a059]'
                          : 'bg-[#151518] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      {h.label[language]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Beard Goal */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-[#f0f0f0] uppercase tracking-wider mb-2">
                  3. {d.beardGoal}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {beardOptions.map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBeardStyle(b.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        beardStyle === b.id
                          ? 'bg-[#18181d] border-[#c5a059] text-[#c5a059]'
                          : 'bg-[#151518] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      {b.label[language]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Lifestyle & Occasion */}
              <div>
                <label className="block text-xs font-cinzel font-bold text-[#f0f0f0] uppercase tracking-wider mb-2">
                  4. {d.lifestyle}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {occasionOptions.map(o => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOccasion(o.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        occasion === o.id
                          ? 'bg-[#18181d] border-[#c5a059] text-[#c5a059]'
                          : 'bg-[#151518] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      {o.label[language]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Client Note */}
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">
                  {language === 'ky' ? "Кошумча суроо же каалооңуз (мисалы: баш кийим кием, тез өсөт ж.б.)" : "Specific Preferences / Problem Areas (Optional)"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need sharp temple taper, natural hairline finish..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#151518] border border-white/10 focus:border-[#c5a059] text-xs text-white outline-none"
                />
              </div>

              <button
                id="generate-consultation-btn"
                type="button"
                disabled={loading}
                onClick={handleGenerateConsultation}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#dfba6f] to-[#9e7a32] hover:from-[#dfba6f] hover:to-[#c5a059] text-black font-cinzel font-bold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(197,160,89,0.35)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{d.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{d.generateAdvice}</span>
                  </>
                )}
              </button>

            </div>
          ) : (
            /* Result View */
            <div className="space-y-6 animate-in fade-in duration-500">
              
              <div className="p-4 rounded-xl bg-[#151518] border border-[#c5a059]/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-[#c5a059] uppercase">
                    {language === 'ky' ? "Жекече Консультация Даяр" : "Bespoke Grooming Blueprint"}
                  </span>
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    Master Stylist Diagnostic Result
                  </h4>
                </div>
                <button
                  onClick={() => setConsultationResult(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/70 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'ky' ? "Кайра тапшыруу" : "Recalculate"}</span>
                </button>
              </div>

              {/* Consultation Markdown Content */}
              <div className="p-6 rounded-2xl bg-[#151518] border border-white/10 text-white/80 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line font-light">
                {consultationResult}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookRecommendedStyle('sovereign_cut');
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#dfba6f] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>{language === 'ky' ? "Бул стилди чеберге брондоо" : "Book This Blueprint with Master Barber"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors"
                >
                  {language === 'ky' ? "Жабуу" : "Close"}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
