const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/infinitecraft_products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const products = [
    // PERSONAJES
    {
        name: 'Goku Ultra Instinto',
        price: 45000,
        description: 'Figura detallada de Goku en su estado Ultra Instinto dominado.',
        size: '25cm',
        finish: 'Pintado a mano',
        category: 'personajes',
        imageUrl: 'https://readdy.ai/api/search-image?query=Goku%20Ultra%20Instinct%20action%20figure%2C%20highly%20detailed%203D%20print%2C%20dynamic%20pose%2C%20silver%20hair%2C%20battle%20damage%2C%20professional%20product%20photography%2C%20studio%20lighting%2C%20white%20background&width=400&height=400&seq=prod-goku-001&orientation=square'
    },
    {
        name: 'Naruto Uzumaki Sage Mode',
        price: 42000,
        description: 'Estatua de Naruto en modo sabio con capa.',
        size: '22cm',
        finish: 'Pintado a mano',
        category: 'personajes',
        imageUrl: 'https://readdy.ai/api/search-image?query=Naruto%20Uzumaki%20Sage%20Mode%20figure%2C%20detailed%203D%20print%2C%20anime%20collectible%2C%20orange%20details%2C%20scroll%20on%20back%2C%20professional%20photography%2C%20clean%20background&width=400&height=400&seq=prod-naruto-001&orientation=square'
    },
    {
        name: 'Spider-Man Miles Morales',
        price: 38000,
        description: 'Figura de acción dinámica de Miles Morales.',
        size: '20cm',
        finish: 'Pintado a mano',
        category: 'personajes',
        imageUrl: 'https://readdy.ai/api/search-image?query=Spider-Man%20Miles%20Morales%20action%20figure%2C%20dynamic%20web%20swinging%20pose%2C%20detailed%20suit%20texture%2C%203D%20printed%20collectible%2C%20studio%20lighting&width=400&height=400&seq=prod-spiderman-001&orientation=square'
    },
    {
        name: 'Darth Vader Bust',
        price: 35000,
        description: 'Busto detallado de Darth Vader.',
        size: '18cm',
        finish: 'Gris',
        category: 'personajes',
        imageUrl: 'https://readdy.ai/api/search-image?query=Darth%20Vader%20bust%203D%20print%2C%20high%20detail%20sculpture%2C%20dark%20side%2C%20star%20wars%20collectible%2C%20clay%20render%20style%2C%20dramatic%20lighting&width=400&height=400&seq=prod-vader-001&orientation=square'
    },

    // MASCOTAS
    {
        name: 'Bulldog Francés Estilizado',
        price: 25000,
        description: 'Figura geométrica low-poly de Bulldog Francés.',
        size: '15cm',
        finish: 'Blanco',
        category: 'mascotas',
        imageUrl: 'https://readdy.ai/api/search-image?query=Low%20poly%20French%20Bulldog%20figurine%2C%20geometric%20style%203D%20print%2C%20minimalist%20decor%2C%20white%20material%2C%20clean%20studio%20shot&width=400&height=400&seq=prod-dog-001&orientation=square'
    },
    {
        name: 'Gato Egipcio',
        price: 28000,
        description: 'Elegante estatua de gato estilo egipcio.',
        size: '20cm',
        finish: 'Negro',
        category: 'mascotas',
        imageUrl: 'https://readdy.ai/api/search-image?query=Egyptian%20cat%20statue%203D%20print%2C%20elegant%20pose%2C%20bastet%20style%2C%20black%20matte%20finish%2C%20mystical%20lighting%2C%20home%20decor&width=400&height=400&seq=prod-cat-001&orientation=square'
    },
    {
        name: 'Personalizado: Tu Perro',
        price: 55000,
        description: 'Réplica personalizada basada en fotos de tu mascota.',
        size: 'Variado',
        finish: 'Pintado a mano',
        category: 'mascotas',
        imageUrl: 'https://readdy.ai/api/search-image?query=Custom%20dog%20figurine%20painting%20process%2C%20artist%20desk%2C%20detailed%20brushes%2C%20pet%20replica%203D%20print%2C%20personalized%20gift&width=400&height=400&seq=prod-custom-pet-001&orientation=square'
    },

    // GAMING
    {
        name: 'Master Chief Helmet',
        price: 30000,
        description: 'Miniatura del casco de Master Chief.',
        size: '12cm',
        finish: 'Verde',
        category: 'gaming',
        imageUrl: 'https://readdy.ai/api/search-image?query=Master%20Chief%20helmet%20miniature%203D%20print%2C%20Halo%20collectible%2C%20detailed%20visor%2C%20weathered%20armor%20texture%2C%20gaming%20memorabilia&width=400&height=400&seq=prod-halo-001&orientation=square'
    },
    {
        name: 'Among Us Crewmate',
        price: 15000,
        description: 'Tripulante de Among Us (colores variados).',
        size: '10cm',
        finish: 'Pintado a mano',
        category: 'gaming',
        imageUrl: 'https://readdy.ai/api/search-image?query=Among%20Us%20crewmate%203D%20print%20figure%2C%20red%20color%2C%20cute%20desk%20toy%2C%20smooth%20finish%2C%20gaming%20pop%20culture&width=400&height=400&seq=prod-amongus-001&orientation=square'
    },
    {
        name: 'Zelda Master Sword',
        price: 40000,
        description: 'Réplica de la Espada Maestra con pedestal.',
        size: '30cm',
        finish: 'Pintado a mano',
        category: 'gaming',
        imageUrl: 'https://readdy.ai/api/search-image?query=Zelda%20Master%20Sword%20in%20pedestal%203D%20print%2C%20legend%20of%20zelda%20collectible%2C%20fantasy%20weapon%20replica%2C%20detailed%20hilt&width=400&height=400&seq=prod-zelda-001&orientation=square'
    },

    // MARCOS
    {
        name: 'Marco Barroco Ovalado',
        price: 22000,
        description: 'Marco decorativo estilo barroco.',
        size: '20x15cm',
        finish: 'Dorado',
        category: 'marcos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Baroque%20style%20oval%20picture%20frame%203D%20print%2C%20ornate%20details%2C%20gold%20finish%2C%20antique%20look%2C%20wall%20decor&width=400&height=400&seq=prod-frame-001&orientation=square'
    },
    {
        name: 'Marco Geométrico Moderno',
        price: 18000,
        description: 'Diseño moderno y minimalista para fotos.',
        size: '15x20cm',
        finish: 'Blanco',
        category: 'marcos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Modern%20geometric%20picture%20frame%203D%20print%2C%20minimalist%20design%2C%20clean%20lines%2C%20contemporary%20home%20decor%2C%20white%20matte&width=400&height=400&seq=prod-frame-002&orientation=square'
    },

    // VEHICULOS
    {
        name: 'Porsche 911 Turbo',
        price: 35000,
        description: 'Modelo a escala detallado de Porsche 911.',
        size: '1:24',
        finish: 'Gris',
        category: 'vehiculos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Porsche%20911%20Turbo%20scale%20model%203D%20print%2C%20automotive%20miniature%2C%20car%20enthusiast%20collectible%2C%20detailed%20curves&width=400&height=400&seq=prod-car-001&orientation=square'
    },
    {
        name: 'F1 Car 2024 Concept',
        price: 32000,
        description: 'Modelo conceptual de Fórmula 1.',
        size: '1:24',
        finish: 'Negro',
        category: 'vehiculos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Formula%201%20race%20car%20concept%203D%20print%2C%20aerodynamic%20design%2C%20motorsport%20miniature%2C%20sleek%20black%20finish&width=400&height=400&seq=prod-f1-001&orientation=square'
    },

    // MAQUETERIA
    {
        name: 'Edificio Residencial Moderno',
        price: 60000,
        description: 'Maqueta de edificio de apartamentos.',
        size: 'Escala 1:100',
        finish: 'Blanco',
        category: 'maqueteria',
        imageUrl: 'https://readdy.ai/api/search-image?query=Modern%20residential%20building%20architectural%20model%203D%20print%2C%20white%20scale%20model%2C%20architecture%20student%20project%2C%20detailed%20facade&width=400&height=400&seq=prod-arch-001&orientation=square'
    },
    {
        name: 'Set Árboles para Maquetas',
        price: 12000,
        description: 'Pack de 10 árboles estilizados para maquetas.',
        size: 'Variado',
        finish: 'Verde',
        category: 'maqueteria',
        imageUrl: 'https://readdy.ai/api/search-image?query=Low%20poly%20trees%20for%20architectural%20models%203D%20print%2C%20set%20of%20miniature%20trees%2C%20green%20plastic%2C%20diorama%20accessories&width=400&height=400&seq=prod-trees-001&orientation=square'
    },

    // LAMPARAS
    {
        name: 'Lámpara Luna',
        price: 28000,
        description: 'Litosfanía esférica con textura lunar (sin electrónica).',
        size: '15cm diam',
        finish: 'Blanco',
        category: 'lamparas',
        imageUrl: 'https://readdy.ai/api/search-image?query=Moon%20lamp%20lithophane%203D%20print%2C%20craters%20texture%2C%20spherical%20light%20shade%2C%20night%20light%20component%2C%20unlit&width=400&height=400&seq=prod-moon-001&orientation=square'
    },
    {
        name: 'Lámpara Voronoi',
        price: 25000,
        description: 'Pantalla de lámpara con patrón Voronoi orgánico.',
        size: '20cm alto',
        finish: 'Blanco',
        category: 'lamparas',
        imageUrl: 'https://readdy.ai/api/search-image?query=Voronoi%20pattern%20lamp%20shade%203D%20print%2C%20organic%20cellular%20structure%2C%20modern%20lighting%20design%2C%20intricate%20shadows&width=400&height=400&seq=prod-voronoi-001&orientation=square'
    },

    // PROTOTIPOS
    {
        name: 'Engranaje Helicoidal',
        price: 8000,
        description: 'Pieza técnica de reemplazo o prueba.',
        size: '5cm',
        finish: 'Gris',
        category: 'prototipos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Helical%20gear%203D%20print%2C%20mechanical%20part%2C%20engineering%20prototype%2C%20grey%20filament%2C%20macro%20shot&width=400&height=400&seq=prod-gear-001&orientation=square'
    },
    {
        name: 'Soporte de Auriculares',
        price: 15000,
        description: 'Diseño ergonómico para escritorio.',
        size: 'Estándar',
        finish: 'Negro',
        category: 'prototipos',
        imageUrl: 'https://readdy.ai/api/search-image?query=Headphone%20stand%203D%20print%2C%20modern%20desk%20accessory%2C%20functional%20design%2C%20black%20matte%2C%20gaming%20setup&width=400&height=400&seq=prod-stand-001&orientation=square'
    }
];

const seedProducts = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Products Seeded!');
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
};

seedProducts();
