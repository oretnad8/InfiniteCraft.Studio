'use client';

import { useState, useEffect } from 'react';

interface Category {
    _id: string;
    name: string;
    emoji: string;
    description: string;
    slug: string;
    image: string;
}

export default function CategoriesTab() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        emoji: '',
        description: '',
        slug: '',
        image: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

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
            ? `http://localhost:4001/categories/${editingId}`
            : 'http://localhost:4001/categories';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchCategories();
                setFormData({ name: '', emoji: '', description: '', slug: '', image: '' });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleEdit = (cat: Category) => {
        setFormData({
            name: cat.name,
            emoji: cat.emoji,
            description: cat.description,
            slug: cat.slug,
            image: cat.image
        });
        setEditingId(cat._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
        try {
            await fetch(`http://localhost:4001/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
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
                        type="text"
                        placeholder="Slug (url-amigable)"
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Emoji"
                        value={formData.emoji}
                        onChange={e => setFormData({ ...formData, emoji: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="URL Imagen"
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
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
                    <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setFormData({ name: '', emoji: '', description: '', slug: '', image: '' }); }}
                            className="md:col-span-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                    <div key={cat._id} className="bg-white p-4 rounded-xl shadow border flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{cat.emoji}</span>
                                <h4 className="font-bold">{cat.name}</h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">/{cat.slug}</p>
                            <p className="text-sm text-gray-600">{cat.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800">
                                ✏️
                            </button>
                            <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:text-red-800">
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
