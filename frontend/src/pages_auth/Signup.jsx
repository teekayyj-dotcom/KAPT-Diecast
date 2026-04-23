import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  confirmEmailRegistration,
  loginWithEmail,
  registerWithEmail,
} from '../services/authService';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerWithEmail(email, password, username || fullName);

      if (result.requiresConfirmation) {
        setAwaitingConfirmation(true);
        setSuccess('Account created. Check your email for the Cognito verification code.');
      } else {
        await loginWithEmail(email, password);
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmation = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await confirmEmailRegistration(email, confirmationCode);
      await loginWithEmail(email, password);
      setSuccess('Email confirmed successfully.');
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to confirm your account.');
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
                <Link to="/login" className="hover:text-[#e3342f] transition-colors">Log In</Link>
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
        <div className="w-full lg:w-[55%] bg-white px-8 pt-10 pb-8 sm:px-12 sm:pb-12 lg:px-20 lg:pt-16 lg:pb-20 flex flex-col relative overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6 h-10 flex-shrink-0">
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
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black text-[#1a1a1a] mb-2">Join the Club</h1>
              <p className="text-gray-500 font-medium">Create your KAPT account</p>
            </div>

            <form className="space-y-3" onSubmit={awaitingConfirmation ? handleConfirmation : handleSignup}>
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                />
              </div>
              {!awaitingConfirmation && (
                <>
                  <div>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                    />
                  </div>
                  <div>
                    <input 
                      type="password" 
                      placeholder="Confirm Password" 
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                    />
                  </div>
                </>
              )}

              {awaitingConfirmation && (
                <div>
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={confirmationCode}
                    onChange={(event) => setConfirmationCode(event.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#e3342f] focus:ring-1 focus:ring-[#e3342f] transition-all"
                  />
                </div>
              )}
              
              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-xl bg-[#e3342f] text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 mt-4 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? awaitingConfirmation
                    ? 'Confirming...'
                    : 'Creating account...'
                  : awaitingConfirmation
                    ? 'Confirm Email'
                    : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-500 text-sm">Already have an account? </span>
              <Link to="/login" className="text-[#e3342f] text-sm font-semibold hover:underline">Log in</Link>
            </div>
          </div>
          
          {/* Footer Socials */}
          <div className="mt-8 flex justify-center space-x-6 text-gray-500 flex-shrink-0">
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

export default Signup;
