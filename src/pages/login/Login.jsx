import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import smile from "../../assets/smile.png";
import { loginUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser(formData.email, formData.password);
      if (result.success) {
        setUser(result.user);
        navigate('/gallery');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100-64px)] bg-gray-50/50 p-6">
      <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
        
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <img src={smile} alt="Smile Icon" className="w-12 h-12 grayscale brightness-110" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">¡Hola de nuevo!</h1>
          <p className="text-gray-400 font-medium">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-sm font-medium animate-shake">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="py-4 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Contraseña</label>
              <a href="#" className="text-xs font-bold text-primary hover:underline">¿La olvidaste?</a>
            </div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="py-4 rounded-2xl"
            />
          </div>

          <div className="flex items-center space-x-3 px-1 py-2">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 border-2 border-gray-200 rounded-lg text-primary focus:ring-primary/20 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm font-bold text-gray-500 cursor-pointer select-none">
              Mantenerme conectado
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-5 text-xl font-black shadow-2xl shadow-primary/20 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Entrando...
              </div>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-400 font-medium">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
