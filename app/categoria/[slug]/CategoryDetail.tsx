
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../../hooks/useCart';

// Hardcoded hero images for categories (fallback or enhancement)
const categoryHeroImages: Record<string, string> = {
  personajes: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20character%20figures%20including%20anime%20heroes%2C%20superheroes%2C%20and%20action%20figures%2C%20premium%20resin%20quality%2C%20dramatic%20lighting%2C%20collector%20showcase%2C%20museum%20quality%20presentation&width=1200&height=600&seq=hero-personajes-001&orientation=landscape',
  mascotas: 'https://readdy.ai/api/search-image?query=Heartwarming%20collection%20of%20custom%203D%20printed%20pet%20figurines%2C%20dogs%20and%20cats%20in%20various%20poses%2C%20realistic%20details%2C%20memorial%20quality%2C%20emotional%20connection%2C%20professional%20pet%20photography%20style&width=1200&height=600&seq=hero-mascotas-001&orientation=landscape',
  gaming: 'https://readdy.ai/api/search-image?query=Epic%20gaming%20character%20figures%20collection%2C%20video%20game%20heroes%2C%20detailed%203D%20printed%20miniatures%2C%20gaming%20culture%20showcase%2C%20collector%20quality%2C%20dramatic%20lighting%2C%20modern%20gaming%20aesthetic&width=1200&height=600&seq=hero-gaming-001&orientation=landscape',
  marcos: 'https://readdy.ai/api/search-image?query=Elegant%20collection%20of%20custom%203D%20printed%20decorative%20frames%20with%20intricate%20patterns%20and%20designs%2C%20modern%20home%20decor%2C%20sophisticated%20craftsmanship%2C%20premium%20quality%20finish%2C%20artistic%20display&width=1200&height=600&seq=hero-marcos-001&orientation=landscape',
  vehiculos: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20scale%20model%20vehicles%2C%20classic%20cars%2C%20sports%20cars%2C%20and%20motorcycles%2C%20collector%20quality%2C%20precision%20engineering%2C%20automotive%20miniatures%20showcase&width=1200&height=600&seq=hero-vehiculos-001&orientation=landscape',
  maqueteria: 'https://readdy.ai/api/search-image?query=Professional%20architectural%20scale%20models%20and%20building%20miniatures%2C%20detailed%20construction%20replicas%2C%20precision%20crafted%20structures%2C%20modern%20and%20classic%20architecture%20showcase&width=1200&height=600&seq=hero-maqueteria-001&orientation=landscape',
  lamparas: 'https://readdy.ai/api/search-image?query=Collection%20of%20custom%203D%20printed%20artistic%20lamps%20and%20lighting%20fixtures%2C%20modern%20design%2C%20creative%20illumination%2C%20contemporary%20home%20decor%2C%20elegant%20lighting%20solutions&width=1200&height=600&seq=hero-lamparas-001&orientation=landscape',
  prototipos: 'https://readdy.ai/api/search-image?query=Professional%203D%20printed%20prototypes%20and%20product%20development%20models%2C%20engineering%20precision%2C%20industrial%20design%2C%20technical%20accuracy%2C%20modern%20manufacturing%20showcase&width=1200&height=600&seq=hero-prototipos-001&orientation=landscape'
};

