import photo1 from './assets/waka-sopro-pa10000.jpg';
import photo2 from './assets/Waka-soPro-20000.jpg';

/** @typedef {{ id: string; category: string; name: string; details: string; price: string; images: string[] }} Product */

/** Обе фотографии; при secondFirst сверху в стеке ведёт второе фото */
function bothPhotos(secondFirst) {
  return secondFirst ? [photo2, photo1] : [photo1, photo2];
}

/** @type {Product[]} */
export const products = [
  {
    id: 'waka-sopro-pa10000',
    category: 'Одноразка',
    name: 'WAKA SoPro PA10000',
    details: 'Вкус: Berry Ice • 20 мг',
    price: '1 390 ₽',
    images: bothPhotos(false),
  },
  {
    id: 'waka-smash-6000',
    category: 'Одноразка',
    name: 'WAKA Smash 6000',
    details: 'Вкус: Mango Peach • 20 мг',
    price: '1 090 ₽',
    images: bothPhotos(true),
  },
  {
    id: 'smoant-pasito-3',
    category: 'Pod-система',
    name: 'Smoant Pasito 3',
    details: 'Мощность: до 50W • Картридж 3 мл',
    price: '3 990 ₽',
    images: bothPhotos(false),
  },
  {
    id: 'chaser-grape-soda',
    category: 'Жидкость',
    name: 'Chaser Salt Grape Soda 30 мл',
    details: 'Крепость: 20 мг • Соотношение 50/50',
    price: '790 ₽',
    images: bothPhotos(true),
  },
  {
    id: 'smoant-cotton-rope',
    category: 'Аксессуар',
    name: 'Smoant хлопок (веревка)',
    details: 'Для намотки и обслуживания',
    price: '350 ₽',
    images: bothPhotos(false),
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
