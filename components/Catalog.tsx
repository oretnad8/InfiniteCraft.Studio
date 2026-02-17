
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  emoji: string;
  description: string;
  slug: string;
  image: string;
}

export default function Catalog() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_PRODUCTS;
        console.log('API URL:', apiUrl);

        if (!apiUrl) {
          console.error('Environment variable NEXT_PUBLIC_API_PRODUCTS is not defined');
          throw new Error('API URL is missing');
        }

        const res = await fetch(`${apiUrl}/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section id="catalogo" className="py-[35px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p>Cargando catálogo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalogo" className="py-[35px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-[30px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">CATÁLOGO</h2>
          <p className="text-lg sm:text-xl text-gray-600">Descubre todas las posibilidades de creación</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No hay categorías disponibles aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <Link href={`/categoria/${category.slug}`} key={category._id || index}>
                <div
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden h-full flex flex-col"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={category.name}
                      className={`w-full h-36 sm:h-48 object-cover transition-transform duration-300 ${hoveredCard === index ? 'scale-110' : 'scale-100'
                        }`}
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-2xl sm:text-3xl bg-white/90 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      {category.emoji || '📦'}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

