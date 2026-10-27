import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsDetails } from '@/data/products';
import { Navigation } from '@/components/Navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { getProductWithDynamicImages } from '@/lib/products.server';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mokeet-elsuarye.com').replace(/\/$/, '');

type Props = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return productsDetails.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = productsDetails.find((p) => p.id === id);

    if (!product) {
        return { title: 'المنتج غير موجود' };
    }

    // The part before « - » is the display name and the page's H1 (lib/products.ts); it carries the
    // searched spelling of the ad keyword, so the <title> becomes «<keyword> في الرياض | brand»
    // (the brand comes once, from the title template in app/layout.tsx).
    const name = product.title.split(' - ')[0];
    // Google shows about 60 characters; «في الرياض» is dropped when the name plus the brand suffix
    // would exceed that (the city stays in the description and the H1 block).
    const withCity = `${name} في الرياض`;
    const title = `${withCity} | موكيت ومفروشات السريع`.length <= 60 ? withCity : name;

    return {
        title,
        description: product.metaDescription,
        keywords: product.keywords.join(', '),
        openGraph: {
            title: `${title} | موكيت ومفروشات السريع`,
            description: product.metaDescription,
            images: product.images[0]
                ? [{ url: product.images[0], width: 800, height: 600, alt: `${name} - موكيت ومفروشات السريع` }]
                : [],
            type: 'website',
            locale: 'ar_SA',
            siteName: 'موكيت ومفروشات السريع',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | موكيت ومفروشات السريع`,
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
    const product = getProductWithDynamicImages(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Navigation />
            <ProductDetail productId={product.id} dynamicGallery={product.gallery} />
            <Footer />
            <FloatingButtons message={`أريد الاستفسار عن ${product.name} من موكيت ومفروشات السريع`} />
        </div>
    );
}
