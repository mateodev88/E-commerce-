import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerFullUser } from "../../services/authService";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    try {
      const respuesta = await registerFullUser(formData);
      if (respuesta.success) {
        navigate('/login');
      } else {
        setError(respuesta.error);
      }
    } catch (err) {
      setError('Error al registrar usuario. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center bg-gray-50/50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="lg:flex">
          {/* Lado Izquierdo: Mensaje de Bienvenida */}
          <div className="hidden lg:flex lg:w-1/3 bg-primary p-12 flex-col justify-between text-white">
            <div>
              <h2 className="text-4xl font-black mb-6">Únete a MyStore</h2>
              <p className="text-primary-foreground/80 font-medium leading-relaxed">
                Crea tu cuenta y empieza a disfrutar de la mejor selección de productos con envíos prioritarios.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">✓</div>
                <p className="text-sm font-bold">Envíos rápidos</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">✓</div>
                <p className="text-sm font-bold">Soporte 24/7</p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Formulario */}
          <div className="w-full lg:w-2/3 p-10 lg:p-16">
            <header className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Crear cuenta</h2>
              <p className="text-gray-400 font-medium mt-1">Completa tus datos para empezar</p>
            </header>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <Input
                    name="name"
                    required
                    placeholder="Ej. Juan Pérez"
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="correo@ejemplo.com"
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Celular</label>
                  <Input
                    type="tel"
                    name="cellphone"
                    placeholder="+57 300..."
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Dirección</label>
                  <Input
                    name="address"
                    placeholder="Calle 123..."
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Contraseña</label>
                  <Input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest ml-1">Confirmar</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="py-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-6">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-5 text-xl font-black shadow-2xl shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Registrarse Ahora"}
                </Button>

                <p className="text-center text-gray-400 font-medium">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
