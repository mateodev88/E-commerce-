import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              MyStore
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed">
              La mejor selección de productos digitales y físicos con envíos a todo el mundo. Calidad garantizada.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'github'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-contain" />
                  {/* Nota: En un proyecto real usaríamos iconos SVG aquí */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/gallery" className="text-gray-500 font-bold hover:text-primary transition-colors">Catálogo</Link></li>
              <li><Link to="/cart" className="text-gray-500 font-bold hover:text-primary transition-colors">Mi Carrito</Link></li>
              <li><Link to="/profile" className="text-gray-500 font-bold hover:text-primary transition-colors">Mi Cuenta</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-gray-500 font-bold hover:text-primary transition-colors">Contacto</Link></li>
              <li><a href="#" className="text-gray-500 font-bold hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-500 font-bold hover:text-primary transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-gray-500 font-medium mb-4 text-sm">Suscríbete para recibir ofertas exclusivas.</p>
            <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-transparent border-none focus:ring-0 text-sm font-bold flex-1 px-3"
              />
              <button className="bg-gray-900 text-white p-2 rounded-xl hover:bg-primary transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
          <p>© 2026 MyStore. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-900">Privacidad</a>
            <a href="#" className="hover:text-gray-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
