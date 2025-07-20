
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';

export default function PersonalizacionPage() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('10cm');
  const [selectedFinish, setSelectedFinish] = useState('Blanco');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [figureName, setFigureName] = useState('');
  const [comments, setComments] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(35000);

  // Precios para figuras personalizadas (incluyen diseño)
  const sizes = [
    { size: '5cm', price: 30000 },
    { size: '10cm', price: 35000 },
    { size: '15cm', price: 40000 },
    { size: '20cm', price: 45000 },
    { size: '25cm', price: 50000 }
  ];

  const finishes = [
    { name: 'Blanco', multiplier: 1 },
    { name: 'Gris', multiplier: 1 },
    { name: 'Negro', multiplier: 1 },
    { name: 'Pintado a mano', multiplier: 1.5 }
  ];

  // Calcular precio en tiempo real
  useEffect(() => {
    const basePrice = sizes.find(s => s.size === selectedSize)?.price || 35000;
    const finishMultiplier = finishes.find(f => f.name === selectedFinish)?.multiplier || 1;
    const finalPrice = Math.round(basePrice * finishMultiplier);
    setCurrentPrice(finalPrice);
  }, [selectedSize, selectedFinish]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === files.length) {
            setUploadedImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (uploadedImages.length === 0) {
      alert('Por favor sube al menos una foto de referencia para continuar');
      return;
    }

    if (!figureName.trim()) {
      alert('Por favor ingresa un nombre para tu figura personalizada');
      return;
    }

    const cartItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: figureName.trim(),
      size: selectedSize,
      finish: selectedFinish,
      price: currentPrice,
      type: 'custom' as const,
      category: 'personalizada',
      comments: comments.trim()
    };

    addItem(cartItem);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Resetear formulario
    setUploadedImages([]);
    setSelectedSize('10cm');
    setSelectedFinish('Blanco');
    setFigureName('');
    setComments('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-6 right-4 left-4 sm:right-6 sm:left-auto bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg z-50 flex items-center">
          <i className="ri-check-circle-fill text-lg sm:text-xl mr-2 sm:mr-3"></i>
          <div>
            <p className="font-semibold text-sm sm:text-base">¡Figura personalizada agregada!</p>
            <p className="text-xs sm:text-sm opacity-90">Revisa tu carrito flotante</p>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Figura Personalizada</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Diseño único basado en tus referencias fotográficas</p>
              <div className="mt-2 sm:mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-xs sm:text-sm font-medium">
                  Precio incluye: Diseño 3D personalizado + Impresión + Acabado
                </p>
              </div>
            </div>
            <Link href="/">
              <button className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer text-sm sm:text-base">
                <i className="ri-arrow-left-line mr-2"></i>
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Columna 1 - Subida de archivos */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            {/* Campo nombre de la figura */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Información de la Figura</h2>
              <div>
                <label htmlFor="figureName" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Nombre de tu figura personalizada *
                </label>
                <input
                  type="text"
                  id="figureName"
                  value={figureName}
                  onChange={(e) => setFigureName(e.target.value)}
                  placeholder="Ej: Mi Figura Favorita"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  maxLength={50}
                />
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{figureName.length}/50 caracteres</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Referencias Fotográficas</h3>

            {/* Área de arrastrar y soltar */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors ${
                dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400">
                <i className="ri-upload-cloud-2-line text-4xl sm:text-6xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Sube tus fotos de referencia
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Múltiples ángulos para mejor precisión en el diseño
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold cursor-pointer transition-colors inline-block whitespace-nowrap text-sm sm:text-base"
              >
                Seleccionar Fotos
              </label>
            </div>

            {/* Vista previa de imágenes */}
            {uploadedImages.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Fotos subidas ({uploadedImages.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Referencia ${index + 1}`}
                        className="w-full h-20 sm:h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <i className="ri-close-line text-xs sm:text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campo de comentarios */}
            <div className="mt-6 sm:mt-8">
              <label htmlFor="comments" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Comentarios adicionales (opcional)
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Describe detalles específicos, poses, colores especiales, o cualquier información que ayude a crear tu figura perfecta..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base resize-none"
                rows={4}
                maxLength={500}
              />
              <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{comments.length}/500 caracteres</p>
            </div>

            {/* Instrucciones */}
            <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
              <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                <i className="ri-information-line mr-2"></i>
                Consejos para mejores resultados
              </h4>
              <ul className="text-blue-800 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li>• Sube fotos desde múltiples ángulos (frente, perfil, posterior)</li>
                <li>• Usa buena iluminación y enfoque nítido</li>
                <li>• Incluye detalles importantes en primeros planos</li>
                <li>• Entre más referencias, más preciso será el resultado</li>
              </ul>
            </div>
          </div>

          {/* Columna 2 - Calculadora de precios */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Configuración y Precio</h2>

            {/* Selector de tamaño */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Tamaño de la figura</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      selectedSize === sizeOption.size
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-sm sm:text-base">{sizeOption.size}</div>
                    <div className="text-xs sm:text-sm">${sizeOption.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de acabado */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Acabado</h3>
              <div className="space-y-2 sm:space-y-3">
                {finishes.map((finish) => (
                  <label
                    key={finish.name}
                    className="flex items-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="finish"
                      value={finish.name}
                      checked={selectedFinish === finish.name}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                      className="w-4 h-4 text-red-600 mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{finish.name}</span>
                      {finish.multiplier > 1 && (
                        <span className="text-red-600 text-xs sm:text-sm ml-2">(+{Math.round((finish.multiplier - 1) * 100)}%)</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Precio final - Actualizado en tiempo real */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-sm sm:text-lg text-gray-700">Diseño personalizado + Impresión ({selectedSize}):</span>
                <span className="text-sm sm:text-lg font-semibold">${sizes.find(s => s.size === selectedSize)?.price.toLocaleString()} CLP</span>
              </div>
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-sm sm:text-lg text-gray-700">Acabado ({selectedFinish}):</span>
                <span className="text-sm sm:text-lg font-semibold">
                  {finishes.find(f => f.name === selectedFinish)?.multiplier === 1
                    ? 'Incluido'
                    : `+${Math.round((finishes.find(f => f.name === selectedFinish)?.multiplier! - 1) * 100)}%`}
                </span>
              </div>
              <div className="border-t pt-3 sm:pt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">Precio Final:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-red-600">${currentPrice.toLocaleString()} CLP</span>
                </div>
              </div>
            </div>

            {/* Nota importante */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-start">
                <i className="ri-information-line text-orange-500 text-lg sm:text-xl mr-2 sm:mr-3 mt-1"></i>
                <div>
                  <p className="text-orange-800 font-semibold mb-1 text-sm sm:text-base">Proceso de creación:</p>
                  <p className="text-orange-700 text-xs sm:text-sm">
                    Una vez confirmado el pedido, evaluaremos la complejidad y te contactaremos si hay ajustes en el precio antes de iniciar el diseño.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de agregar al carrito */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-cart-line mr-2"></i>
              Solicitar Figura Personalizada
            </button>

            {/* Información adicional */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-gray-600 text-xs sm:text-sm">
                Tiempo de creación: 10-21 días hábiles
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Incluye: Diseño 3D + Revisiones + Impresión + Acabado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
