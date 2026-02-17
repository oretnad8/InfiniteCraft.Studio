export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    size: string;
    finish: string;
    stock: number;
    category: string;
    imageUrl: string;
}

export interface CartItem {
    id: string;
    name: string;
    size: string;
    finish: string;
    price: number;
    quantity: number;
    type: 'stock' | 'custom';
    image?: string; // URL or base64 for display
    images?: string[]; // Array of image URLs/Base64 strings
    category?: string;
    comments?: string;
}

export interface OrderCustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
}

export interface Order {
    _id: string;
    customer: OrderCustomer;
    items: CartItem[];
    totalAmount: number;
    status: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
    orderImages: string[];
    createdAt: string;
}
