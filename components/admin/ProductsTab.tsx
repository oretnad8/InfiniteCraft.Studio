'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types'; // Assuming types/index.ts has Product

// Extend Product interface if necessary or use as is
// We need a category field for products, let's assume it's a string (slug or ID)

export default function ProductsTab() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]); // Fetch to show dropdown
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        size: '',
        finish: '',
        category: '', // Slug or ID
        imageUrl: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:4001/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:4001/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:4001/products/${editingId}`
            : 'http://localhost:4001/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchProducts();
                setFormData({ name: '', price: 0, description: '', size: '', finish: '', category: '', imageUrl: '' });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (prod: Product & { category?: string; imageUrl?: string }) => {
        setFormData({
            name: prod.name,
            price: prod.price,
            description: prod.description || '',
            size: prod.size || '',
            finish: prod.finish || '',
            category: prod.category || '',
            imageUrl: prod.imageUrl || ''
        });
        setEditingId(prod._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;
        try {
            await fetch(`http://localhost:4001/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="p-2 border rounded"
                        required
                    />
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Categoría</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Tamaño (ej: 15cm)"
                        value={formData.size}
                        onChange={e => setFormData({ ...formData, size: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Acabado"
                        value={formData.finish}
                        onChange={e => setFormData({ ...formData, finish: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="URL Imagen"
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <div className="md:col-span-2">
                        <textarea
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 border rounded"
                            rows={3}
                        />
                    </div>
                    <button type="submit" className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setFormData({ name: '', price: 0, description: '', size: '', finish: '', category: '', imageUrl: '' }); }}
                            className="md:col-span-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(prod => (
                    <div key={prod._id} className="bg-white p-4 rounded-xl shadow border flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg">{prod.name}</h4>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${prod.price.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{prod.category || 'Sin categoría'}</p>
                            {prod.imageUrl && <img src={prod.imageUrl} alt={prod.name} className="w-full h-32 object-cover rounded mb-2" />}
                            <p className="text-sm text-gray-600 mb-2">{prod.description}</p>
                            <div className="text-xs text-gray-500">
                                {prod.size && <span>📏 {prod.size} </span>}
                                {prod.finish && <span>🎨 {prod.finish}</span>}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => handleEdit(prod)} className="flex-1 bg-blue-100 text-blue-700 py-1 rounded hover:bg-blue-200">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(prod._id)} className="flex-1 bg-red-100 text-red-700 py-1 rounded hover:bg-red-200">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
