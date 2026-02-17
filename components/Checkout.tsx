'use client';

import { useState } from 'react';

import { CartItem } from '@/types';

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
    paymentMethod: 'transferencia'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      // Prepare items, stripping out large base64 images from JSON to keep payload clean
      // The images will be sent as files and referenced in the backend logic if needed
      // Logic: Extract base64 images from custom items and append as files.
      // Note: Since we are storing base64 in the cart for preview (implied from previous steps/context),
      // we need to convert them back to blobs to upload as files.

      const itemsForPayload = items.map(item => {
        const { images, ...rest } = item;
        // logic to strip images from the JSON payload if they are large base64 strings
        // Return item without the heavy image data, backend will map uploaded files
        return rest;
      });

      formDataToSend.append('items', JSON.stringify(itemsForPayload));
      formDataToSend.append('totalAmount', total.toString());

      // Append files
      // We need to iterate over items and find images to upload
      // For this MVP, we will iterate over all items and if they have 'images' (base64/dataurl), append them.

      for (const item of items) {
        if (item.type === 'custom' && item.images && item.images.length > 0) {
          for (const imgDataUrl of item.images) {
            if (imgDataUrl.startsWith('data:')) {
              // Convert Base64 to Blob
              const res = await fetch(imgDataUrl);
              const blob = await res.blob();
              // Append with a generic name, backend handles uniqueness
              formDataToSend.append('images', blob, `custom-item-${item.id}.jpg`);
            }
          }
        }
      }

      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        body: formDataToSend, // Do not set Content-Type header, let browser set it with boundary
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pedido');
      }

      setOrderComplete(true);

      setTimeout(() => {
        onOrderComplete(); // Clears cart
        onClose();
        setStep(1);
        setOrderComplete(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {orderComplete ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Pedido Confirmado!</h2>
            <p className="text-gray-600 mb-6">
              Recibirás un email con los detalles de tu pedido y las instrucciones de pago.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-semibold">Tiempo estimado de entrega:</p>
              <p className="text-blue-700">
                {items.some(item => item.type === 'custom') ? '10-21 días hábiles' : '3-7 días hábiles'}
              </p>
            </div>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold $${step >= stepNum ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                      {stepNum}
                    </div>
                    <span className={`ml-2 text-sm $${step >= stepNum ? 'text-red-600' : 'text-gray-500'}`}>
                      {stepNum === 1 ? 'Datos' : stepNum === 2 ? 'Entrega' : 'Pago'}
                    </span>
                    {stepNum < 3 && <div className="w-8 h-px bg-gray-300 mx-4"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Paso 1: Datos personales */}
              {step === 1 && (
                <div className="space-y-6">
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Datos de entrega */}
              {step === 2 && (
                <div className="space-y-6">
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Santiago, Providencia"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Método de pago */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Método de pago</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'transferencia', name: 'Transferencia Bancaria', icon: 'ri-bank-line', desc: 'Pago directo a cuenta bancaria' },
                      { id: 'webpay', name: 'WebPay (Tarjetas)', icon: 'ri-bank-card-line', desc: 'Débito o crédito' },
                      { id: 'mercadopago', name: 'MercadoPago', icon: 'ri-wallet-line', desc: 'Múltiples opciones de pago' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="w-4 h-4 text-red-600 mr-4"
                        />
                        <i className={`${method.icon} text-2xl text-gray-600 mr-4`}></i>
                        <div>
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Resumen del pedido */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Resumen del pedido</h4>
                    <div className="space-y-2 text-sm">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} ({item.size}) x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      {items.length >= 3 && (
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span>Descuento ecológico (15%)</span>
                          <span>-${Math.round(total * 0.15 / 0.85).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>${total.toLocaleString()} CLP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={step === 1 ? onClose : handlePrevStep}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  {step === 1 ? 'Cancelar' : 'Anterior'}
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={step === 1 ? !validateStep1() : !validateStep2()}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Procesando...
                      </>
                    ) : (
                      'Confirmar Pedido'
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