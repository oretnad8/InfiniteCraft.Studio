'use client';

import React, { useState } from 'react';

import { CartItem } from '@/types';

// Ensure process is typed if still missing
declare const process: { env: { [key: string]: string | undefined } };

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

export default function Checkout({ isOpen, onClose, items, total, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    // paymentMethod removed as we only use MercadoPago
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return formData.email && formData.name && formData.phone;
  };

  const validateStep2 = () => {
    return formData.address && formData.city;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('customer', JSON.stringify(formData));

      const itemsForPayload = items.map(item => {
        const { images, ...rest } = item;
        return rest;
      });

      formDataToSend.append('items', JSON.stringify(itemsForPayload));
      formDataToSend.append('totalAmount', total.toString());

      // Append files
      for (const item of items) {
        if (item.type === 'custom' && item.images && item.images.length > 0) {
          for (const imgDataUrl of item.images) {
            if (imgDataUrl.startsWith('data:')) {
              const res = await fetch(imgDataUrl);
              const blob = await res.blob();
              formDataToSend.append('images', blob, `custom-item-${item.id}.jpg`);
            }
          }
        }
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_ORDERS || 'http://localhost:4000';

      // 1. Create Order in our DB first
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error al crear el pedido');
      }

      const orderData = await response.json();

      // 2. Create MercadoPago Preference
      const mpResponse = await fetch(`${apiUrl}/api/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          external_reference: orderData._id // Link payment to order
        }),
      });

      if (!mpResponse.ok) {
        throw new Error('Error al iniciar el pago');
      }

      const mpData = await mpResponse.json();

      // 3. Redirect to MercadoPago
      if (mpData.init_point) {
        window.location.href = mpData.init_point;
      } else {
        throw new Error('No se recibió enlace de pago');
      }

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 text-center animate-fade-in relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Pedido Recibido!</h2>
          <p className="text-gray-600 mb-8">
            Hemos registrado tu pedido correctamente. Pronto nos pondremos en contacto contigo para coordinar el pago y la entrega.
          </p>

          <button
            onClick={() => {
              onOrderComplete();
              onClose();
              setStep(1);
              setOrderComplete(false);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 animate-fade-in-up">
        {isProcessing ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900">Procesando tu pedido...</h3>
            <p className="text-gray-500 mt-2">Por favor no cierres esta ventana</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Finalizar Compra</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Progress indicator */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${step >= stepNum ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                      {stepNum}
                    </div>
                    <span className={`ml-2 text-sm transition-colors duration-300 ${step >= stepNum ? 'text-red-600 font-medium' : 'text-gray-500'
                      }`}>
                      {stepNum === 1 ? 'Datos' : stepNum === 2 ? 'Entrega' : 'Pago'}
                    </span>
                    {stepNum < 3 && <div className="hidden sm:block w-8 h-px bg-gray-300 mx-4"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Paso 1: Datos personales */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-900">Datos de contacto</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Datos de entrega */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-900">Dirección de entrega</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección completa *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                        placeholder="Av. Providencia 1234, Depto 56"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad/Comuna *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                        placeholder="Santiago, Providencia"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Método de pago */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-900">Método de pago</h3>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                      <i className="ri-wallet-3-line text-3xl"></i>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Pago Seguro con MercadoPago</h4>
                    <p className="text-gray-600 mb-4 max-w-sm">
                      Serás redirigido a MercadoPago para completar tu compra de forma segura. Aceptamos tarjetas de crédito, débito y transferencias.
                    </p>
                    <div className="flex gap-2 text-gray-400">
                      <i className="ri-visa-line text-2xl"></i>
                      <i className="ri-mastercard-line text-2xl"></i>
                      <i className="ri-bank-card-line text-2xl"></i>
                    </div>
                  </div>

                  {/* Resumen del pedido */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Resumen del pedido</h4>
                    <div className="space-y-2 text-sm">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-gray-700">
                          <span>{item.name} ({item.size}) x{item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      {items.length >= 3 && (
                        <div className="flex justify-between text-green-600 font-semibold pt-2 border-t border-gray-200 mt-2">
                          <span>Descuento ecológico (15%)</span>
                          <span>-${Math.round(total * 0.15 / 0.85).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 mt-2 text-gray-900">
                        <span>Total a Pagar</span>
                        <span>${total.toLocaleString()} CLP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={step === 1 ? onClose : handlePrevStep}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {step === 1 ? 'Cancelar' : 'Anterior'}
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={step === 1 ? !validateStep1() : !validateStep2()}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap outline-none focus:ring-2 focus:ring-red-500 shadow-md hover:shadow-lg"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {isProcessing ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Pagar con MercadoPago</span>
                        <i className="ri-secure-payment-line"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}