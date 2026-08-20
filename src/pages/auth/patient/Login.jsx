// src/pages/auth/patient/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, User, Plus, ShieldCheck } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'patient', label: 'Patient', icon: User, activeClasses: 'border-blue-500 bg-blue-50 text-blue-600' },
    { id: 'doctor', label: 'Doctor', icon: Plus, activeClasses: 'border-green-500 bg-green-50 text-green-600' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, activeClasses: 'border-purple-500 bg-purple-50 text-purple-600' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/${selectedRole}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (selectedRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (selectedRole === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        if (response.status === 404 || response.status === 401) {
          setEmailError('Email not recognized. Please try again.');
        } else {
          setError(data.message || 'Login failed');
        }
      }
    } catch (err) {
      // Mock login for demo
      if (formData.email === 'patient@medimate.com' && formData.password === 'password123') {
        const mockUser = {
          id: 'P001',
          name: 'Imasha Perera',
          email: formData.email,
          phone: '+94 77 123 4567',
          role: selectedRole
        };

        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(mockUser));

        if (selectedRole === 'patient') {
          navigate('/dashboard');
        } else {
          navigate(`/${selectedRole}/dashboard`);
        }
      } else {
        setEmailError('Email not recognized. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login integration coming soon!`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Full Doctor Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Full Background Doctor Image */}
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
          alt="Healthcare team"
          className="absolute inset-0 w-full h-full object-cover" />

        {/* Subtle Dark Overlay for Better Visibility */}
        <div className="absolute inset-0 bg-blue-900/40"></div>

        {/* Logo at Top Left */}
        <div className="relative z-10 p-8 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome Text at Bottom Left */}
        <div className="relative z-10 mt-auto p-8 w-full">
          <h2 className="text-3xl font-bold text-white drop-shadow-md leading-snug">
            Join Our Healthcare
            <br />
            Community
          </h2>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to access your healthcare account</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-wide text-gray-500 mb-2">SELECT YOUR ROLE</p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${isActive
                        ? role.activeClasses
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-semibold">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Global Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                <AlertCircle size={18} className="mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailError('');
                  } }
                  className={`w-full pl-10 pr-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="your.email@example.com" />
              </div>
              {emailError && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle size={14} />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Keep Signed In */}
            <div className="flex items-center">
              <input
                id="keep-signed-in"
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="keep-signed-in" className="ml-2 text-sm text-gray-700">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('Microsoft')}
              className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Continue with Microsoft"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Continue with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;