// Hardcoded dictionary just for extra category metadata if not in API (like heroImage fallback)
const categoryMetadata: Record<string, { heroImage: string, emoji: string, title?: string, description?: string }> = {
  personajes: {
    emoji: '🎭',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20character%20figures%20including%20anime%20heroes%2C%20superheroes%2C%20and%20action%20figures%2C%20premium%20resin%20quality%2C%20dramatic%20lighting%2C%20collector%20showcase%2C%20museum%20quality%20presentation&width=1200&height=600&seq=hero-personajes-001&orientation=landscape'
  },
  mascotas: {
    emoji: '🐕',
    heroImage: 'https://readdy.ai/api/search-image?query=Heartwarming%20collection%20of%20custom%203D%20printed%20pet%20figurines%2C%20dogs%20and%20cats%20in%20various%20poses%2C%20realistic%20details%2C%20memorial%20quality%2C%20emotional%20connection%2C%20professional%20pet%20photography%20style&width=1200&height=600&seq=hero-mascotas-001&orientation=landscape'
  },
  gaming: {
    emoji: '🎮',
    heroImage: 'https://readdy.ai/api/search-image?query=Epic%20gaming%20character%20figures%20collection%2C%20video%20game%20heroes%2C%20detailed%203D%20printed%20miniatures%2C%20gaming%20culture%20showcase%2C%20collector%20quality%2C%20dramatic%20lighting%2C%20modern%20gaming%20aesthetic&width=1200&height=600&seq=hero-gaming-001&orientation=landscape'
  },
  marcos: {
    emoji: '🖼️',
    heroImage: 'https://readdy.ai/api/search-image?query=Elegant%20collection%20of%20custom%203D%20printed%20decorative%20frames%20with%20intricate%20patterns%20and%20designs%2C%20modern%20home%20decor%2C%20sophisticated%20craftsmanship%2C%20premium%20quality%20finish%2C%20artistic%20display&width=1200&height=600&seq=hero-marcos-001&orientation=landscape'
  },
  vehiculos: {
    emoji: '🚗',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20scale%20model%20vehicles%2C%20classic%20cars%2C%20sports%20cars%2C%20and%20motorcycles%2C%20collector%20quality%2C%20precision%20engineering%2C%20automotive%20miniatures%20showcase&width=1200&height=600&seq=hero-vehiculos-001&orientation=landscape'
  },
  maqueteria: {
    emoji: '🏗️',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20architectural%20scale%20models%20and%20building%20miniatures%2C%20detailed%20construction%20replicas%2C%20precision%20crafted%20structures%2C%20modern%20and%20classic%20architecture%20showcase&width=1200&height=600&seq=hero-maqueteria-001&orientation=landscape'
  },
  lamparas: {
    emoji: '💡',
    heroImage: 'https://readdy.ai/api/search-image?query=Collection%20of%20custom%203D%20printed%20artistic%20lamps%20and%20lighting%20fixtures%2C%20modern%20design%2C%20creative%20illumination%2C%20contemporary%20home%20decor%2C%20elegant%20lighting%20solutions&width=1200&height=600&seq=hero-lamparas-001&orientation=landscape'
  },
  prototipos: {
    emoji: '⚙️',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%203D%20printed%20prototypes%20and%20product%20development%20models%2C%20engineering%20precision%2C%20industrial%20design%2C%20technical%20accuracy%2C%20modern%20manufacturing%20showcase&width=1200&height=600&seq=hero-prototipos-001&orientation=landscape'
  }
};

