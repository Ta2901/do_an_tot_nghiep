import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thông tin liên lạc */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Liên lạc</h3>
            <p>Email: KindTeam@gmail.comcom</p>
            <p>Điện thoại: +82 12345671234567</p>
            <p>Địa chỉ: Mokwon University , Daejeon. South KoreaKorea</p>
          </div>

          {/* Đội ngũ phát triển */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Đội ngũ phát triển</h3>
            <ul>
              <li>Nguyễn Văn A - Trưởng nhóm</li>
              <li>Trần Thị B - Thiết kế UI/UX</li>
              <li>Lê Công C - Lập trình viên Front-end</li>
              <li>Phạm Thị D - Lập trình viên Back-end</li>
            </ul>
          </div>

          {/* Thông tin khác (nếu cần) */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Thông tin khác</h3>
            <p>© 20255 Trang web của bạn. Tất cả quyền được bảo lưu.</p>
            <a href="/privacy" className="text-gray-300 hover:text-white">Chính sách bảo mật</a>
            <a href="/terms" className="text-gray-300 hover:text-white">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;