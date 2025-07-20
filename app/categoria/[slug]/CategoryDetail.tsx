
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../hooks/useCart';

const categoryData = {
  personajes: {
    title: 'Personajes',
    emoji: '🎭',
    description: 'Figuras de acción, anime, superhéroes y personajes icónicos',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20character%20figures%20including%20anime%20heroes%2C%20superheroes%2C%20and%20action%20figures%2C%20premium%20resin%20quality%2C%20dramatic%20lighting%2C%20collector%20showcase%2C%20museum%20quality%20presentation&width=1200&height=600&seq=hero-personajes-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Goku Ultra Instinto',
        basePrice: 25000,
        image: 'https://readdy.ai/api/search-image?query=Detailed%203D%20printed%20Goku%20Ultra%20Instinto%20figure%2C%20silver%20hair%2C%20dynamic%20pose%2C%20premium%20resin%20finish%2C%20professional%20lighting%2C%20collector%20quality%2C%20anime%20figure&width=400&height=400&seq=prod-goku-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 20000 },
          { size: '10cm', price: 25000 },
          { size: '15cm', price: 30000 },
          { size: '20cm', price: 35000 },
          { size: '25cm', price: 40000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Spider-Man Miles Morales',
        basePrice: 28000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Miles%20Morales%20Spider-Man%20figure%2C%20black%20and%20red%20suit%2C%20dynamic%20web-swinging%20pose%2C%20detailed%20costume%20texture%2C%20superhero%20collectible&width=400&height=400&seq=prod-miles-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 23000 },
          { size: '10cm', price: 28000 },
          { size: '15cm', price: 33000 },
          { size: '20cm', price: 38000 },
          { size: '25cm', price: 43000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Naruto Hokage',
        basePrice: 22000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Naruto%20Hokage%20figure%2C%20orange%20outfit%2C%20confident%20pose%2C%20detailed%20facial%20features%2C%20anime%20collectible%2C%20premium%20resin%20quality&width=400&height=400&seq=prod-naruto-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 18000 },
          { size: '10cm', price: 22000 },
          { size: '15cm', price: 27000 },
          { size: '20cm', price: 32000 },
          { size: '25cm', price: 37000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 4,
        name: 'Wonder Woman',
        basePrice: 26000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Wonder%20Woman%20figure%2C%20golden%20armor%2C%20heroic%20pose%2C%20detailed%20costume%2C%20DC%20Comics%20collectible%2C%20professional%20quality%20finish&width=400&height=400&seq=prod-wonder-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 21000 },
          { size: '10cm', price: 26000 },
          { size: '15cm', price: 31000 },
          { size: '20cm', price: 36000 },
          { size: '25cm', price: 41000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 5,
        name: 'Vegeta Super Saiyan Blue',
        basePrice: 24000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Vegeta%20Super%20Saiyan%20Blue%20figure%2C%20blue%20hair%2C%20battle%20stance%2C%20detailed%20muscle%20definition%2C%20Dragon%20Ball%20collectible&width=400&height=400&seq=prod-vegeta-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 19000 },
          { size: '10cm', price: 24000 },
          { size: '15cm', price: 29000 },
          { size: '20cm', price: 34000 },
          { size: '25cm', price: 39000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 6,
        name: 'Batman Dark Knight',
        basePrice: 30000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Batman%20Dark%20Knight%20figure%2C%20black%20cape%2C%20detailed%20armor%2C%20dramatic%20pose%2C%20DC%20Comics%20collectible%2C%20premium%20finish&width=400&height=400&seq=prod-batman-001&orientation=squarish',
        sizes: [
          { size: '10cm', price: 30000 },
          { size: '15cm', price: 35000 },
          { size: '20cm', price: 40000 },
          { size: '25cm', price: 45000 }
        ],
        complexity: 'Muy Alta',
        stock: 'Archivo disponible'
      }
    ]
  },
  mascotas: {
    title: 'Mascotas',
    emoji: '🐕',
    description: 'Réplicas exactas y emotivas de tu compañero fiel',
    heroImage: 'https://readdy.ai/api/search-image?query=Heartwarming%20collection%20of%20custom%203D%20printed%20pet%20figurines%2C%20dogs%20and%20cats%20in%20various%20poses%2C%20realistic%20details%2C%20memorial%20quality%2C%20emotional%20connection%2C%20professional%20pet%20photography%20style&width=1200&height=600&seq=hero-mascotas-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Golden Retriever Genérico',
        basePrice: 28000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Golden%20Retriever%20figurine%2C%20sitting%20pose%2C%20realistic%20fur%20texture%2C%20loving%20expression%2C%20generic%20breed%20model%2C%20quality%20pet%20replica&width=400&height=400&seq=prod-golden-gen-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 23000 },
          { size: '10cm', price: 28000 },
          { size: '15cm', price: 33000 },
          { size: '20cm', price: 38000 },
          { size: '25cm', price: 43000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Gato Persa Genérico',
        basePrice: 26000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Persian%20cat%20figurine%2C%20fluffy%20fur%20details%2C%20elegant%20pose%2C%20realistic%20facial%20features%2C%20generic%20breed%20model%2C%20premium%20quality&width=400&height=400&seq=prod-persian-gen-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 21000 },
          { size: '10cm', price: 26000 },
          { size: '15cm', price: 31000 },
          { size: '20cm', price: 36000 },
          { size: '25cm', price: 41000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Bulldog Francés Genérico',
        basePrice: 25000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20French%20Bulldog%20figurine%2C%20characteristic%20wrinkles%2C%20playful%20expression%2C%20detailed%20breed%20features%2C%20generic%20breed%20model&width=400&height=400&seq=prod-bulldog-gen-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 20000 },
          { size: '10cm', price: 25000 },
          { size: '15cm', price: 30000 },
          { size: '20cm', price: 35000 },
          { size: '25cm', price: 40000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      }
    ]
  },
  gaming: {
    title: 'Gaming',
    emoji: '🎮',
    description: 'Personajes icónicos de videojuegos y mundos virtuales',
    heroImage: 'https://readdy.ai/api/search-image?query=Epic%20gaming%20character%20figures%20collection%2C%20video%20game%20heroes%2C%20detailed%203D%20printed%20miniatures%2C%20gaming%20culture%20showcase%2C%20collector%20quality%2C%20dramatic%20lighting%2C%20modern%20gaming%20aesthetic&width=1200&height=600&seq=hero-gaming-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Master Chief Halo',
        basePrice: 32000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Master%20Chief%20figure%20from%20Halo%2C%20detailed%20armor%2C%20iconic%20helmet%2C%20military%20pose%2C%20gaming%20collectible%2C%20high%20quality%20finish&width=400&height=400&seq=prod-chief-001&orientation=squarish',
        sizes: [
          { size: '10cm', price: 32000 },
          { size: '15cm', price: 37000 },
          { size: '20cm', price: 42000 },
          { size: '25cm', price: 47000 }
        ],
        complexity: 'Muy Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Kratos God of War',
        basePrice: 35000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Kratos%20figure%2C%20Norse%20mythology%20version%2C%20detailed%20tattoos%2C%20axe%20weapon%2C%20muscular%20build%2C%20God%20of%20War%20collectible&width=400&height=400&seq=prod-kratos-001&orientation=squarish',
        sizes: [
          { size: '10cm', price: 35000 },
          { size: '15cm', price: 40000 },
          { size: '20cm', price: 45000 },
          { size: '25cm', price: 50000 }
        ],
        complexity: 'Muy Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Link Breath of Wild',
        basePrice: 27000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Link%20figure%20from%20Zelda%20Breath%20of%20the%20Wild%2C%20detailed%20clothing%2C%20master%20sword%2C%20heroic%20pose%2C%20Nintendo%20collectible&width=400&height=400&seq=prod-link-001&orientation=squarish',
        sizes: [
          { size: '5cm', price: 22000 },
          { size: '10cm', price: 27000 },
          { size: '15cm', price: 32000 },
          { size: '20cm', price: 37000 },
          { size: '25cm', price: 42000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      }
    ]
  },
  marcos: {
    title: 'Marcos',
    emoji: '🖼️',
    description: 'Marcos decorativos únicos y personalizados',
    heroImage: 'https://readdy.ai/api/search-image?query=Elegant%20collection%20of%20custom%203D%20printed%20decorative%20frames%20with%20intricate%20patterns%20and%20designs%2C%20modern%20home%20decor%2C%20sophisticated%20craftsmanship%2C%20premium%20quality%20finish%2C%20artistic%20display&width=1200&height=600&seq=hero-marcos-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Marco Ornamental Clásico',
        basePrice: 18000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20ornamental%20classic%20picture%20frame%20with%20elegant%20baroque%20details%2C%20decorative%20patterns%2C%20premium%20white%20finish%2C%20sophisticated%20home%20decor&width=400&height=400&seq=prod-marco-classic-001&orientation=squarish',
        sizes: [
          { size: '10x15cm', price: 18000 },
          { size: '15x20cm', price: 22000 },
          { size: '20x25cm', price: 28000 },
          { size: '25x30cm', price: 35000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Marco Minimalista Moderno',
        basePrice: 15000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20minimalist%20modern%20picture%20frame%2C%20clean%20lines%2C%20geometric%20design%2C%20contemporary%20home%20decor%2C%20sleek%20finish&width=400&height=400&seq=prod-marco-modern-001&orientation=squarish',
        sizes: [
          { size: '10x15cm', price: 15000 },
          { size: '15x20cm', price: 19000 },
          { size: '20x25cm', price: 24000 },
          { size: '25x30cm', price: 30000 }
        ],
        complexity: 'Baja',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Marco Temático Infantil',
        basePrice: 20000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20children%20themed%20picture%20frame%20with%20playful%20decorative%20elements%2C%20colorful%20design%2C%20cartoon%20style%2C%20kids%20room%20decor&width=400&height=400&seq=prod-marco-kids-001&orientation=squarish',
        sizes: [
          { size: '10x15cm', price: 20000 },
          { size: '15x20cm', price: 25000 },
          { size: '20x25cm', price: 30000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      }
    ]
  },
  vehiculos: {
    title: 'Vehículos',
    emoji: '🚗',
    description: 'Modelos a escala perfectos de vehículos icónicos',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20display%20of%20detailed%203D%20printed%20scale%20model%20vehicles%2C%20classic%20cars%2C%20sports%20cars%2C%20and%20motorcycles%2C%20collector%20quality%2C%20precision%20engineering%2C%20automotive%20miniatures%20showcase&width=1200&height=600&seq=hero-vehiculos-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Ferrari F40 Clásico',
        basePrice: 35000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Ferrari%20F40%20scale%20model%2C%20red%20sports%20car%2C%20detailed%20body%20work%2C%20collector%20quality%20automotive%20miniature%2C%20precision%20craftsmanship&width=400&height=400&seq=prod-ferrari-001&orientation=squarish',
        sizes: [
          { size: '1:64', price: 25000 },
          { size: '1:43', price: 35000 },
          { size: '1:24', price: 50000 },
          { size: '1:18', price: 75000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Volkswagen Beetle Vintage',
        basePrice: 28000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Volkswagen%20Beetle%20vintage%20scale%20model%2C%20classic%20car%20design%2C%20detailed%20craftsmanship%2C%20retro%20automotive%20collectible&width=400&height=400&seq=prod-beetle-001&orientation=squarish',
        sizes: [
          { size: '1:64', price: 20000 },
          { size: '1:43', price: 28000 },
          { size: '1:24', price: 40000 },
          { size: '1:18', price: 60000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Harley Davidson Motorcycle',
        basePrice: 32000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Harley%20Davidson%20motorcycle%20scale%20model%2C%20detailed%20bike%20replica%2C%20precision%20engineering%2C%20motorcycle%20collectible%20miniature&width=400&height=400&seq=prod-harley-001&orientation=squarish',
        sizes: [
          { size: '1:64', price: 22000 },
          { size: '1:43', price: 32000 },
          { size: '1:24', price: 45000 },
          { size: '1:18', price: 65000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      }
    ]
  },
  maqueteria: {
    title: 'Maquetería',
    emoji: '🏗️',
    description: 'Arquitectura y construcciones detalladas',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20architectural%20scale%20models%20and%20building%20miniatures%2C%20detailed%20construction%20replicas%2C%20precision%20crafted%20structures%2C%20modern%20and%20classic%20architecture%20showcase&width=1200&height=600&seq=hero-maqueteria-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Casa Moderna Minimalista',
        basePrice: 45000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20modern%20minimalist%20house%20scale%20model%2C%20contemporary%20architecture%2C%20clean%20lines%2C%20detailed%20construction%2C%20architectural%20miniature&width=400&height=400&seq=prod-casa-moderna-001&orientation=squarish',
        sizes: [
          { size: '1:100', price: 35000 },
          { size: '1:75', price: 45000 },
          { size: '1:50', price: 65000 },
          { size: '1:25', price: 95000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Torre Eiffel Replica',
        basePrice: 40000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Eiffel%20Tower%20scale%20model%20replica%2C%20detailed%20iron%20structure%2C%20architectural%20landmark%2C%20precision%20crafted%20monument%20miniature&width=400&height=400&seq=prod-eiffel-001&orientation=squarish',
        sizes: [
          { size: '15cm', price: 25000 },
          { size: '25cm', price: 40000 },
          { size: '35cm', price: 60000 },
          { size: '50cm', price: 85000 }
        ],
        complexity: 'Muy Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Puente Golden Gate',
        basePrice: 50000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20Golden%20Gate%20Bridge%20scale%20model%2C%20detailed%20suspension%20bridge%20structure%2C%20architectural%20engineering%20replica%2C%20landmark%20miniature&width=400&height=400&seq=prod-golden-gate-001&orientation=squarish',
        sizes: [
          { size: '30cm', price: 50000 },
          { size: '50cm', price: 75000 },
          { size: '75cm', price: 110000 }
        ],
        complexity: 'Muy Alta',
        stock: 'Archivo disponible'
      }
    ]
  },
  lamparas: {
    title: 'Lámparas',
    emoji: '💡',
    description: 'Iluminación artística personalizada y única',
    heroImage: 'https://readdy.ai/api/search-image?query=Collection%20of%20custom%203D%20printed%20artistic%20lamps%20and%20lighting%20fixtures%2C%20modern%20design%2C%20creative%20illumination%2C%20contemporary%20home%20decor%2C%20elegant%20lighting%20solutions&width=1200&height=600&seq=hero-lamparas-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Lámpara Geométrica Moderna',
        basePrice: 38000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20geometric%20modern%20lamp%20with%20intricate%20pattern%20design%2C%20contemporary%20lighting%20fixture%2C%20artistic%20home%20decor%2C%20elegant%20illumination&width=400&height=400&seq=prod-lamp-geometric-001&orientation=squarish',
        sizes: [
          { size: '20cm', price: 30000 },
          { size: '30cm', price: 38000 },
          { size: '40cm', price: 50000 },
          { size: '50cm', price: 65000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Lámpara Luna Realista',
        basePrice: 42000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20realistic%20moon%20lamp%20with%20detailed%20lunar%20surface%20texture%2C%20ambient%20lighting%2C%20space%20themed%20decor%2C%20night%20light&width=400&height=400&seq=prod-lamp-moon-001&orientation=squarish',
        sizes: [
          { size: '15cm', price: 35000 },
          { size: '20cm', price: 42000 },
          { size: '25cm', price: 55000 },
          { size: '30cm', price: 70000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Lámpara Floral Artística',
        basePrice: 45000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20artistic%20floral%20lamp%20with%20delicate%20flower%20patterns%2C%20organic%20design%2C%20decorative%20lighting%2C%20botanical%20home%20decor&width=400&height=400&seq=prod-lamp-floral-001&orientation=squarish',
        sizes: [
          { size: '25cm', price: 40000 },
          { size: '35cm', price: 45000 },
          { size: '45cm', price: 60000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      }
    ]
  },
  prototipos: {
    title: 'Prototipos',
    emoji: '⚙️',
    description: 'Desarrollo de productos y prototipos funcionales',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%203D%20printed%20prototypes%20and%20product%20development%20models%2C%20engineering%20precision%2C%20industrial%20design%2C%20technical%20accuracy%2C%20modern%20manufacturing%20showcase&width=1200&height=600&seq=hero-prototipos-001&orientation=landscape',
    products: [
      {
        id: 1,
        name: 'Prototipo Funcional Básico',
        basePrice: 25000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20basic%20functional%20prototype%20model%2C%20engineering%20design%2C%20product%20development%2C%20technical%20precision%2C%20industrial%20quality&width=400&height=400&seq=prod-proto-basic-001&orientation=squarish',
        sizes: [
          { size: 'Pequeño', price: 25000 },
          { size: 'Mediano', price: 40000 },
          { size: 'Grande', price: 60000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      },
      {
        id: 2,
        name: 'Engranajes y Mecanismos',
        basePrice: 35000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20gears%20and%20mechanical%20components%2C%20precision%20engineering%2C%20functional%20mechanisms%2C%20technical%20parts%2C%20industrial%20prototyping&width=400&height=400&seq=prod-gears-001&orientation=squarish',
        sizes: [
          { size: 'Set Básico', price: 30000 },
          { size: 'Set Completo', price: 35000 },
          { size: 'Set Avanzado', price: 50000 }
        ],
        complexity: 'Alta',
        stock: 'Archivo disponible'
      },
      {
        id: 3,
        name: 'Carcasa Electrónica',
        basePrice: 28000,
        image: 'https://readdy.ai/api/search-image?query=3D%20printed%20electronic%20enclosure%20prototype%2C%20device%20housing%2C%20technical%20precision%2C%20product%20development%2C%20industrial%20design&width=400&height=400&seq=prod-enclosure-001&orientation=squarish',
        sizes: [
          { size: '5x5cm', price: 20000 },
          { size: '10x10cm', price: 28000 },
          { size: '15x15cm', price: 40000 },
          { size: '20x20cm', price: 55000 }
        ],
        complexity: 'Media',
        stock: 'Archivo disponible'
      }
    ]
  }
};

export default function CategoryDetail({ categorySlug }: { categorySlug: string }) {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('Color base');
  const [showSuccess, setShowSuccess] = useState(false);

  const category = categoryData[categorySlug as keyof typeof categoryData];

  if (!category) {
    return <div>Categoría no encontrada</div>;
  }

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
        className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center flex items-center justify-center"
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
