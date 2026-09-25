export const PHONE_DISPLAY = '0550101867';
export const PHONE_TEL = 'tel:+966550101867';
export const WHATSAPP_NUMBER = '966550101867';
export const ADDRESS = 'مخرج ٢٢ حراج بن قاسم القديم سوق العرب الدولي، الرياض';
export const MAPS_URL = 'https://www.google.com/maps?q=24.596556,46.730583';

export function whatsappLink(message = 'السلام عليكم، أريد الاستفسار عن منتجات الموكيت والمفروشات') {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
