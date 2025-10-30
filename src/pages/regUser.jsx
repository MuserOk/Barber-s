import { useState } from 'react';
import React from 'react'


export default function FormRegUser() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    comoConociste: '',
    terminos: false,
    puntos: false
  });

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Formulario enviado:', formData);
      alert('¡Registro exitoso! Bienvenido a nuestra barbería.');
      // Reset form
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        comoConociste: '',
        terminos: false,
        puntos: false
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    
      <div className="max-w-2xl mx-auto h-screen overflow-y-auto overflow-x-scroll bg-[#1a1802]">

        <div className="bg-white shadow-lg overflow-hidden">
          {/* Banner superior */}
          <div className="bg-[#1a1802] text-white py-4 px-6">
            <h2 className="text-xl font-semibold">Crea tu Cuenta</h2>
            <p className="text-stone-300 text-sm">
              Todos los campos marcados con <span className="text-amber-400">*</span> son obligatorios
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-[#bbb9a6]">
            {/* Sección 1: Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-stone-700 mb-4 border-b pb-2">
                1. Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Nombre ó Nick <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.nombre ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="El Braian"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Correo Electrónico <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.email ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="será tu usuario para ingresar"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Teléfono / Celular <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.telefono ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="Para notificaciones y recordatorios"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                  )}
                </div>

              </div>
            </div>

            {/* Sección 2: Seguridad */}
            <div>
              <h3 className="text-lg font-semibold text-stone-700 mb-4 border-b pb-2">
                2. Seguridad de tu Cuenta
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Crear Contraseña <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.password ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Confirmar Contraseña <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="Repite tu contraseña"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>


            {/* Sección 3: Términos y Beneficios */}
            <div>
              <h3 className="text-lg font-semibold text-stone-700 mb-4 border-b pb-2">
                3. Términos y Beneficios
              </h3>
              
              <div className="space-y-3">
                <div className={`p-4 rounded-lg border ${
                  errors.terminos ? 'border-red-500 bg-red-50' : 'border-stone-300'
                }`}>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="terminos"
                      checked={formData.terminos}
                      onChange={handleChange}
                      className="mt-1 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-stone-700">
                      Acepto los <a href="#" className="text-amber-600 hover:text-amber-700 underline">Términos del Servicio</a> y la <a href="#" className="text-amber-600 hover:text-amber-700 underline">Política de Privacidad</a>
                    </span>
                  </label>
                  {errors.terminos && (
                    <p className="text-red-500 text-sm mt-2">{errors.terminos}</p>
                  )}
                </div>

                <div className={`p-4 rounded-lg border ${
                  errors.puntos ? 'border-red-500 bg-red-50' : 'border-amber-200 bg-amber-50'
                }`}>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="puntos"
                      checked={formData.puntos}
                      onChange={handleChange}
                      className="mt-1 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-stone-700">
                      <span className="font-semibold">¡Sí, acepto!</span> Deseo acumular Puntos Estilo, recibir beneficios exclusivos y que se guarden las fotos de mis últimos 4 cortes en mi perfil.
                    </span>
                  </label>
                  {errors.puntos && (
                    <p className="text-red-500 text-sm mt-2">{errors.puntos}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                REGISTRARME
              </button>
            </div>

            {/* Enlace para login */}
            <div className="text-center pt-4 border-t border-stone-200">
              <p className="text-stone-600">
                <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  Inicia Sesión Aquí
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Información de beneficios */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center bg-[#1a1802]">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-amber-500 text-lg font-bold">🎯</div>
            <h4 className="font-semibold text-stone-800">Acumula Puntos</h4>
            <p className="text-sm text-stone-600">Gana puntos por cada visita</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-amber-500 text-lg font-bold">📸</div>
            <h4 className="font-semibold text-stone-800">Historial Visual</h4>
            <p className="text-sm text-stone-600">Tus últimos 4 cortes guardados</p>
          </div>

        </div>
      </div>
    
  );
};


