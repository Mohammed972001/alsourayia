'use client';

import { useState } from 'react';
import { products, getCategories } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export function ProductGallery() {
    const [selectedCategory, setSelectedCategory] = useState('الكل');

    const categories = getCategories();

    const filteredProducts = products.filter((product) => {
        return selectedCategory === 'الكل' || product.category === selectedCategory;
    });

    const getProductImageAlt = (product: typeof products[0]) => {
        return `${product.name} - ${product.category} من موكيت ومفروشات السريع الرياض`;
    };

    return (
        <section id="products" style={{ backgroundColor: '#d4d0c8', padding: '8px', fontFamily: 'Tahoma, sans-serif' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Products Window */}
                <div className="win-window">
                    <div className="win-titlebar">
                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
                            <rect x="1" y="2" width="12" height="10" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
                            <rect x="3" y="4" width="3" height="3" fill="#0000ff" />
                            <rect x="8" y="4" width="3" height="3" fill="#0000ff" />
                        </svg>
                        <span style={{ marginRight: '6px' }}>المنتجات - موكيت وسجاد ومفروشات</span>
                    </div>

                    {/* Toolbar */}
                    <div className="win-raised" style={{
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexWrap: 'wrap',
                        borderBottom: '1px solid #808080',
                    }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', marginLeft: '8px' }}>عرض حسب الفئة:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '2px 8px',
                                    fontSize: '11px',
                                    fontFamily: 'Tahoma, sans-serif',
                                    cursor: 'pointer',
                                    backgroundColor: selectedCategory === category ? '#000080' : '#d4d0c8',
                                    color: selectedCategory === category ? 'white' : '#000000',
                                    borderTop: selectedCategory === category ? '2px solid #000040' : '2px solid white',
                                    borderLeft: selectedCategory === category ? '2px solid #000040' : '2px solid white',
                                    borderBottom: selectedCategory === category ? '2px solid #0000cc' : '2px solid #808080',
                                    borderRight: selectedCategory === category ? '2px solid #0000cc' : '2px solid #808080',
                                }}
                            >
                                {category}
                            </button>
                        ))}
                        <div style={{ flex: 1 }} />
                        <span style={{ fontSize: '11px', color: '#808080' }}>
                            {filteredProducts.length} عنصر
                        </span>
                    </div>

                    <div style={{ padding: '8px' }}>
                        {/* Header */}
                        <div style={{
                            backgroundColor: '#000080',
                            color: 'white',
                            padding: '4px 12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            borderTop: '2px solid #0000cc',
                            borderLeft: '2px solid #0000cc',
                            borderBottom: '2px solid #000040',
                            borderRight: '2px solid #000040',
                        }}>
                            تشكيلة فريدة من السجاد والموكيت والمفروشات
                        </div>

                        {/* Products Grid - Explorer-style icons */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '6px',
                        }}>
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="win-raised"
                                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#e8e8e8';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
                                    }}
                                >
                                    {/* Product Image */}
                                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                        <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                                            <Image
                                                src={product.image}
                                                alt={getProductImageAlt(product)}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 220px"
                                                style={{ objectFit: 'cover' }}
                                                loading={index < 6 ? 'eager' : 'lazy'}
                                            />
                                            {/* Category badge */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '4px',
                                                right: '4px',
                                                backgroundColor: '#000080',
                                                color: 'white',
                                                fontSize: '10px',
                                                padding: '1px 4px',
                                                border: '1px solid #0000cc',
                                            }}>
                                                {product.category}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div style={{ padding: '6px 8px', backgroundColor: '#d4d0c8' }}>
                                        <div style={{ borderBottom: '1px solid #808080', paddingBottom: '4px', marginBottom: '4px' }}>
                                            <Link
                                                href={`/products/${product.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#000000',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    display: 'block',
                                                }}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000080'; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
                                            >
                                                {product.name}
                                            </Link>
                                        </div>
                                        <p style={{ fontSize: '11px', color: '#444444', marginBottom: '6px', lineHeight: 1.4 }}>
                                            {product.description.substring(0, 60)}...
                                        </p>

                                        {/* Color swatches */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '10px', color: '#666' }}>الألوان:</span>
                                            {product.colors.slice(0, 4).map((color) => (
                                                <span
                                                    key={color.name}
                                                    title={color.name}
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        backgroundColor: color.value,
                                                        border: '1px solid #808080',
                                                        display: 'inline-block',
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <Link
                                            href={`/products/${product.id}`}
                                            style={{
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                                padding: '3px 10px',
                                                backgroundColor: '#d4d0c8',
                                                color: '#000000',
                                                borderTop: '2px solid white',
                                                borderLeft: '2px solid white',
                                                borderBottom: '2px solid #808080',
                                                borderRight: '2px solid #808080',
                                                fontSize: '11px',
                                                fontFamily: 'Tahoma, sans-serif',
                                            }}
                                        >
                                            عرض التفاصيل
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={{
                            marginTop: '12px',
                            padding: '8px',
                            backgroundColor: '#ffffc0',
                            border: '1px solid #808000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px',
                        }}>
                            <div style={{ fontSize: '12px', color: '#000000' }}>
                                <strong>لم تجد ما تبحث عنه؟</strong> تواصل معنا مباشرة عبر واتساب
                            </div>
                            <a
                                href="https://wa.me/966541540047?text=السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    backgroundColor: '#008000',
                                    color: 'white',
                                    borderTop: '2px solid #00cc00',
                                    borderLeft: '2px solid #00cc00',
                                    borderBottom: '2px solid #004000',
                                    borderRight: '2px solid #004000',
                                    fontSize: '12px',
                                    fontFamily: 'Tahoma, sans-serif',
                                    fontWeight: 'bold',
                                }}
                            >
                                تواصل عبر واتساب
                            </a>
                        </div>
                    </div>

                    <div className="win-statusbar">
                        <span>{filteredProducts.length} منتج معروض</span>
                        <span style={{ borderLeft: '1px solid #808080', borderRight: '1px solid white', width: '2px', margin: '0 4px' }} />
                        <span>اضغط مرتين لعرض التفاصيل</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
