import { useState } from 'react';


export default function RecPass(){
  const [step, setStep] = useState(1); // 1: Email, 2: Código, 3: Nueva contraseña
  const [formData, setFormData] = useState({
    email: '',
    recoveryCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.recoveryCode.trim()) {
      newErrors.recoveryCode = 'El código de recuperación es obligatorio';
    } else if (formData.recoveryCode.length !== 6) {
      newErrors.recoveryCode = 'El código debe tener 6 dígitos';
    }
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es obligatoria';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Mínimo 8 caracteres';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return newErrors;
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const newErrors = validateStep1();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simular envío de código
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
        alert(`Se ha enviado un código de recuperación a: ${formData.email}`);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    
    if (Object.keys(newErrors).length === 0) {
      // Aquí verificarías el código con el backend
      setStep(3);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    const newErrors = validateStep3();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simular actualización de contraseña
      setTimeout(() => {
        setIsLoading(false);
        alert('¡Contraseña actualizada correctamente! Ya puedes iniciar sesión.');
        // Redirigir al login
        // window.location.href = '/login';
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleResendCode = () => {
    alert('Se ha reenviado el código de recuperación a tu email.');
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-amber-500 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-100">
            Sigue los pasos para restablecer tu contraseña
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 ${
                    step > stepNumber ? 'bg-amber-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Paso 1: Ingresar Email */}
          {step === 1 && (
            <form onSubmit={handleSubmitEmail} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresa tu correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando código...
                    </div>
                  ) : (
                    'Enviar código de recuperación'
                  )}
                </button>
              </div>

              <div className="text-center">
                <a href="/login" className="text-sm text-amber-600 hover:text-amber-500">
                  ← Volver al inicio de sesión
                </a>
              </div>
            </form>
          )}

          {/* Paso 2: Ingresar Código */}
          {step === 2 && (
            <form onSubmit={handleSubmitCode} className="space-y-6">
              <div>
                <label htmlFor="recoveryCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresa el código de 6 dígitos
                </label>
                <input
                  id="recoveryCode"
                  name="recoveryCode"
                  type="text"
                  maxLength="6"
                  value={formData.recoveryCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-center text-lg font-mono ${
                    errors.recoveryCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="000000"
                />
                {errors.recoveryCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.recoveryCode}</p>
                )}
                <p className="mt-2 text-sm text-gray-600">
                  Te enviamos un código de 6 dígitos a: <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Verificar código
                </button>
                
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Reenviar código
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-amber-600 hover:text-amber-500"
                >
                  ← Cambiar email
                </button>
              </div>
            </form>
          )}

          {/* Paso 3: Nueva Contraseña */}
          {step === 3 && (
            <form onSubmit={handleSubmitNewPassword} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva contraseña
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mínimo 8 caracteres"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nueva contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Actualizando...
                    </div>
                  ) : (
                    'Actualizar contraseña'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm text-amber-600 hover:text-amber-500"
                >
                  ← Volver al código
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Información de seguridad */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            ¿Problemas para recuperar tu cuenta?{' '}
            <a href="/contact" className="text-amber-600 hover:text-amber-500">
              Contacta con soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

