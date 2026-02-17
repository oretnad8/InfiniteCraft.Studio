'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';

const API_URL = "http://localhost:4000/api/orders";

export default function OrdersTab() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`${API_URL}/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                const updatedOrder = await res.json();
                setOrders(prev => prev.map(o => o._id === updatedOrder._id ? updatedOrder : o));
                if (selectedOrder?._id === orderId) {
                    setSelectedOrder(updatedOrder);
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Listado de Pedidos */}
            <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex justify-between items-center">
                    Pedidos Pendientes
                    <button onClick={fetchOrders} className="text-sm text-blue-600 hover:text-blue-800">
                        <i className="ri-refresh-line"></i> Reload
                    </button>
                </h2>
                <div className="space-y-3">
                    {loading ? (
                        <p className="text-gray-500">Cargando...</p>
                    ) : orders.map(order => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className={`bg-white p-4 rounded-lg shadow cursor-pointer border-l-4 transition-all ${selectedOrder?._id === order._id ? 'border-red-500 ring-2 ring-red-100' : 'border-transparent hover:shadow-md'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-900">#{order._id.slice(-6)}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                                    order.status === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{order.customer.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(order.createdAt).toLocaleDateString()} - {order.items.length} items
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detalle del Pedido */}
            <div className="lg:col-span-2">
                {selectedOrder ? (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        {/* Header del detalle */}
                        <div className="flex justify-between items-start border-b pb-6 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Pedido #{selectedOrder._id}
                                </h2>
                                <div className="flex gap-4 text-sm text-gray-600">
                                    <p><i className="ri-calendar-line mr-1"></i> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                    <p><i className="ri-wallet-line mr-1"></i> {selectedOrder.customer.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateStatus(selectedOrder._id, 'En Proceso')}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
                                >
                                    En Proceso
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedOrder._id, 'Completado')}
                                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium"
                                >
                                    Completar
                                </button>
                            </div>
                        </div>

                        {/* Info Cliente */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Cliente</h3>
                                <div className="space-y-1 text-sm text-gray-700">
                                    <p><span className="font-medium">Nombre:</span> {selectedOrder.customer.name}</p>
                                    <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                                    <p><span className="font-medium">Teléfono:</span> {selectedOrder.customer.phone}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Envío</h3>
                                <div className="space-y-1 text-sm text-gray-700">
                                    <p><span className="font-medium">Dirección:</span> {selectedOrder.customer.address}</p>
                                    <p><span className="font-medium">Ciudad:</span> {selectedOrder.customer.city}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items y Fotos */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg text-gray-900">Items y Referencias</h3>
                            {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {item.size} - {item.finish} - x{item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">Tipo: {item.type}</p>
                                        </div>
                                        <p className="font-bold text-gray-900">${item.price.toLocaleString()}</p>
                                    </div>

                                    {/* Galería de imágenes */}
                                    {item.type === 'custom' && item.images && item.images.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                Referencias Visuales
                                            </p>
                                            <div className="flex gap-4 overflow-x-auto pb-2">
                                                {item.images.map((img, i) => (
                                                    <div key={i} className="flex-shrink-0 relative group">
                                                        <img
                                                            src={img.startsWith('http') ? img : `http://localhost:4000${img}`}
                                                            alt={`Ref ${i + 1}`}
                                                            className="h-32 w-32 object-cover rounded-lg border hover:scale-105 transition-transform"
                                                        />
                                                        <a
                                                            href={img.startsWith('http') ? img : `http://localhost:4000${img}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center"
                                                        >
                                                            <i className="ri-zoom-in-line text-white opacity-0 group-hover:opacity-100 text-2xl drop-shadow-lg"></i>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        <div>
                            <i className="ri-file-list-3-line text-6xl mb-4 block text-gray-300"></i>
                            <p>Selecciona un pedido para ver los detalles</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
