import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import CartItem from "../../components/molecules/CartItem";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19; // IVA 19%
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00; // Envío gratis si > $100
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xl shadow-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Parece que aún no has añadido nada a tu bolsa. ¡Explora nuestra colección y encuentra algo especial!
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Explorar Productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">Tu Bolsa de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          {items.map(({ product, quantity }) => (
            <CartItem 
              key={product.id}
              product={product}
              quantity={quantity}
              increment={incrementItem}
              decrement={decrementItem}
              remove={removeItem}
            />
          ))}
        </div>

        <aside className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-50">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de Orden</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>IVA (19%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                {shipping === 0 ? (
                  <span className="font-bold text-green-500 uppercase text-xs bg-green-50 px-2 py-1 rounded">Gratis</span>
                ) : (
                  <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                )}
              </div>
              
              {shipping > 0 && (
                <p className="text-[10px] text-blue-500 bg-blue-50 p-2 rounded-lg leading-tight">
                  💡 ¡Agrega ${(100 - subtotal).toFixed(2)} más para obtener envío gratis!
                </p>
              )}
            </div>

            <div className="border-t border-dashed border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-medium">Total Estimado</span>
                <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full inline-flex justify-center items-center px-6 py-4 rounded-2xl bg-primary text-white font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Completar Compra
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              Pago 100% seguro con SSL y cifrado de datos.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

