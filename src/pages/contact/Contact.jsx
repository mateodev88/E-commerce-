import { useState } from 'react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulación de envío
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Info Column */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Hablemos de tu próximo pedido.</h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              ¿Tienes dudas sobre un producto o necesitas asistencia técnica? Nuestro equipo está listo para ayudarte.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Email</h4>
                <p className="text-lg font-bold text-gray-600">soporte@mystore.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Ubicación</h4>
                <p className="text-lg font-bold text-gray-600">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white rounded-[3rem] border border-gray-100 p-10 lg:p-12 shadow-2xl shadow-gray-200/50">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">¡Mensaje Enviado!</h3>
              <p className="text-gray-500 font-medium">Te responderemos en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nombre</label>
                  <Input 
                    required 
                    placeholder="Tu nombre" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <Input 
                    type="email" 
                    required 
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Asunto</label>
                <Input 
                  required 
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mensaje</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-5 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-gray-700 font-medium"
                  placeholder="Escribe aquí tu mensaje..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full py-5 text-xl font-black shadow-xl shadow-primary/20">
                Enviar Mensaje
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
