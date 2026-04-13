import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import { isAdminUser } from '../utils/roles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || (isAdmin ? '/admin' : '/');

  useEffect(() => {
    if (currentUser) {
      navigate(redirectTo, { replace: true });
    }
  }, [currentUser, navigate, redirectTo]);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await loginWithEmail(email, password);
      navigate(isAdminUser(user) ? '/admin' : redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const user = await loginWithGoogle();
      navigate(isAdminUser(user) ? '/admin' : redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to log in with Google.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#1a1a1a] flex p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      <div className="flex w-full h-full max-w-[1400px] mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex-col lg:flex-row">
        
        {/* Left Side - Image and Elements */}
        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:h-auto hidden md:flex flex-col flex-shrink-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
            {/* Dark overlay to fit brand */}
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 px-10 pt-10 pb-10 lg:px-12 lg:pt-16 flex flex-col h-full justify-between text-white">
            <div className="flex justify-end items-center h-10">
              <div className="flex items-center space-x-6 text-sm font-semibold">
                <Link to="/signup" className="hover:text-[#e3342f] transition-colors">Sign Up</Link>
                <Link to="/signup" className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors">
                  Join Us
                </Link>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#e3342f] transition-colors">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-[#e3342f] transition-colors">Admin.kapt</h4>
                  <p className="text-gray-300 text-sm">Collection Curator</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors">
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="w-full lg:w-[55%] bg-white px-8 pt-10 pb-8 sm:px-12 sm:pb-12 lg:px-20 lg:pt-16 lg:pb-20 flex flex-col relative">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10 h-10">
            <Link to="/" className="text-2xl font-black tracking-widest text-[#1a1a1a]">
              KAPT<span className="text-[#e3342f]">DIECAST</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1a1a1a] hover:bg-[#e3342f] hover:text-white transition-colors cursor-pointer group shadow-sm border border-gray-200">
                <X className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>

          {/* Form Area */}
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-black text-[#1a1a1a] mb-3">Hi Collector</h1>
              <p className="text-gray-500 font-medium">Welcome to KAPTDIECAST</p>
            </div>

            <form className="space-y-5" onSubmit={handleEmailLogin}>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                />
              </div>
              
              <div className="flex justify-end">
                <a href="#" className="text-[#e3342f] text-sm font-semibold hover:underline">
                  Forgot password ?
                </a>
              </div>

              <div className="relative py-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-4 text-xs text-gray-400 font-medium">
                  or
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] font-bold flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {/* Google SVG from standard icons */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span>Login with Google</span>
              </button>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl bg-[#e3342f] text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center mt-8">
              <span className="text-gray-500 text-sm">Don't have an account? </span>
              <Link to="/signup" className="text-[#e3342f] text-sm font-semibold hover:underline">Sign up</Link>
            </div>
          </div>
          
          {/* Footer Socials */}
          <div className="mt-16 flex justify-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-[#1a1a1a] transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
