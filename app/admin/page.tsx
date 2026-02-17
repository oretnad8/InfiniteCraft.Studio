'use client';

import { useState } from 'react';
import OrdersTab from '@/components/admin/OrdersTab';
import ProductsTab from '@/components/admin/ProductsTab';
import CategoriesTab from '@/components/admin/CategoriesTab';

const ADMIN_PASSWORD = "admin123";

type Tab = 'orders' | 'products' | 'categories';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('orders');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Acceso Admin</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-red-500 outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel de Administración</h1>

                    <div className="flex space-x-2 border-b">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'orders'
                                    ? 'border-b-2 border-red-600 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <i className="ri-list-check mr-2"></i>Pedidos
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'products'
                                    ? 'border-b-2 border-red-600 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <i className="ri-store-2-line mr-2"></i>Productos
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'categories'
                                    ? 'border-b-2 border-red-600 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <i className="ri-folder-open-line mr-2"></i>Categorías
                        </button>
                    </div>
                </header>

                <main>
                    {activeTab === 'orders' && <OrdersTab />}
                    {activeTab === 'products' && <ProductsTab />}
                    {activeTab === 'categories' && <CategoriesTab />}
                </main>
            </div>
        </div>
    );
}
