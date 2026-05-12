import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCartStore from '../../../store/cartStore';
import useAuthStore from '../../../store/authStore';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-3xl font-black group"
          >
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              MyStore
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-10">
            <li>
              <Link
                to="/gallery"
                className={`text-sm font-black uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
                  isActive('/gallery')
                    ? 'text-primary border-primary'
                    : 'text-gray-400 border-transparent hover:text-gray-900'
                }`}
              >
                Catálogo
              </Link>
            </li>
            
            <li>
              <Link
                to="/cart"
                className={`flex items-center gap-2 group relative ${
                  isActive('/cart') ? 'text-primary' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className={`absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transition-transform ${isBumping ? 'scale-125' : 'scale-100'}`}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-sm font-black uppercase tracking-widest">Carrito</span>
              </Link>
            </li>

            {user ? (
              <li className="flex items-center gap-6 pl-6 border-l border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-purple-100 rounded-xl flex items-center justify-center text-primary font-black shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-black text-gray-900 leading-tight truncate max-w-[100px]">{user.name}</p>
                    <p className="text-[10px] font-bold text-gray-400">Cliente VIP</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Cerrar sesión"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </li>
            ) : (
              <li className="flex items-center gap-4">
                <Link to="/login">
                  <button className="text-sm font-black text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-sm font-black bg-gray-900 text-white px-6 py-2.5 rounded-xl hover:bg-primary transition-all shadow-lg shadow-gray-200">
                    Únete
                  </button>
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50 border border-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

