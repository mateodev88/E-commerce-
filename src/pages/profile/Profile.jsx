import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';

export default function Profile() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || 'Calle 123 #45-67, Bogotá',
    phone: user?.cellphone || '+57 300 123 4567'
  });

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Aquí se implementaría la lógica de actualización en el store/backend
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-xl font-bold text-gray-500">Debes iniciar sesión para ver tu perfil</p>
        <Link to="/login">
          <Button variant="primary" className="px-10">Iniciar Sesión</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar: User Card */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary to-purple-600"></div>
            <div className="px-8 pb-8">
              <div className="relative -mt-12 mb-6">
                <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl">
                  <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center text-3xl font-black text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="absolute bottom-0 left-18 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-400 font-medium mb-6">{user.email}</p>
              
              <div className="flex flex-col gap-3">
                <Button 
                  variant={isEditing ? "primary" : "secondary"} 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full py-3"
                >
                  {isEditing ? "Cancelar Edición" : "Editar Perfil"}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  className="w-full py-3 text-red-500 border-red-100 hover:bg-red-50"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Membresía</h4>
            <p className="text-gray-900 font-black text-xl mb-2">Cliente Platinum</p>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Disfrutas de envíos gratis en todas tus compras superiores a $50.
            </p>
          </div>
        </aside>

        {/* Main Content: Tabs/Sections */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Section: My Info */}
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Información Personal</h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nombre</label>
                  <Input 
                    value={formData.name} 
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={!isEditing ? "bg-gray-50 border-transparent" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono</label>
                  <Input 
                    value={formData.phone} 
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={!isEditing ? "bg-gray-50 border-transparent" : ""}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Dirección de Envío</label>
                  <Input 
                    value={formData.address} 
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className={!isEditing ? "bg-gray-50 border-transparent" : ""}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary" className="px-10">Guardar Cambios</Button>
                </div>
              )}
            </form>
          </section>

          {/* Section: Recent Orders (Mock) */}
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900">Pedidos Recientes</h3>
              <span className="text-primary font-bold text-sm cursor-pointer hover:underline">Ver todo</span>
            </div>
            
            <div className="space-y-4">
              {[
                { id: '#ORD-7721', date: '12 May, 2026', total: '$124.50', status: 'Entregado' },
                { id: '#ORD-7688', date: '05 May, 2026', total: '$89.00', status: 'Procesando' }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-400 font-bold">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{order.total}</p>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      order.status === 'Entregado' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

