import React, { useState, useEffect } from 'react';
import { CarContext } from './CarContext';
import { CARS_DATA } from '../data/cars';
import confetti from 'canvas-confetti';

export const CarProvider = ({ children }) => {
  const [cars] = useState(CARS_DATA);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currency, setCurrency] = useState('USD');
  
  // Persisted wishlist in localStorage
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : ['bugatti-tourbillon', 'porsche-911-gt3-rs'];
    } catch {
      return ['bugatti-tourbillon', 'porsche-911-gt3-rs'];
    }
  });

  // Comparison IDs (max 4)
  const [compareIds, setCompareIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingCar, setBookingCar] = useState(null);
  
  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.removeItem('aura_theme');
      document.documentElement.removeAttribute('data-theme');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const addToast = (type, title, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (carId) => {
    const car = cars.find((c) => c.id === carId);
    setWishlistIds((prev) => {
      if (prev.includes(carId)) {
        addToast('info', 'Removed from Vault', `${car?.name || 'Vehicle'} was removed from your wishlist.`);
        return prev.filter((id) => id !== carId);
      } else {
        addToast('success', 'Added to Vault', `${car?.name || 'Vehicle'} saved to your private collection.`);
        return [...prev, carId];
      }
    });
  };

  const isInWishlist = (carId) => wishlistIds.includes(carId);

  const clearWishlist = () => {
    setWishlistIds([]);
    addToast('info', 'Wishlist Cleared', 'All saved vehicles have been cleared.');
  };

  const addToCompare = (carId) => {
    if (compareIds.includes(carId)) return;
    if (compareIds.length >= 4) {
      addToast('warning', 'Comparison Limit Reached', 'You can compare up to 4 vehicles simultaneously.');
      return;
    }
    const car = cars.find((c) => c.id === carId);
    setCompareIds((prev) => [...prev, carId]);
    addToast('success', 'Added to Comparison', `${car?.name || 'Vehicle'} added to side-by-side comparison.`);
  };

  const removeFromCompare = (carId) => {
    setCompareIds((prev) => prev.filter((id) => id !== carId));
  };

  const toggleCompare = (carId) => {
    if (compareIds.includes(carId)) {
      removeFromCompare(carId);
    } else {
      addToCompare(carId);
    }
  };

  const isInCompare = (carId) => compareIds.includes(carId);

  const clearCompare = () => {
    setCompareIds([]);
    addToast('info', 'Comparison Cleared', 'Comparison dock is now empty.');
  };

  const openBookingForCar = (car = null) => {
    setBookingCar(car || cars[0]);
    setIsBookingModalOpen(true);
  };

  const submitBooking = async (form) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#fbbf24', '#ffffff', '#e11d48']
          });
        } catch {
          // ignore
        }
        addToast(
          'success',
          'VIP Reservation Confirmed',
          `Thank you ${form.clientName}. Your test drive for the ${form.carName} has been booked. Ref: AUR-${Math.floor(100000 + Math.random() * 900000)}.`
        );
        resolve(true);
      }, 800);
    });
  };

  const jumpToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        selectedCar,
        setSelectedCar,
        currency,
        setCurrency,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        compareIds,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingCar,
        openBookingForCar,
        submitBooking,
        isWishlistOpen,
        setIsWishlistOpen,
        jumpToSection,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

