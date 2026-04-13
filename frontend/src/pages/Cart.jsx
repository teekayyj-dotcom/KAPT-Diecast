import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CartPage = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-[1240px] mx-auto w-full px-5 py-12 text-white">
        
        {/* Top Header */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-700 pb-6 mt-4">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide">Shopping Cart</h1>
          <p className="text-gray-400 text-sm">Guaranteed 100% genuine and eligible for our comprehensive return policy.</p>
        </div>

        {/* Cart Items List */}
        <div className="flex flex-col border border-[#333] rounded-sm overflow-hidden mb-16">
          
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row bg-[#222] border-b border-[#333] last:border-0 relative min-h-[220px]">
            {/* Image */}
            <div className="w-full md:w-56 h-48 md:h-auto bg-white flex-shrink-0 flex items-center justify-center p-4">
              <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800" alt="Bugatti Divo" className="w-full h-full object-contain" />
            </div>
            
            {/* Details */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="bg-gray-400 text-[#222] text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 inline-block">1:24</span>
                <h3 className="text-xl font-extrabold uppercase tracking-widest mb-1">BUGATTI DIVO DARK GRAY</h3>
                <p className="text-gray-400 text-sm uppercase">MAISO</p>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-6 font-bold tracking-wider">
                <span>COLOR:</span>
                <div className="w-4 h-4 rounded-full bg-blue-500 ml-3 mr-3 shadow-sm shadow-black/50"></div>
                <button className="border border-gray-600 rounded-full px-4 py-1 text-[10px] hover:text-white hover:border-white transition-colors uppercase">EDIT</button>
              </div>
            </div>

            {/* Actions (Right Side) */}
            <div className="p-6 lg:p-8 flex flex-col justify-between items-end min-w-[380px]">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                   <span className="text-xs font-bold text-white uppercase tracking-widest">QUANTITY:</span>
                   <div className="flex items-center space-x-2">
                     <button className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors">-</button>
                     <div className="w-12 h-8 bg-white text-black font-extrabold flex items-center justify-center rounded-sm text-sm">1</div>
                     <button className="w-8 h-8 rounded-full bg-[#e3342f] text-white flex items-center justify-center border border-[#e3342f] hover:bg-red-700 transition-colors">+</button>
                   </div>
                </div>
                <div className="text-xl font-extrabold text-white tracking-widest ml-4">4.500.000 VND</div>
              </div>
              
              <button className="border border-gray-600 rounded-full px-8 py-2 text-[11px] font-bold tracking-wider uppercase text-gray-400 hover:text-white hover:border-white transition-colors mt-8">
                Remove
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row bg-[#222] border-b border-[#333] last:border-0 relative min-h-[220px]">
             {/* Image */}
            <div className="w-full md:w-56 h-48 md:h-auto bg-white flex-shrink-0 flex items-center justify-center p-4">
              <img src="https://images.unsplash.com/photo-1503376710356-748c58257007?q=80&w=800" alt="Porsche 911" className="w-full h-full object-contain" />
            </div>
            
            {/* Details */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="bg-gray-400 text-[#222] text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 inline-block">1:36</span>
                <h3 className="text-xl font-extrabold uppercase tracking-widest mb-1">PORSCHE 911 TURBO 1978</h3>
                <p className="text-gray-400 text-sm uppercase">TOKAXI</p>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-6 font-bold tracking-wider">
                <span>COLOR:</span>
                <div className="w-4 h-4 rounded-full bg-green-900 ml-3 mr-3 shadow-sm shadow-black/50"></div>
                <button className="border border-gray-600 rounded-full px-4 py-1 text-[10px] hover:text-white hover:border-white transition-colors uppercase">EDIT</button>
              </div>
            </div>

            {/* Actions (Right Side) */}
            <div className="p-6 lg:p-8 flex flex-col justify-between items-end min-w-[380px]">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                   <span className="text-xs font-bold text-white uppercase tracking-widest">QUANTITY:</span>
                   <div className="flex items-center space-x-2">
                     <button className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors">-</button>
                     <div className="w-12 h-8 bg-white text-black font-extrabold flex items-center justify-center rounded-sm text-sm">1</div>
                     <button className="w-8 h-8 rounded-full bg-[#e3342f] text-white flex items-center justify-center border border-[#e3342f] hover:bg-red-700 transition-colors">+</button>
                   </div>
                </div>
                <div className="text-xl font-extrabold text-white tracking-widest ml-4">620.000 VND</div>
              </div>
              
              <button className="border border-gray-600 rounded-full px-8 py-2 text-[11px] font-bold tracking-wider uppercase text-gray-400 hover:text-white hover:border-white transition-colors mt-8">
                Remove
              </button>
            </div>
          </div>

        </div>

        {/* Promo & Totals Row */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 px-2 gap-12">
          {/* Promo */}
          <div className="max-w-[450px] w-full">
            <h4 className="text-[13px] font-extrabold uppercase tracking-widest mb-6 text-white">Have a promo code?</h4>
            <div className="flex space-x-4">
              <input type="text" className="flex-1 bg-white rounded-full px-5 py-3 text-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#e3342f]" />
              <button className="bg-[#e3342f] text-white px-10 py-3 rounded-full font-bold text-xs tracking-wider uppercase hover:bg-red-700 transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="w-full md:w-[420px] text-sm">
            <div className="flex justify-between mb-4 text-gray-400 font-medium">
              <span>2 Item(s) Subtotal</span>
              <span className="text-gray-300">5.120.000 VND</span>
            </div>
            <div className="flex justify-between mb-8 text-gray-400 font-medium">
              <span>Shipping and Handling</span>
              <span className="text-gray-300">50.000 VND</span>
            </div>
            <div className="flex justify-between border-t border-[#444] pt-6 items-end mt-4">
              <span className="font-extrabold text-base tracking-widest">ORDER TOTAL:</span>
              <span className="font-extrabold text-xl tracking-wider text-white">5.170.000 VND</span>
            </div>
          </div>
        </div>

        {/* Bottom Split Section */}
        <hr className="border-[#333] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[420px]">
          
          {/* Registered Already? */}
          <div className="relative h-full min-h-[420px] overflow-hidden bg-[#232323] flex items-center p-8 lg:p-14 group border-r border-[#333]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542382103-68d712ce51a1?q=80&w=1200')] bg-cover bg-center brightness-[0.35] group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent"></div>
            <div className="relative z-10 w-full ml-auto flex flex-col justify-center items-end text-right">
               <h2 className="text-4xl lg:text-[42px] font-extrabold uppercase italic tracking-wider mb-6 leading-[1.05] text-white drop-shadow-xl text-right">
                 Registered <br/> Already?
               </h2>
               <div className="w-full max-w-[340px] space-y-4">
                 <input type="email" placeholder="E-mail address" className="w-full bg-white rounded-full px-5 py-3.5 text-black text-sm focus:outline-none font-bold" />
                 <input type="password" placeholder="Password" className="w-full bg-white rounded-full px-5 py-3.5 text-black text-sm focus:outline-none font-bold" />
                 <div className="text-right">
                   <button className="text-[11px] font-medium tracking-wide text-gray-400 hover:text-white transition-colors">Forgot Password?</button>
                 </div>
                 <button className="w-full bg-[#e3342f] text-white py-3.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-lg hover:bg-red-700 transition-colors mt-2">
                   Sign In & Check Out
                 </button>
               </div>
            </div>
          </div>

          {/* New Customer */}
          <div className="relative h-full min-h-[420px] overflow-hidden bg-[#1a1a1a] flex items-center p-8 lg:p-14 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200')] bg-cover bg-center brightness-[0.35] group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            <div className="relative z-10 w-full flex flex-col justify-center items-start text-left">
               <h2 className="text-4xl lg:text-[42px] font-extrabold uppercase italic tracking-wider mb-8 leading-[1.05] text-white drop-shadow-xl">
                 New Customer
               </h2>
               <p className="text-gray-300 text-xs leading-[1.8] mb-10 max-w-[360px] font-medium">
                 We cordially invite you to register as a KAPT Diecast Member to ensure you receive the latest information and official updates regarding the association. As a valued member, you will gain priority access to important announcements and be entitled to numerous exclusive benefits and attractive offers designed to enhance your collecting experience.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[380px]">
                 <button className="flex-1 border-2 border-white/60 text-white py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all w-full whitespace-nowrap px-4">
                   Check Out As Guest
                 </button>
                 <button className="flex-1 bg-[#e3342f] text-white py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg hover:bg-red-700 transition-colors w-full whitespace-nowrap px-4">
                   Register Account
                 </button>
               </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
