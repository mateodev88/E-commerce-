import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00;
  const total = subtotal + tax + shipping;

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-12 shadow-2xl shadow-green-100/50">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">¡Pedido Confirmado!</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Gracias por tu compra, <span className="font-bold text-gray-900">{formData.fullName}</span>.<br />
            Hemos enviado un correo a <span className="font-medium text-primary">{formData.email}</span> con los detalles de tu orden.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Resumen de Entrega</h4>
            <p className="text-gray-900 font-medium">{formData.address}</p>
            <p className="text-gray-500">{formData.city}</p>
          </div>
          <Link to="/gallery">
            <Button variant="primary" className="px-10 py-4 text-lg shadow-xl shadow-primary/20">
              Seguir Comprando
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">No hay productos en tu orden</h2>
          <Link to="/gallery">
            <Button variant="primary">Volver al Catálogo</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Finalizar Compra</h1>
        <Link to="/cart" className="text-primary font-bold hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al carrito
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Información de Envío
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                <Input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Email de Contacto</label>
                <Input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Entrega</label>
                <Input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle 123 #45-67"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
                <Input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bogotá"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Método de Pago
            </h3>
            <div className="p-4 border-2 border-primary bg-primary/5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-bold text-[10px] mr-4">CARD</div>
                <div>
                  <p className="font-bold text-gray-900">Tarjeta de Crédito / Débito</p>
                  <p className="text-xs text-gray-500">Paga de forma segura y rápida</p>
                </div>
              </div>
              <div className="w-6 h-6 border-4 border-primary rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4 px-2">
              Nota: Este es un sistema de demostración. No se realizará ningún cargo real.
            </p>
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-5 text-xl font-black shadow-2xl shadow-primary/30"
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando Pago..." : `Pagar $${total.toFixed(2)}`}
          </Button>
        </form>

        <aside className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tu Pedido</h3>
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">Cant: {quantity}</p>
                  </div>
                  <p className="text-sm font-black text-gray-900">${(Number(product.price) * Number(quantity)).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-50 pt-6 space-y-3">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>IVA (19%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Envío</span>
                <span className={shipping === 0 ? "text-green-500 font-bold" : ""}>
                  {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total Final</span>
                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

