import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const ModernGlassLogin = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Aurora Background Effect - keeping our previous implementation */}
      
      {/* Modern Glass Login Card */}
      <div className="relative w-full max-w-md mx-4">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl transform scale-105" />
        
        {/* Main card with glass effect */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl p-8 overflow-hidden">
          {/* Inner glass highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />
          
          {/* Content */}
          <div className="relative space-y-8">
            <h2 className="text-3xl font-light text-white/90 text-center mb-12">Welcome Back</h2>
            
            {/* Modern Input Fields */}
            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <div className="flex items-center">
                  <input 
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent text-white/90 border-b border-white/20 pb-2 pl-1 pr-10 focus:outline-none focus:border-white/40 transition-colors placeholder-white/50"
                  />
                  <Mail className="absolute right-2 w-5 h-5 text-white/40 group-focus-within:text-white/60 transition-colors" />
                </div>
                {/* Animated highlight line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-focus-within:w-full transition-all duration-300" />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="flex items-center">
                  <input 
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent text-white/90 border-b border-white/20 pb-2 pl-1 pr-10 focus:outline-none focus:border-white/40 transition-colors placeholder-white/50"
                  />
                  <Lock className="absolute right-2 w-5 h-5 text-white/40 group-focus-within:text-white/60 transition-colors" />
                </div>
                {/* Animated highlight line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-focus-within:w-full transition-all duration-300" />
              </div>
            </div>

            {/* Login Button with Glass Effect */}
            <div className="pt-4">
              <button className="relative w-full group">
                {/* Button glass container */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-sm transform group-hover:scale-105 transition-transform" />
                
                {/* Button content */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-3 px-6 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <span className="text-white font-light">Sign In</span>
                  <ArrowRight className="w-5 h-5 text-white/80 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
                
                {/* Button highlight ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernGlassLogin;