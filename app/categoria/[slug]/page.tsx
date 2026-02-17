
import CategoryDetail from './CategoryDetail';

export async function generateStaticParams() {
  return [
    { slug: 'personajes' },
    { slug: 'mascotas' },
    { slug: 'gaming' },
    { slug: 'marcos' },
    { slug: 'vehiculos' },
    { slug: 'maqueteria' },
    { slug: 'lamparas' },
    { slug: 'prototipos' },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryDetail categorySlug={slug} />;
}
