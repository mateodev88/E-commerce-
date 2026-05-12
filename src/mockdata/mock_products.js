import item_01 from "../assets/01_item.jpg";
import item_02 from "../assets/02_item.jpg";
import item_03 from "../assets/03_item.jpg";
import item_04 from "../assets/04_item.jpg";
import item_05 from "../assets/05_item.jpg";

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    title: "Bolso de Cuero Genuino", 
    price: 19.99, 
    description: "Bolso de cuero genuino con múltiples compartimentos. Ideal para uso diario, con correa ajustable y cierre de cremallera de alta resistencia.", 
    category: "women's clothing",
    image: item_01,
    rating: { rate: 4.5, count: 120 }
  },
  { 
    id: 2, 
    title: "Morral Ergonómico", 
    price: 24.99, 
    description: "Morral espacioso con diseño ergonómico y acolchado en la espalda. Perfecto para estudiantes y viajeros, con bolsillos laterales para botellas.", 
    category: "men's clothing",
    image: item_02,
    rating: { rate: 4.8, count: 85 }
  },
  { 
    id: 3, 
    title: "Cartera Minimalista", 
    price: 12.50, 
    description: "Cartera compacta de cuero sintético con ranuras para tarjetas y billetes. Diseño minimalista y elegante para el día a día.", 
    category: "women's clothing",
    image: item_03,
    rating: { rate: 4.2, count: 300 }
  },
  { 
    id: 4, 
    title: "Maletín Ejecutivo Premium", 
    price: 45.00, 
    description: "Maletín ejecutivo de piel premium con compartimento acolchado para laptop de hasta 15\". Incluye cierre de combinación para mayor seguridad.", 
    category: "men's clothing",
    image: item_04,
    rating: { rate: 4.9, count: 45 }
  },
  { 
    id: 5, 
    title: "Cartera Italiana de Diseñador", 
    price: 100.00, 
    description: "Cartera de diseñador en cuero italiano de alta gama, con herrajes dorados y forro interior de seda. Edición limitada para coleccionistas.", 
    category: "jewelery",
    image: item_05,
    rating: { rate: 3.8, count: 12 }
  },
];

export default MOCK_PRODUCTS;