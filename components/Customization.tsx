
'use client';

import { useState } from 'react';
import { useCart } from '../hooks/useCart';

export default function Customization() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('10cm');
  const [selectedFinish, setSelectedFinish] = useState('Blanco');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const sizes = [
    { size: '5cm', price: 30000 },
    { size: '10cm', price: 35000 },
    { size: '15cm', price: 40000 },
    { size: '20cm', price: 45000 },
    { size: '25cm', price: 50000 }
  ];

  const finishes = ['Blanco', 'Gris', 'Negro', 'Pintado a mano'];

  const calculatePrice = () => {
    const basePrice = sizes.find(s => s.size === selectedSize)?.price || 35000;
    const multiplier = selectedFinish === 'Pintado a mano' ? 1.5 : 1;
    return Math.floor(basePrice * multiplier);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleAddToCart = async () => {
    if (uploadedFiles.length === 0) {
      alert('Por favor sube al menos una foto de referencia para continuar');
      return;
    }

    // Convert files to Base64
    const imagesBase64 = await Promise.all(uploadedFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));

    const cartItem: any = { // Using any temporarily to avoid strict type checks against the generic CartItem if context types aren't fully updated yet, but aiming to match the new interface
      id: `custom-${Date.now()}`,
      name: 'Figura Personalizada',
      size: selectedSize,
      finish: selectedFinish,
      price: calculatePrice(),
      type: 'custom',
      category: 'personalizada',
      images: imagesBase64
    };

    addItem(cartItem);
    alert(`Figura personalizada agregada al carrito: ${selectedSize} - ${selectedFinish} - $${calculatePrice().toLocaleString()} CLP`);

    // Resetear formulario
    setUploadedFiles([]);
    setSelectedSize('10cm');
    setSelectedFinish('Blanco');
  };

  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">PERSONALIZACIÓN</h2>
          <p className="text-lg sm:text-xl text-gray-600">Configura tu figura perfecta</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna 1 - Subida de archivos */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Subida de Referencias</h3>

            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${isDragOver
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-red-400 bg-gray-50'
                }`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="ri-upload-cloud-2-line text-4xl text-gray-400"></i>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Sube tus fotos de referencia
              </p>
              <p className="text-gray-500 mb-6">
                Múltiples ángulos para mejor precisión
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap inline-block"
              >
                Seleccionar Fotos
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna 2 - Calculadora de precios */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Calculadora de Precios</h3>

            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg">
              {/* Selector de tamaño */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Tamaño de la figura
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((item) => (
                    <button
                      key={item.size}
                      onClick={() => setSelectedSize(item.size)}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${selectedSize === item.size
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                        }`}
                    >
                      <div className="font-semibold">{item.size}</div>
                      <div className="text-sm text-gray-600">
                        ${item.price.toLocaleString()} CLP
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de acabado */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Acabado
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {finishes.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${selectedFinish === finish
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                        }`}
                    >
                      {finish}
                      {finish === 'Pintado a mano' && (
                        <div className="text-xs text-red-600">+50%</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio final */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 sm:p-5 mb-4">
                <div className="text-center">
                  <p className="text-base text-gray-600 mb-1">Precio Total</p>
                  <p className="text-3xl sm:text-4xl font-bold text-red-600">
                    ${calculatePrice().toLocaleString()} CLP
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4 text-center">
                * La complejidad se evaluará tras tu solicitud
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
