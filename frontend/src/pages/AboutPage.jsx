import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Plane, 
  Train, 
  Globe2, 
  Users, 
  Star,
  ShieldCheck,
  Play
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen font-sans flex flex-col text-white">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        
        {/* SECTION 1: HERO */}
        <section className="relative w-full bg-[#151515] overflow-hidden py-16 lg:py-0 lg:h-[650px] flex items-center border-b border-gray-800">
          <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-24 flex flex-col lg:flex-row items-center relative z-10">
            
            {/* Left Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-start pt-10">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-[#e3342f] text-xs font-bold tracking-[0.2em] uppercase">Built for Collectors</span>
                <div className="flex space-x-1 text-[#e3342f]">
                  <ChevronRight className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4 -ml-2" />
                  <ChevronRight className="w-4 h-4 -ml-2" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8">
                Curate Your <br className="hidden lg:block"/>
                Collection <br className="hidden lg:block"/>
                Around the World.
              </h1>
              <button className="bg-[#e3342f] text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-red-700 transition-colors uppercase shrink-0">
                Learn More {'>'}
              </button>

              <div className="flex space-x-2 mt-16 lg:mt-24">
                <button className="w-12 h-12 bg-[#2a2a2a] flex items-center justify-center hover:bg-[#e3342f] transition-colors group">
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
                <button className="w-12 h-12 bg-[#2a2a2a] flex items-center justify-center hover:bg-[#e3342f] transition-colors group">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>
              
              {/* Optional vertical decoration left */}
              <div className="absolute left-[30px] lg:left-[50px] top-1/2 -translate-y-1/2 hidden flex-col items-center space-y-2 opacity-50">
                 <div className="w-1 h-1 bg-[#e3342f] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#e3342f] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#e3342f] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#e3342f] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#e3342f] rounded-full"></div>
              </div>
            </div>

            {/* Right Images (Overlapping Circles) */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-full mt-16 lg:mt-0 flex items-center justify-center lg:justify-end">
              <div className="relative w-[350px] h-[350px] lg:w-[500px] lg:h-[500px]">
                {/* Large Main Circle */}
                <div className="absolute right-0 top-0 w-full h-full rounded-full overflow-hidden border-4 border-[#1c1c1c] z-10">
                  <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb29?q=80&w=800&auto=format&fit=crop" alt="Main Model" className="w-full h-full object-cover" />
                </div>
                {/* Bottom Left Small Circle */}
                <div className="absolute -bottom-10 -left-10 lg:-bottom-16 lg:-left-16 w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[6px] border-[#1c1c1c] z-20">
                  <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=400&auto=format&fit=crop" alt="Secondary Model" className="w-full h-full object-cover" />
                </div>
                {/* Decoration Rings */}
                <div className="absolute -top-10 -left-20 w-48 h-48 rounded-full border border-[#e3342f]/30 z-0"></div>
                <div className="absolute top-[40%] -right-10 w-24 h-24 rounded-full border border-gray-600/30 z-0"></div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 2: WHAT WE DO */}
        <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-24 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-[#e3342f] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">What We Do</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.2] max-w-lg">
                Moving Your Models Across All Borders
              </h2>
            </div>
            <button className="bg-[#e3342f] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
              View More {'>'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group flex flex-col relative pb-8">
              <div className="w-full h-64 overflow-hidden rounded-t-xl">
                <img src="https://images.unsplash.com/photo-1533256086821-65471d4924c5?q=80&w=600&auto=format&fit=crop" alt="Service 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#2a2a2a] w-[85%] mx-auto -mt-12 relative z-10 p-6 flex flex-col items-center text-center shadow-2xl border-b-2 border-transparent group-hover:border-[#e3342f] transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-[#e3342f] flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2">Road Freight Service</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col relative pb-8">
              <div className="w-full h-64 overflow-hidden rounded-t-xl">
                <img src="https://images.unsplash.com/photo-1583344654924-d2eab2187747?q=80&w=600&auto=format&fit=crop" alt="Service 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#2a2a2a] w-[85%] mx-auto -mt-12 relative z-10 p-6 flex flex-col items-center text-center shadow-2xl border-b-2 border-transparent group-hover:border-[#e3342f] transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-[#e3342f] flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2">Air Global Shipping</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col relative pb-8">
              <div className="w-full h-64 overflow-hidden rounded-t-xl">
                <img src="https://images.unsplash.com/photo-1558504013-1a2d6aae2eac?q=80&w=600&auto=format&fit=crop" alt="Service 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#2a2a2a] w-[85%] mx-auto -mt-12 relative z-10 p-6 flex flex-col items-center text-center shadow-2xl border-b-2 border-transparent group-hover:border-[#e3342f] transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-[#e3342f] flex items-center justify-center mb-4">
                  <Train className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2">Secure Transportation</h3>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 3: ABOUT US */}
        <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-24 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <span className="text-[#e3342f] text-xs font-bold tracking-[0.2em] uppercase mb-4">About Us</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.2] mb-6">
                World's Leading Model Logistics Provider.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, true generator on the Internet.
              </p>

              <div className="space-y-8 flex-1">
                {/* Item 1 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#e3342f] flex flex-shrink-0 items-center justify-center shadow-lg shadow-red-500/20 mr-6">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Global Leaders</h3>
                    <p className="text-gray-400 text-sm">Sed ut perspiciatis unde omnis iste natue error sit volu acyert ptam.</p>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#e3342f] flex flex-shrink-0 items-center justify-center shadow-lg shadow-red-500/20 mr-6">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">People Experience</h3>
                    <p className="text-gray-400 text-sm">Sed ut perspiciatis unde omnis iste natue error sit volu acyert ptam.</p>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#e3342f] flex flex-shrink-0 items-center justify-center shadow-lg shadow-red-500/20 mr-6">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Brilliant Services</h3>
                    <p className="text-gray-400 text-sm">Sed ut perspiciatis unde omnis iste natue error sit volu acyert ptam.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button className="bg-[#2a2a2a] text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-[#e3342f] transition-colors uppercase border border-gray-700">
                  Learn More {'>'}
                </button>
              </div>
            </div>

            {/* Right Image + Stats Box */}
            <div className="w-full lg:w-1/2 relative mt-16 lg:mt-0">
              {/* Stat Box Overlap */}
              <div className="absolute -top-10 -left-6 lg:-left-12 z-20 flex bg-[#e3342f] shadow-2xl">
                <div className="px-8 py-6 border-r border-red-400/30 flex items-center justify-center flex-col md:flex-row">
                  <span className="text-3xl md:text-4xl font-black text-white mr-2">23+</span>
                  <span className="text-xs text-white/90 font-bold uppercase w-16 leading-tight text-center md:text-left mt-1 md:mt-0">Years Experience</span>
                </div>
                <div className="px-8 py-6 flex items-center justify-center flex-col md:flex-row">
                  <span className="text-3xl md:text-4xl font-black text-white mr-2">18k</span>
                  <span className="text-xs text-white/90 font-bold uppercase w-16 leading-tight text-center md:text-left mt-1 md:mt-0">Satisfied Clients</span>
                </div>
              </div>

              {/* Main Image */}
              <div className="w-full h-[500px] lg:h-full min-h-[500px] overflow-hidden ml-auto">
                <img src="https://images.unsplash.com/photo-1595183861295-8884daddfa4e?q=80&w=800&auto=format&fit=crop" alt="Manager" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 4: BOTTOM FLOATING CARD */}
        <section className="w-full relative bg-[#1c1c1c] h-[600px] mb-20 lg:mb-32 mt-10">
           {/* Background wide image */}
           <div className="absolute right-0 bottom-0 w-full lg:w-[85%] h-full lg:h-[90%] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop" alt="Transport" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-[#1c1c1c] mix-blend-color opacity-30"></div>
           </div>

           {/* Floating Red Card */}
           <div className="absolute top-10 left-6 lg:left-24 lg:top-16 z-20 w-[90%] max-w-[550px] bg-[#e3342f] rounded-lg shadow-2xl p-10 lg:p-14">
             <div className="absolute top-10 -right-6 w-12 h-12 bg-white flex items-center justify-center text-[#e3342f] shadow-lg cursor-pointer hover:scale-105 transition-transform rounded-sm">
                <Play className="w-5 h-5 fill-current" />
             </div>
             
             <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Focused On Quality</span>
             <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
                We Provide Full Assistance in Delivery and Warehousing.
             </h2>
             <p className="text-white/80 text-sm mb-10 leading-relaxed border-b border-red-400/50 pb-10">
               There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
             </p>
             
             <div className="grid grid-cols-3 gap-4 text-white">
                <div>
                  <h3 className="text-3xl font-black mb-1">335+</h3>
                  <p className="text-[10px] font-bold uppercase opacity-80">Main Warehouses</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-1">140+</h3>
                  <p className="text-[10px] font-bold uppercase opacity-80">Supply Engineers</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-1">97+</h3>
                  <p className="text-[10px] font-bold uppercase opacity-80">Countries Covered</p>
                </div>
             </div>
           </div>

           {/* Floating Trust Score Card */}
           <div className="absolute bottom-6 lg:-bottom-6 right-6 lg:right-48 z-20 bg-[#2a2a2a] p-6 shadow-2xl border border-gray-700 flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold mb-1">Trust Score 4.5 <span className="text-gray-400 font-normal">(Based on 1,200 reviews)</span></span>
                <div className="flex space-x-1 text-[#e3342f]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
