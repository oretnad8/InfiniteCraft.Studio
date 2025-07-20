
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryDetail categorySlug={params.slug} />;
}
