# Hệ Thống Mô Hình Ngựa 3D Đánh Dấu Chấn Thương Giải Phẫu (Test-3d-horse)

Dự án mẫu tương tác 3D xây dựng bằng **React (JSX) + Vite**, sử dụng hệ sinh thái **Three.js / React Three Fiber / @react-three/drei** phục vụ bài toán quản lý y tế và chấn thương ngựa đua (RTMS Equine Veterinary Module).

---

## 1. Trả Lời Câu Hỏi Kỹ Thuật

- **Có cần Three.js để thực hiện không?**
  - **Bắt buộc có:** Để render mô hình 3D (định dạng GLB/glTF), xử lý ánh sáng (lighting), đổ bóng (shadows), camera 360 độ (OrbitControls) và tính toán tọa độ tia chạm bề mặt vật thể (Raycasting) khi người dùng click vào thân ngựa, Three.js là công cụ tiêu chuẩn và mạnh mẽ nhất trên trình duyệt web hiện nay.
  - **Cách tiếp cận tối ưu:** Sử dụng **React Three Fiber (R3F)** và **@react-three/drei** giúp viết Three.js dưới dạng các component React (JSX), tự động quản lý lifecycle, state và tích hợp liền mạch với HTML overlay (`Html` component từ Drei) để hiển thị nhãn dẫn đường và tooltip chấn thương.

---

## 2. Tính Năng Chính

1. **Hiển thị Mô hình Ngựa 3D (`Horse.glb`):**
   - Tự động chuẩn hóa tâm (`center`) và tỷ lệ (`scale = 0.015`).
   - Hỗ trợ bật/tắt hoạt ảnh phi nước kiệu (trot animation) chân thực.
   - Sàn lưới 3D (`gridHelper`) và hệ thống chiếu sáng chuẩn (Ambient, Directional, Hemisphere).

2. **Hệ Thống Đánh Dấu Chấn Thương (Injury Markers & Callouts):**
   - Điểm đánh dấu 3D màu đỏ rực rỡ kèm hiệu ứng nhấp nháy phát sáng (`pulse animation`).
   - Đường cong nối mềm mại (`QuadraticBezierLine`) từ điểm chấn thương trên da ngựa ra nhãn thông tin.
   - Thẻ thông tin trực quan hiển thị: Vị trí giải phẫu (Anatomical Region), Mức độ nghiêm trọng (Nhẹ, Trung bình, Nặng, Nguy kịch), Bác sĩ điều trị, Ngày ghi nhận và Mô tả lâm sàng.

3. **Tương Tác Thêm Chấn Thương Trực Tiếp (Raycasting):**
   - Chế độ **"Thêm chấn thương mới"**: Click vào bất kỳ vị trí nào trên thân ngựa trong không gian 3D, hệ thống tự động bắt tọa độ `[x, y, z]` và pháp tuyến bề mặt `normal`.
   - Mở modal cho phép chọn nhanh từ danh mục 15 vị trí giải phẫu chuẩn của ngựa (Gân gấp, Khớp cổ chân, Khớp gối, Khớp bàn chân, Cột sống thắt lưng, Khớp vai, Móng...).

4. **Điều Khiển Góc Nhìn Camera:**
   - Xoay 360 độ quanh ngựa bằng chuột trái, phóng to/thu nhỏ bằng con lăn.
   - Nút chuyển nhanh các góc nhìn chuẩn: **Nhìn ngang (Bên trái / Bên phải)**, **Nhìn trực diện (Trước / Sau)**, **Mặc định**.

5. **Bộ Lọc & Quản Trị Danh Sách:**
   - Lọc chấn thương theo mức độ nghiêm trọng (All, Mild, Moderate, Severe, Critical).
   - Click vào bất kỳ thẻ bệnh án ở sidebar để camera tự động căn góc nhìn (focus) vào điểm chấn thương đó trên ngựa.
   - Xóa chấn thương trực tiếp từ danh sách hoặc từ thẻ 3D.

---

## 3. Cấu Trúc Thư Mục

```text
Test-3d-horse/
├── public/
│   └── models/
│       └── horse.glb            # File mô hình 3D ngựa chuẩn
├── src/
│   ├── components/
│   │   ├── HorseModel.jsx       # Component 3D load và xử lý raycast hit trên thân ngựa
│   │   ├── InjuryMarker.jsx     # Marker đỏ nhấp nháy, đường dẫn cong Bezier & nhãn HTML 3D
│   │   ├── InjuryFormModal.jsx  # Modal form nhập chẩn đoán & thông tin chấn thương mới
│   │   └── Sidebar.jsx          # Bảng điều khiển góc nhìn, bộ lọc, danh sách ca bệnh
│   ├── data/
│   │   ├── anatomyPresets.js    # Danh mục 15 vị trí giải phẫu chuẩn của ngựa đua
│   │   └── sampleInjuries.js    # Dữ liệu chấn thương mẫu (Viêm gân SDFT, Sưng khớp...)
│   ├── App.jsx                  # Main container tích hợp Canvas 3D & State
│   ├── App.css                  # Giao diện y tế dark-theme hiện đại
│   ├── index.css                # Base reset CSS
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 4. Hướng Dẫn Chạy Dự Án

### Bước 1: Di chuyển vào thư mục dự án
```bash
cd Test-3d-horse
```

### Bước 2: Khởi động Dev Server
```bash
npm run dev
```

Trình duyệt sẽ mở tại `http://localhost:5173/`.

### Bước 3: Build Production (khi cần triển khai)
```bash
npm run build
```
Build hoàn tất mà không phát sinh lỗi nào.
