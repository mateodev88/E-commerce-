import React from 'react';
import { imageMap } from "../../assets/imageMap";

export default function CartItem({ product, quantity, increment, decrement, remove }) {
  const resolvedImage = imageMap[product.image] ?? product.image;
  const itemSubtotal = Number(product.price) * Number(quantity);

  return (
    <article className="p-4 flex gap-4 items-center hover:bg-gray-50 transition-colors">
      <img
        src={resolvedImage}
        alt={product.title}
        className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 font-medium">${Number(product.price).toFixed(2)} c/u</p>
        <p className="text-sm font-bold text-blue-600 mt-1">
          Subtotal: ${itemSubtotal.toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => decrement(product.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:text-blue-600 transition-colors"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-bold text-gray-700">{quantity}</span>
        <button
          type="button"
          onClick={() => increment(product.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:text-blue-600 transition-colors"
        >
          +
        </button>
      </div>
      
      <button
        type="button"
        onClick={() => remove(product.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Eliminar producto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </article>
  );
}
