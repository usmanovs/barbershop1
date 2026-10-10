import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Language, CartItem } from '../types';
import { DICTIONARY } from '../data/barbershopData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isOrdered, setIsOrdered] = React.useState(false);
  const d = DICTIONARY[language];

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111113] border-l border-[#c5a059]/40 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-[#151518] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wider">
                {d.cartTitle}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            {isOrdered ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white">
                  {language === 'ky' ? "Буйрутмаңыз Кабыл Алынды!" : "Apothecary Order Received"}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto">
                  {language === 'ky' 
                    ? "Буйрутмаңыз Gaithersburg Atelier студиясында белек кутусуна салынып даярдалды."
                    : "Your artisan grooming package has been prepared for concierge pickup at our Rio Lakefront suite."}
                </p>
                <button
                  onClick={() => {
                    setIsOrdered(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#dfba6f] text-black font-cinzel font-bold text-xs uppercase"
                >
                  {language === 'ky' ? "Жабуу" : "Close"}
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center text-white/40 space-y-3">
                <ShoppingBag className="w-12 h-12 text-white/20 mx-auto stroke-1" />
                <p className="text-sm font-medium">{d.emptyCart}</p>
                <p className="text-xs text-white/40">
                  {language === 'ky' ? "Биздин сакал майларын жана матовая помадаларды көрүңүз." : "Explore our bespoke clay pomades and Damascus razors."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-xl bg-[#151518] border border-white/5 flex items-center gap-3.5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-xs text-white truncate">
                        {item.product.name}
                      </h5>
                      <div className="font-cinzel font-bold text-xs text-[#c5a059] my-1">
                        ${item.product.price}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!isOrdered && cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#151518] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">{language === 'ky' ? "Жалпы суммасы:" : "Subtotal:"}</span>
                <span className="font-cinzel font-bold text-xl text-[#c5a059]">${subtotal}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Complimentary gift packaging & Gaithersburg pickup included.</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7a32] hover:from-[#dfba6f] hover:to-[#c5a059] text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{d.checkout} • ${subtotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
