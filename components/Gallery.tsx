
'use client';

const galleryItems = [
  {
    title: "Figura de Anime Premium",
    description: "Réplica exacta con detalles increíbles y acabado pintado a mano",
    rating: 5.0,
    client: "María González",
    image: "https://readdy.ai/api/search-image?query=High%20quality%203D%20printed%20anime%20character%20figure%20with%20hand-painted%20details%2C%20professional%20lighting%2C%20clean%20background%2C%20collector%20quality%20craftsmanship%2C%20vibrant%20colors%2C%20intricate%20facial%20features%20and%20clothing%20details&width=400&height=400&seq=gallery-anime-001&orientation=squarish"
  },
  {
    title: "Mascota Personalizada",
    description: "Memorial hermoso de un golden retriever con expresión realista",
    rating: 5.0,
    client: "Carlos Mendoza",
    image: "https://readdy.ai/api/search-image?query=Custom%203D%20printed%20golden%20retriever%20dog%20figurine%2C%20realistic%20pet%20memorial%2C%20detailed%20fur%20texture%2C%20lifelike%20expression%2C%20professional%20photography%2C%20emotional%20tribute%20piece%2C%20high%20quality%20resin%20finish&width=400&height=400&seq=gallery-pet-001&orientation=squarish"
  },
  {
    title: "Personaje Gaming",
    description: "Héroe de videojuego con armadura detallada y efectos especiales",
    rating: 5.0,
    client: "Andrea Silva",
    image: "https://readdy.ai/api/search-image?query=Epic%203D%20printed%20gaming%20character%20with%20detailed%20armor%20and%20weapons%2C%20fantasy%20warrior%20figurine%2C%20professional%20quality%2C%20intricate%20design%20elements%2C%20collectible%20gaming%20merchandise%2C%20premium%20finish&width=400&height=400&seq=gallery-gaming-001&orientation=squarish"
  },
  {
    title: "Vehículo Clásico",
    description: "Modelo a escala 1:24 de un Mustang clásico con acabado perfecto",
    rating: 5.0,
    client: "Roberto Torres",
    image: "https://readdy.ai/api/search-image?query=Detailed%203D%20printed%20classic%20Mustang%20car%20model%201:24%20scale%2C%20precision%20automotive%20replica%2C%20collector%20quality%20miniature%2C%20professional%20photography%2C%20vintage%20car%20tribute%2C%20premium%20craftsmanship&width=400&height=400&seq=gallery-car-001&orientation=squarish"
  },
  {
    title: "Lámpara Artística",
    description: "Diseño geométrico único que crea patrones de luz fascinantes",
    rating: 5.0,
    client: "Valentina Ruiz",
    image: "https://readdy.ai/api/search-image?query=Custom%203D%20printed%20geometric%20artistic%20lamp%20with%20unique%20light%20patterns%2C%20modern%20home%20decoration%2C%20creative%20lighting%20design%2C%20elegant%20contemporary%20style%2C%20ambient%20illumination%20effects&width=400&height=400&seq=gallery-lamp-001&orientation=squarish"
  },
  {
    title: "Marco Decorativo",
    description: "Marco con patrones florales intrincados para fotografía especial",
    rating: 5.0,
    client: "Francisca López",
    image: "https://readdy.ai/api/search-image?query=Elegant%203D%20printed%20decorative%20frame%20with%20intricate%20floral%20patterns%2C%20custom%20photo%20frame%20design%2C%20artistic%20home%20decor%2C%20detailed%20craftsmanship%2C%20sophisticated%20ornamental%20elements&width=400&height=400&seq=gallery-frame-001&orientation=squarish"
  }
];

export default function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">GALERÍA</h2>
          <p className="text-xl text-gray-600">Trabajos que hablan por sí solos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      </div>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({item.rating})</span>
                  </div>
                  <p className="text-sm text-gray-500">- {item.client}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
