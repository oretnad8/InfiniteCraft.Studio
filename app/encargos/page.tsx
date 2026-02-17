'use client';
import { redirect } from 'next/navigation';

export default function EncargosRedirect() {
    redirect('/admin');
    return null;
}
