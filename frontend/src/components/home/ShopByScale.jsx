import React from 'react';

// Dữ liệu mẫu. Sếp hãy import các ảnh thực tế từ thư mục assets vào đây nhé!
// Ví dụ: import img118Front from '../../assets/media/118-front.jpg';
const scalesData = [
  {
    id: '1-18',
    title: '1:18',
    // Tạm thời dùng link ảnh online, sếp thay bằng biến ảnh của sếp (VD: imgPrimary: img118Front)
    imgPrimary: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop', 
    imgHover: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=600&auto=format&fit=crop',
    description: 'Mô hình diecast 1:18 là "tỉ lệ vàng" cho giới sưu tầm nhờ kích thước lớn (khoảng 25cm) và độ chi tiết sắc sảo. Với khung hợp kim chắc chắn, nội thất tỉ mỉ và các bộ phận đóng mở linh hoạt, đây là bản mô phỏng hoàn hảo nhất vẻ đẹp của những cỗ máy thực thụ.'
  },
  {
    id: '1-24',
    title: '1:24',
    imgPrimary: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop',
    imgHover: 'https://images.unsplash.com/photo-1503376710356-748c58257007?q=80&w=600&auto=format&fit=crop',
    description: 'Mô hình diecast 1:24 là lựa chọn lý tưởng nhờ sự cân bằng giữa độ chi tiết và kích thước gọn gàng (khoảng 18-20cm). Với mức giá hợp lý và khả năng mô phỏng tốt các bộ phận đóng mở, đây là tỉ lệ hoàn hảo để bắt đầu bộ sưu tập mà không tốn quá nhiều diện tích trưng bày.'
  },
  {
    id: '1-64',
    title: '1:64',
    imgPrimary: 'https://images.unsplash.com/photo-1594042861618-1d70a35987a9?q=80&w=600&auto=format&fit=crop',
    imgHover: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=600&auto=format&fit=crop',
    description: 'Mô hình diecast 1:64 chiếm ưu thế nhờ sự nhỏ gọn và tính cơ động tuyệt vời. Với kích thước chỉ khoảng 7-8cm, tỉ lệ này giúp bạn dễ dàng sưu tập số lượng lớn mà không tốn diện tích, trong khi vẫn giữ được nét đặc trưng và độ tinh tế của các dòng xe ngoài đời thực.'
  }
];

const ShopByScale = () => {
  return (
    <section className="w-full bg-black py-20 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Tiêu đề Section --- */}
        <div className="text-center mb-16">
          <h3 className="text-red-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">Shop By Scale</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Find your perfect scale</h2>
        </div>

        {/* --- Lưới hiển thị các Scale --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {scalesData.map((item) => (
            <div key={item.id} className="flex flex-col">
              
              {/* Vùng chứa ảnh có hiệu ứng Hover (group) */}
              <div className="relative w-full aspect-[4/3] bg-white overflow-hidden group cursor-pointer rounded-sm">
                {/* Ảnh mặc định (sẽ mờ đi khi hover) */}
                <img 
                  src={item.imgPrimary} 
                  alt={`Scale ${item.title}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                
                {/* Ảnh thứ 2 (Nằm bên dưới, lúc đầu trong suốt, khi hover sẽ hiện rõ) */}
                <img 
                  src={item.imgHover} 
                  alt={`Scale ${item.title} Details`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                />
              </div>

              {/* Tỉ lệ và Mô tả */}
              <div className="text-center mt-8">
                <h4 className="text-red-brand text-3xl font-black tracking-wider mb-6">{item.title}</h4>
                <p className="text-[#8a8a8a] text-sm leading-relaxed text-left sm:text-justify">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- Nút View More --- */}
        <div className="flex justify-center">
          <button className="bg-red-brand text-white text-sm font-bold uppercase tracking-wider py-4 px-10 hover:bg-red-700 transition-colors duration-300">
            View More
          </button>
        </div>

      </div>
    </section>
  );
};

export default ShopByScale;