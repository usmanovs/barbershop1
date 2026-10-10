import React, { useState, useEffect } from 'react';
import { Language, CartItem, ApothecaryProduct } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceMenu } from './components/ServiceMenu';
import { BarbersSection } from './components/BarbersSection';
import { LookbookGallery } from './components/LookbookGallery';
import { ApothecaryStore } from './components/ApothecaryStore';
import { VipClubSection } from './components/VipClubSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AiConsultantModal } from './components/AiConsultantModal';
import { CartDrawer } from './components/CartDrawer';
import { AmbientAudio } from './components/AmbientAudio';
import { ChatbotWidget } from './components/ChatbotWidget';

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sovereign_lang_v2');
      if (saved === 'en' || saved === 'ky' || saved === 'ru') {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingServiceId, setSelectedBookingServiceId] = useState<string | undefined>();
  const [selectedBookingBarberId, setSelectedBookingBarberId] = useState<string | undefined>();

  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sovereign_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('sovereign_lang_v2', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('sovereign_lang_v2', language);
    } catch {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sovereign_cart', JSON.stringify(cart));
  }, [cart]);

  // Handlers
  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setSelectedBookingServiceId(serviceId);
    setSelectedBookingBarberId(barberId);
    setIsBookingOpen(true);
  };

  const handleSelectServiceFromMenu = (serviceId: string) => {
    handleOpenBooking(serviceId, undefined);
  };

  const handleSelectBarber = (barberId: string) => {
    handleOpenBooking(undefined, barberId);
  };

  const handleAddToCart = (product: ApothecaryProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f0f0f0] selection:bg-[#c5a059] selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* Top Fixed Navigation */}
      <Navbar
        language={language}
        setLanguage={handleSetLanguage}
        onLanguageChange={handleSetLanguage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Luxury Experience */}
      <main>
        <HeroSection
          language={language}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
        />

        <ServiceMenu
          language={language}
          onSelectService={handleSelectServiceFromMenu}
        />

        <BarbersSection
          language={language}
          onBookBarber={handleSelectBarber}
        />

        <LookbookGallery
          language={language}
          onBookStyle={(style) => handleOpenBooking()}
        />

        <ApothecaryStore
          language={language}
          onAddToCart={handleAddToCart}
        />

        <VipClubSection
          language={language}
          onSelectTier={(tier) => handleOpenBooking()}
        />

        <ReviewsSection
          language={language}
        />

        <LocationHoursSection
          language={language}
          onBookNow={() => handleOpenBooking()}
        />
      </main>

      {/* Luxury Footer */}
      <Footer
        language={language}
        onLanguageChange={handleSetLanguage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
      />

      {/* Ambient Audio Player (Lounge soundscapes) */}
      <AmbientAudio />

      {/* Sovereign AI Concierge & Chatbot */}
      <ChatbotWidget
        language={language}
        onOpenBooking={handleOpenBooking}
        onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Modals & Drawers */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
        initialServiceId={selectedBookingServiceId}
        initialBarberId={selectedBookingBarberId}
      />

      <AiConsultantModal
        isOpen={isAiConsultantOpen}
        onClose={() => setIsAiConsultantOpen(false)}
        language={language}
        onBookRecommendedStyle={(serviceId) => {
          handleOpenBooking(serviceId);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

export default App;
