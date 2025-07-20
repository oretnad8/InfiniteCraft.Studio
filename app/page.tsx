'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import Gallery from '../components/Gallery';
import Process from '../components/Process';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Catalog />
      <Gallery />
      <Process />
      <Footer />
      {/* Botón CTA */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Creamos tu figura personalizada desde cero basada en tus fotos
          </p>
          <Link href="/personalizacion">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap">
              Crear Mi Figura Personalizada
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}