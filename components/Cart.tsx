
'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  size: string;
  finish: string;
  price: number;
  quantity: number;
  type: 'stock' | 'custom';
  image?: string;
  category?: string;
  comments?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onCheckout 
}: CartProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const hasDiscount = items.length >= 3;
  const discount = hasDiscount ? subtotal * 0.15 : 0;
  const total = subtotal - discount;

  const handleClearCart = () => {
    onClearCart();
    setShowClearConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <i className="ri-shopping-cart-line text-6xl mb-4"></i>
              <p className="text-lg">Tu carrito está vacío</p>
              <p className="text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="ri-user-line text-purple-600 text-2xl"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Tamaño: {item.size}</p>
                        <p>Acabado: {item.finish}</p>
                        {item.comments && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            Comentarios: {item.comments}
                          </p>
                        )}
                        <p className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.type === 'custom' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.type === 'custom' ? 'Personalizada' : 'Catálogo'}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()} CLP</p>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Descuento por cantidad */}
              {hasDiscount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="ri-leaf-line text-green-600 text-xl mr-3"></i>
                    <div>
                      <p className="font-semibold text-green-800">¡Descuento Ecológico Aplicado!</p>
                      <p className="text-green-700 text-sm">15% de descuento por ahorro energético y de material</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer con totales y acciones */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Resumen de precios */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()} CLP</span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento ecológico (15%):</span>
                  <span>-${discount.toLocaleString()} CLP</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span>${total.toLocaleString()} CLP</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={onCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-secure-payment-line mr-2"></i>
                Continuar Compra
              </button>
              
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación para vaciar carrito */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <div className="text-center">
              <i className="ri-question-line text-red-500 text-4xl mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-2">¿Vaciar carrito?</h3>
              <p className="text-gray-600 mb-6">Esta acción eliminará todos los productos de tu carrito.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Vaciar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
