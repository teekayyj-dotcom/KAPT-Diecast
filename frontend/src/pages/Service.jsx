import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Mail, Settings, TrendingUp, Paintbrush, ShieldCheck, Award, FileBadge } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Paintbrush,
    title: 'Paint Restoration',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Value Appraisals',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  },
  {
    id: 3,
    icon: Settings,
    title: 'Bespoke Customization',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Damage Repair',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  },
  {
    id: 5,
    icon: Award,
    title: 'Top Performance',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  },
  {
    id: 6,
    icon: FileBadge,
    title: 'Premium Certification',
    description: 'Lorem ipsum dolor sit amet magna set dolor sit amet consectetur adipiscing do elite labore.'
  }
];

const Service = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen font-sans flex flex-col text-white">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        
        {/* Top Hero Image Banner */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] flex flex-col justify-center px-6 lg:px-24">
          <img 
            src="https://images.unsplash.com/photo-1596704017254-9b121068fb29?q=80&w=2000&auto=format&fit=crop" 
            alt="Services Banner" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="relative z-10 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-[3px] h-4 bg-[#e3342f]"></div>
              <span className="text-gray-300 text-xs md:text-sm tracking-[0.2em] uppercase font-bold">What We Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide">
              Our Services
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-24 py-16 lg:py-24">
          
          {/* Intro Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-20">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-[3px] h-4 bg-[#e3342f]"></div>
                <span className="text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase font-bold">Our Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                Take Premium Services From Our Experienced Staff
              </h2>
            </div>
            <div className="flex-1 flex flex-col text-gray-400 text-sm md:text-base leading-relaxed space-y-6">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <p>
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>

          {/* Service Grid 3x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="bg-[#2a2a2a] p-10 md:p-12 rounded-xl border border-gray-800 hover:border-[#e3342f] transition-all duration-300 flex flex-col items-center text-center group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-500/10"
                >
                  <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#e3342f] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Newsletter Banner */}
        <div className="w-full relative px-4 lg:px-24 mb-0 lg:-mb-16 z-20">
          <div className="max-w-[1400px] mx-auto bg-gradient-to-r from-[#e3342f] to-[#ff5b56] rounded-t-xl lg:rounded-xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex items-center space-x-4">
              <Mail className="w-10 h-10 text-white stroke-[1.5]" />
              <h3 className="text-xl md:text-2xl font-bold text-white">Subscribe to Newsletter</h3>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center w-full max-w-lg relative bg-white rounded-md overflow-hidden p-1 shadow-inner">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 text-black placeholder-gray-400 focus:outline-none text-sm bg-transparent"
              />
              <button className="w-full sm:w-auto bg-[#1a1a1a] text-white px-8 py-3 rounded-sm font-bold text-sm tracking-wide hover:bg-black transition-colors shrink-0">
                Subscribe !
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer is placed normally, if on desktop the newsletter overlaps the top of the footer due to negative margin */}
      <div className="relative z-10 bg-[#1c1c1c] pt-16 lg:pt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Service;
