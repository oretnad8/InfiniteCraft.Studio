
'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  {
    name: 'Personajes',
    emoji: '🎭',
    description: 'Figuras de acción, anime, superhéroes',
    slug: 'personajes',
    image: 'https://readdy.ai/api/search-image?query=Premium%203D%20printed%20character%20figures%20and%20anime%20miniatures%20on%20clean%20display%2C%20detailed%20craftsmanship%2C%20professional%20lighting%2C%20modern%20showcase%2C%20high%20quality%20resin%20finish%2C%20collectible%20figurines%20arranged%20aesthetically&width=400&height=300&seq=cat-characters-001&orientation=landscape'
  },
  {
    name: 'Mascotas',
    emoji: '🐕',
    description: 'Réplicas exactas de tu compañero fiel',
    slug: 'mascotas',
    image: 'https://readdy.ai/api/search-image?query=Custom%203D%20printed%20pet%20figurines%20of%20dogs%20and%20cats%2C%20realistic%20details%2C%20personalized%20memorial%20pieces%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20heartwarming%20pet%20replicas&width=400&height=300&seq=cat-pets-001&orientation=landscape'
  },
  {
    name: 'Gaming',
    emoji: '🎮',
    description: 'Personajes de videojuegos icónicos',
    slug: 'gaming',
    image: 'https://readdy.ai/api/search-image?query=3D%20printed%20gaming%20character%20figurines%20from%20popular%20video%20games%2C%20detailed%20miniatures%2C%20collectible%20quality%2C%20modern%20display%20setup%2C%20premium%20resin%20material%2C%20gaming%20culture%20artifacts&width=400&height=300&seq=cat-gaming-001&orientation=landscape'
  },
  {
    name: 'Marcos',
    emoji: '🖼️',
    description: 'Marcos decorativos únicos, variedad de tamaños',
    slug: 'marcos',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20custom%203D%20printed%20decorative%20frames%20with%20intricate%20patterns%2C%20modern%20design%2C%20clean%20presentation%2C%20premium%20finish%2C%20artistic%20home%20decor%20accessories%2C%20sophisticated%20craftsmanship&width=400&height=300&seq=cat-frames-001&orientation=landscape'
  },
  {
    name: 'Vehículos',
    emoji: '🚗',
    description: 'Modelos a escala perfectos',
    slug: 'vehiculos',
    image: 'https://readdy.ai/api/search-image?query=Detailed%203D%20printed%20scale%20model%20vehicles%20and%20cars%2C%20precision%20engineering%2C%20collector%20quality%20miniatures%2C%20clean%20display%20arrangement%2C%20automotive%20replicas%2C%20professional%20lighting&width=400&height=300&seq=cat-vehicles-001&orientation=landscape'
  },
  {
    name: 'Maquetería',
    emoji: '🏗️',
    description: 'Arquitectura y construcciones',
    slug: 'maqueteria',
    image: 'https://readdy.ai/api/search-image?query=Architectural%203D%20printed%20scale%20models%20and%20building%20miniatures%2C%20precision%20construction%20details%2C%20professional%20presentation%2C%20clean%20background%2C%20detailed%20craftsmanship%2C%20structural%20replicas&width=400&height=300&seq=cat-architecture-001&orientation=landscape'
  },
  {
    name: 'Lámparas',
    emoji: '💡',
    description: 'Iluminación artística',
    slug: 'lamparas',
    image: 'https://readdy.ai/api/search-image?query=Custom%203D%20printed%20artistic%20lamps%20with%20unique%20designs%2C%20modern%20lighting%20fixtures%2C%20elegant%20home%20decor%2C%20creative%20illumination%2C%20contemporary%20style%2C%20premium%20quality%20finish&width=400&height=300&seq=cat-lamps-001&orientation=landscape'
  },
  {
    name: 'Prototipos',
    emoji: '⚙️',
    description: 'Desarrollo de productos',
    slug: 'prototipos',
    image: 'https://readdy.ai/api/search-image?query=Professional%203D%20printed%20prototypes%20and%20product%20development%20models%2C%20engineering%20precision%2C%20clean%20industrial%20design%2C%20technical%20accuracy%2C%20modern%20manufacturing%2C%20innovation%20showcase&width=400&height=300&seq=cat-prototypes-001&orientation=landscape'
  }
];

export default function Catalog() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="catalogo" className="py-[35px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-[30px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">CATÁLOGO</h2>
          <p className="text-lg sm:text-xl text-gray-600">Descubre todas las posibilidades de creación</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Link href={`/categoria/${category.slug}`} key={index}>
              <div
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-36 sm:h-48 object-cover transition-transform duration-300 ${hoveredCard === index ? 'scale-110' : 'scale-100'
                      }`}
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-2xl sm:text-3xl bg-white/90 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {category.emoji}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{category.description}</p>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