export default function CategoryDetail({ categorySlug }: { categorySlug: string }) {
  const { addItem } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('Color base');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch products filtered by category
        const productsRes = await fetch(`http://localhost:4001/products?category=${categorySlug}`);
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          // Map backend product structure to frontend expectations if needed
          // Backend has: name, price, size, finish, imageUrl
          // Frontend expects: name, image, sizes array (mocking sizes for now based on single size), basePrice
          const mappedProducts = productsData.map((p: any) => ({
            id: p._id,
            name: p.name,
            image: p.imageUrl,
            basePrice: p.price,
            stock: p.stock > 0 ? 'En Stock' : 'A pedido',
            complexity: 'Media', // Default
            sizes: [
              { size: p.size || 'Estándar', price: p.price }
            ],
            description: p.description
          }));
          setProducts(mappedProducts);
        }

        // 2. Fetch category details (for title/desc) or use metadata fallback
        const meta = categoryMetadata[categorySlug] || {};

        // Try getting category info from backend API if exists
        try {
          const categoriesRes = await fetch('http://localhost:4001/categories');
          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            const foundCat = categoriesData.find((c: any) => c.slug === categorySlug);
            if (foundCat) {
              setCategoryInfo({
                title: foundCat.name,
                emoji: foundCat.emoji,
                description: foundCat.description,
                heroImage: foundCat.image || meta.heroImage // User DB image or fallback
              });
              return;
            }
          }
        } catch (e) { console.error('Error fetching categories list:', e); }

        // Fallback to metadata if DB fetch fails or category not found
        setCategoryInfo({
          title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
          emoji: meta.emoji || '📦',
          description: `Explora nuestra colección de ${categorySlug}`,
          heroImage: meta.heroImage || 'https://via.placeholder.com/1200x600'
        });

      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  if (loading) return <div className="p-10 text-center">Cargando productos...</div>;
  if (!categoryInfo) return <div className="p-10 text-center">Categoría no encontrada</div>;

  const category = {
    ...categoryInfo,
    products: products
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[1]?.size || product.sizes[0]?.size);
    setSelectedFinish('Color base');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedFinish('Color base');
  };

  const getCurrentPrice = () => {
    if (!selectedProduct || !selectedSize) return 0;
    const sizePrice = selectedProduct.sizes.find((s: any) => s.size === selectedSize)?.price || 0;
    const multiplier = selectedFinish === 'Pintado a mano' ? 1.3 : 1;
    return Math.round(sizePrice * multiplier);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize) return;

    const cartItem = {
      id: `${categorySlug}-${selectedProduct.id}-${selectedSize}-${selectedFinish}-${Date.now()}`,
      name: selectedProduct.name,
      size: selectedSize,
      finish: selectedFinish,
      price: getCurrentPrice(),
      type: 'stock' as const,
      image: selectedProduct.image,
      category: categorySlug
    };

    addItem(cartItem);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    closeModal();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-6 right-4 left-4 sm:right-6 sm:left-auto bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg z-50 flex items-center">
          <i className="ri-check-circle-fill text-lg sm:text-xl mr-2 sm:mr-3"></i>
          <div>
            <p className="font-semibold text-sm sm:text-base">¡Producto agregado al carrito!</p>
            <p className="text-xs sm:text-sm opacity-90">Revisa tu carrito flotante</p>
          </div>
        </div>
      )}

      {/* Botón flotante para volver arriba */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-30 cursor-pointer"
      >
        <i className="ri-arrow-up-line text-lg sm:text-xl"></i>
      </button>

      {/* Hero Section */}
      <section
        className="relative h-[220px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${category.heroImage}')`
        }}
      >
        <div className="text-center text-white px-4">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">{category.emoji}</div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">{category.title}</h1>
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>

      {/* Productos */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href="/">
                <button className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer text-sm sm:text-base">
                  <i className="ri-arrow-left-line mr-2"></i>
                  Volver al inicio
                </button>
              </Link>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Figuras con Archivo Disponible</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Precios más accesibles - Solo imprimes y recibes</p>
              </div>
            </div>
            <Link href="/personalizacion">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base">
                Crear Mi Figura Personalizada
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {category.products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-red-600">Desde ${product.sizes[0]?.price.toLocaleString()} CLP</span>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800 w-fit">
                      {product.stock}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {product.sizes.map((sizeOption) => (
                      <span key={sizeOption.size} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs sm:text-sm">
                        {sizeOption.size}: ${sizeOption.price.toLocaleString()}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <span className="text-xs sm:text-sm text-gray-600">Complejidad: {product.complexity}</span>
                    <button
                      onClick={() => openProductModal(product)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                    >
                      Seleccionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Configuración de Producto */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">{selectedProduct.name}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer flex-shrink-0"
                >
                  <i className="ri-close-line text-xl sm:text-2xl"></i>
                </button>
              </div>

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4 sm:mb-6"
              />

              <div className="space-y-4 sm:space-y-6">
                {/* Selector de tamaño */}
                <div>
                  <h4 className="font-semibold mb-3 text-base sm:text-lg">Selecciona el tamaño:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {selectedProduct.sizes.map((sizeOption: any) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => setSelectedSize(sizeOption.size)}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-colors cursor-pointer ${selectedSize === sizeOption.size ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                      >
                        <div className="font-semibold text-sm sm:text-base">{sizeOption.size}</div>
                        <div className="text-xs sm:text-sm">${sizeOption.price.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector de acabado */}
                <div>
                  <h4 className="font-semibold mb-3 text-base sm:text-lg">Selecciona el acabado:</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {['Color base', 'Pintado a mano'].map((finish) => (
                      <label
                        key={finish}
                        className="flex items-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="finish"
                          value={finish}
                          checked={selectedFinish === finish}
                          onChange={(e) => setSelectedFinish(e.target.value)}
                          className="w-4 h-4 text-red-600 mr-3"
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{finish}</span>
                          {finish === 'Pintado a mano' && (
                            <span className="text-red-600 text-xs sm:text-sm ml-2">(+30%)</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Precio final */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">Precio Final:</span>
                    <span className="text-2xl sm:text-3xl font-bold text-red-600">${getCurrentPrice().toLocaleString()} CLP</span>
                  </div>
                </div>

                {/* Botón de agregar al carrito */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Agregar al Carrito
                </button>

                {/* Información adicional */}
                <div className="text-center">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Tiempo de impresión: 3-7 días hábiles
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Envío gratis en Santiago • Envío nacional disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
