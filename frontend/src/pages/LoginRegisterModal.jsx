import React, { useState, useEffect } from 'react';
import { ArtisanButton } from '../components/ArtisanButton';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { validateForm, loginSchema, registerSchema } from '../utils/validations';

export function LoginRegisterModal({ mode = 'login', onNavigate }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, error: authError, setError } = useAuth();

  // Clear auth error when switching modes
  useEffect(() => {
    setError(null);
    setErrors({});
    setTouched({});
  }, [isLogin, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate single field
    const schema = isLogin ? loginSchema : registerSchema;
    if (schema[field]) {
      const fieldValidators = Array.isArray(schema[field]) ? schema[field] : [schema[field]];
      for (const validator of fieldValidators) {
        const error = validator(formData[field], formData);
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
          break;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate entire form
    const schema = isLogin ? loginSchema : registerSchema;
    const { errors: validationErrors, isValid } = validateForm(formData, schema);

    if (!isValid) {
      setErrors(validationErrors);
      setTouched(
        Object.keys(formData).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      setIsSubmitting(false);
      return;
    }

    // Submit form
    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      // Navigate to appropriate dashboard
      const dashboard = result.user?.role === 'creator' ? 'creator-dashboard' : 'buyer-dashboard';
      onNavigate(dashboard);
    }

    setIsSubmitting(false);
  };

  const getFieldError = (field) => {
    if (touched[field] && errors[field]) {
      return errors[field];
    }
    return null;
  };

  const getFieldClassName = (field) => {
    const baseClass = 'w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors';
    const errorClass = getFieldError(field) ? 'border-red-500' : 'border-gray-300';
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-large max-w-md w-full p-8 relative">
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500">
            {isLogin ? 'Sign in to continue' : 'Join our artisan community'}
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Kabi"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  className={getFieldClassName('name')}
                />
              </div>
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={getFieldClassName('email')}
              />
            </div>
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={getFieldClassName('password')}
              />
            </div>
            {getFieldError('password') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
            )}
            {!isLogin && (
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters with uppercase and number
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={getFieldClassName('confirmPassword')}
                />
              </div>
              {getFieldError('confirmPassword') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('confirmPassword')}</p>
              )}
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>
          )}

          <ArtisanButton 
            variant="primary" 
            size="lg" 
            className="w-full" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </ArtisanButton>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                  setErrors({});
                  setTouched({});
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
