
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
  const [showTips, setShowTips] = useState(false);

  // Precios para figuras personalizadas (incluyen diseño)
  const sizes = [
    { size: '5cm', price: 20000 },
    { size: '9cm', price: 25000 },
    { size: '13cm', price: 30000 },
    { size: '17cm', price: 35000 },
    { size: '21cm', price: 40000 },
    { size: '25cm', price: 45000 }
  ];

  const finishes = [
    { name: 'Blanco', multiplier: 1, color: '#FFFFFF' },
    { name: 'Gris', multiplier: 1, color: '#9CA3AF' },
    { name: 'Negro', multiplier: 1, color: '#111827' },
    { name: 'Pintado a mano', multiplier: 1.5, color: 'bg-gradient-to-tr from-red-500 via-yellow-500 to-blue-500' }
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

      {/* Modal de Consejos */}
      {showTips && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowTips(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
            <button
              onClick={() => setShowTips(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <i className="ri-information-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Consejos de Diseño</h3>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <i className="ri-camera-lens-line text-blue-500 mt-1"></i>
                <p className="text-gray-600 text-sm sm:text-base">Sube fotos desde múltiples ángulos (frente, perfil, posterior).</p>
              </li>
              <li className="flex gap-3">
                <i className="ri-lightbulb-line text-blue-500 mt-1"></i>
                <p className="text-gray-600 text-sm sm:text-base">Usa buena iluminación y asegúrate de que el enfoque sea nítido.</p>
              </li>
              <li className="flex gap-3">
                <i className="ri-zoom-in-line text-blue-500 mt-1"></i>
                <p className="text-gray-600 text-sm sm:text-base">Incluye detalles importantes en primeros planos.</p>
              </li>
              <li className="flex gap-3">
                <i className="ri-folder-image-line text-blue-500 mt-1"></i>
                <p className="text-gray-600 text-sm sm:text-base">Entre más referencias subas, más preciso será el resultado final.</p>
              </li>
            </ul>

            <button
              onClick={() => setShowTips(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Figura Personalizada</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Diseño único basado en tus referencias fotográficas</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 sm:pt-2 pb-4 sm:pb-6">
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

            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Referencias Fotográficas</h2>
              <button
                onClick={() => setShowTips(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                title="Consejos para mejores resultados"
                type="button"
              >
                <i className="ri-information-line text-xl"></i>
              </button>
            </div>

            {/* Área de arrastrar y soltar */}
            <div
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-gray-400">
                <i className="ri-upload-cloud-2-line text-2xl sm:text-3xl"></i>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                Sube tus fotos de referencia
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
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

          </div>

          {/* Columna 2 - Calculadora de precios */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Configuración y Precio</h2>

            {/* Selector de tamaño con Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tamaño de la figura</h3>
                  <p className="text-sm text-gray-500">Desliza para elegir el tamaño</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">{selectedSize}</span>
                  <p className="text-sm font-medium text-gray-600">
                    ${sizes.find(s => s.size === selectedSize)?.price.toLocaleString()} CLP
                  </p>
                </div>
              </div>

              <div className="relative pt-4 pb-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={(() => {
                    const sliderSizes = ['5cm', '9cm', '13cm', '17cm', '21cm', '25cm'];
                    return sliderSizes.indexOf(selectedSize);
                  })()}
                  onChange={(e) => {
                    const sliderSizes = ['5cm', '9cm', '13cm', '17cm', '21cm', '25cm'];
                    setSelectedSize(sliderSizes[parseInt(e.target.value)]);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-gray-500 font-medium">5cm</span>
                  <span className="text-xs text-gray-500 font-medium">13cm</span>
                  <span className="text-xs text-gray-500 font-medium">25cm</span>
                </div>
              </div>
            </div>

            {/* Selector de acabado */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Acabado</h3>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {finishes.map((finish) => (
                  <div key={finish.name} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSelectedFinish(finish.name)}
                      title={finish.name}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] transition-all cursor-pointer relative ${selectedFinish === finish.name
                        ? 'border-red-500 scale-110 shadow-lg'
                        : 'border-gray-200 hover:border-gray-400'
                        } ${finish.name === 'Pintado a mano' ? finish.color : ''}`}
                      style={finish.name !== 'Pintado a mano' ? { backgroundColor: finish.color } : {}}
                    >
                      {selectedFinish === finish.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className={`ri-check-line text-xl ${finish.name === 'Blanco' ? 'text-gray-800' : 'text-white'}`}></i>
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Precio final - Actualizado en tiempo real */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-1 sm:mb-2 text-gray-700">
                <span className="text-sm sm:text-base">Diseño + Impresión ({selectedSize}):</span>
                <span className="text-sm sm:text-base font-medium">${sizes.find(s => s.size === selectedSize)?.price.toLocaleString()} CLP</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-gray-700">
                <span className="text-sm sm:text-base">Acabado ({selectedFinish}):</span>
                <span className="text-sm sm:text-base font-medium">
                  {finishes.find(f => f.name === selectedFinish)?.multiplier === 1
                    ? 'Incluido'
                    : `+${Math.round((finishes.find(f => f.name === selectedFinish)?.multiplier! - 1) * 100)}%`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Precio Final:</span>
                  <span className="text-xl sm:text-2xl font-bold text-red-600">${currentPrice.toLocaleString()} CLP</span>
                </div>
              </div>
            </div>

            {/* Nota importante */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-start">
                <i className="ri-time-line text-blue-500 text-lg sm:text-xl mr-2 sm:mr-3 mt-1"></i>
                <div>
                  <p className="text-blue-900 font-semibold mb-1 text-sm sm:text-base">Tiempo de creación: 10-21 días hábiles</p>
                  <p className="text-blue-800 text-xs sm:text-sm">
                    Incluye: Diseño 3D + Revisiones + Impresión + Acabado
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

          </div>
        </div>
      </div>
    </div >
  );
}
