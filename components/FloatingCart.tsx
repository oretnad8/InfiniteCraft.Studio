
'use client';

import { useState } from 'react';

interface FloatingCartProps {
  itemCount: number;
  onClick: () => void;
}

export default function FloatingCart({ itemCount, onClick }: FloatingCartProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 cursor-pointer"
    >
      <i className="ri-shopping-cart-line text-xl sm:text-2xl"></i>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-500 text-black text-xs sm:text-sm font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center min-w-[20px] sm:min-w-[24px]">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}