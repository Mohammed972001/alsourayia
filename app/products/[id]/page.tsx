import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsDetails } from '@/data/products';
import { getProductById } from '@/lib/products';
import { Navigation } from '@/components/Navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

type Props = {
    params: Promise<{ id: string }>;
};

// Pre-render all product pages at build time
export function generateStaticParams() {
    return productsDetails.map((product) => ({
        id: product.id,
    }));
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = productsDetails.find((p) => p.id === id);

    if (!product) {
        return { title: 'المنتج غير موجود' };
    }

    return {
        title: product.title,
        description: product.metaDescription,
        keywords: product.keywords.join(', '),
        openGraph: {
            title: product.title,
            description: product.metaDescription,
            images: product.images[0]
                ? [{ url: product.images[0], width: 800, height: 600, alt: product.title }]
                : [],
            type: 'website',
            locale: 'ar_SA',
            siteName: 'موكيت ومفروشات السريع',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.metaDescription,
            images: product.images[0] ? [product.images[0]] : [],
        },
        alternates: {
            canonical: `${baseUrl}/products/${product.id}`,
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <ProductDetail productId={product.id} />
            <Footer />
            <FloatingButtons />
        </div>
    );
}
