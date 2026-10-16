# RTMS Equine Clinic — 3D Horse Medical & Injury Annotation Interface Redesign

## 1. Tổng quan & Bối cảnh dự án
- **Dự án**: `Test-3d-horse` thuộc hệ sinh thái **RTMS (Racehorse Training & Management System)**.
- **Màn hình tương ứng trong kiến trúc RTMS**: **VT-05 — Injury 3D Annotation** (`/vet/horses/:id/injuries`).
- **Mục tiêu**: Xây dựng lại giao diện chuyên nghiệp theo chủ đề **Bệnh viện Thú y / Phòng khám chuyên sâu Ngựa đua (Equine Veterinary Control Room)**, khắc phục toàn bộ các lỗi hiện tại và cung cấp công cụ tương tác 3D toàn diện cho phép bác sĩ thú y đánh dấu, định vị, và lưu trữ bệnh án chấn thương trực tiếp trên mô hình ngựa 3D tả thực và khung xương giải phẫu.

---

## 2. Nguyên nhân & Giải pháp các lỗi kỹ thuật hiện tại
1. **Lỗi Crash 3D Canvas (`ReferenceError: Html is not defined`)**:
   - *Nguyên nhân*: File `src/App.jsx` sử dụng thẻ `<Html center>` trong component `LoadingFallback` nhưng chưa import `Html` từ `@react-three/drei`. Khi `Suspense` kích hoạt, ứng dụng vấp phải lỗi `ReferenceError` làm sập toàn bộ canvas và hiển thị màn hình `ErrorBoundary`.
   - *Giải pháp*: Bổ sung import `Html`, thiết kế lại màn hình chờ y tế (Medical Loading Indicator) sang trọng với thanh tiến trình tải mô hình.

2. **Lỗi Tỷ lệ & Đồng bộ Mô hình (`HorseModel.jsx`)**:
   - *Nguyên nhân*: Thuộc tính `scale={0.012}` và `position={[0, -1.3, 0]}` được gán cố định trên thẻ `<group>` trong JSX, khiến React-Three-Fiber ghi đè toàn bộ giá trị tính toán tự động sau mỗi lần re-render. Khi chuyển sang mô hình khác như Khung xương (`horse_skeleton.glb`) hoặc mô hình tĩnh, mô hình bị thu nhỏ li ti hoặc lệch khỏi móng sàn.
   - *Giải pháp*: Xóa bỏ scale/position tĩnh trên thẻ JSX; lưu trữ và áp dụng scaleFactor và vị trí tâm chuẩn hóa tự động theo Bounding Box (`THREE.Box3`), đảm bảo mọi mô hình tải lên luôn có chiều cao chuẩn 2.4m và chân chạm sàn tại `Y = -1.3`.

3. **Lỗi Đồng bộ CSS (`App.css`)**:
   - *Nguyên nhân*: Các class selector trong `App.css` bị lệch hoàn toàn với class được khai báo trong component (`.modal-backdrop` vs `.modal-overlay`, `.injury-callout` vs `.callout-box`, thiếu toàn bộ class cho mode toggle, camera grid, v.v.).
   - *Giải pháp*: Viết lại toàn diện `App.css` theo hệ thống Design Tokens của RTMS (`Design.md`), sử dụng bảng màu **Deep Ink (#0b0f17)**, **Slate (#1e293b, #334155)**, **Medical Mint/Teal (#0d9488)**, **Acid Lime (#e6ff57)** và trạng thái chấn thương **Coral/Amber/Blue**.

4. **Tối ưu Cơ chế Bắt Điểm (Raycasting & Pinpoint Marker)**:
   - *Giải pháp*: Cho phép gắn điểm chính xác trên bề mặt lưới (surface mesh), tính toán vector pháp tuyến (normal) để đẩy chốt pin và nhãn dẫn đường Bezier hướng ra ngoài tự nhiên, không bị chìm vào trong thân ngựa.

---

## 3. Kiến trúc Giao diện & Trải nghiệm Người dùng (UX/UI)

### 3.1. Header Bệnh Viện & Hồ Sơ Bệnh Nhân (Clinical Header Bar)
- **Tiêu đề & Trực quan**: Logo chữ thập y tế RTMS Equine Clinic, breadcrumb điều hướng.
- **Thông tin Bệnh nhân (Ngựa đua)**:
  - Tên: **Thunder Flash** • Mã: `EQ-2026-088` • Giống: *Thoroughbred thuần chủng* • 4 tuổi • Giới tính: Ngựa đực (Stallion).
  - Chỉ số sinh tồn (Vital Signs Chips):
    - Thân nhiệt: `38.1°C` (Bình thường)
    - Nhịp tim: `36 bpm` (Ổn định)
    - Nhịp thở: `12 rpm`
    - Cân nặng: `465 kg`
    - Tình trạng vận động: `BLOCKED / Tạm ngừng thi đấu`
- **Hành động nhanh**:
  - Nút **Xuất Phiếu Bệnh Án (Medical Dossier)**
  - Nút **Thêm Chấn Thương Nhanh**

### 3.2. Không gian Chiếu 3D Khám Bệnh (3D Viewport - 65% màn hình)
- **Mô hình 3D linh hoạt**:
  - 🐎 **Mô hình Tả Thực Đầy Đủ Chi Tiết** (`horse_-_realistic_3d_model_demo_free.glb`): Xem rõ cơ bắp, đường nét giải phẫu, bờm, mắt, móng.
  - 🦴 **Mô hình Khung Xương X-Ray** (`horse_skeleton.glb`): Khảo sát chấn thương sâu vào sụn khớp, nứt xương, tổn thương cột sống.
- **Thanh công cụ góc nhìn giải phẫu**:
  - Các nút định vị tức thời: Mạn Trái, Mạn Phải, Phía Trước, Phía Sau, Nhìn Từ Trên, Toàn Cảnh (Reset).
- **Trực quan hóa Điểm Tổn Thương (Markers & Callouts)**:
  - Điểm chốt kim loại y tế (Metallic Core Pin) với hiệu ứng sóng radar nhấp nháy.
  - Quả cầu vùng tổn thương mô mềm bán trong suốt (Injury Sphere) thể hiện độ lan tỏa sưng viêm (bán kính điều chỉnh từ 6cm đến 30cm).
  - Đường cong Bezier phát sáng dẫn tới Thẻ thông tin lâm sàng (Interactive Medical Callout) hiển thị tên bệnh, vị trí giải phẫu, mức độ đau, bác sĩ phụ trách.

### 3.3. Bảng Hồ Sơ Bệnh Lý & Phác Đồ Điều Trị (Medical Drawer - 35% màn hình)
- **Thống kê phân loại**: Tổng số ca, Nặng/Cấp tính, Trung bình, Nhẹ, Đã phục hồi.
- **Bộ lọc nhanh theo mức độ**: Lọc danh sách chấn thương tức thời.
- **Tương tác Fly-To Camera**: Khi click vào bất kỳ mục nào trong danh sách bệnh án, camera 3D lập tức xoay chuyển và phóng to (Smooth Orbit Zoom) đến đúng vị trí tổn thương trên thân ngựa.
- **Form Ghi Nhận Chấn Thương Chuyên Sâu**:
  - Tên bệnh lý với gợi ý nhanh (Viêm gân SDFT, Tràn dịch khớp gối, Bong gân Fetlock, Nứt xương ống, Áp xe móng...).
  - Vị trí giải phẫu chuẩn quốc tế (28 phân vùng cơ thể ngựa).
  - Thang điểm đau (Pain Score 1-5).
  - Triệu chứng lâm sàng quan sát được.
  - Phác đồ điều trị đề xuất & thuốc kê đơn.
  - Bác sĩ thú y ký xác nhận.

---

## 4. Kế hoạch Kiểm thử & Xác thực (Verification)
1. Kiểm tra build và linting (`npm run build`, `npm run lint`) không còn bất kỳ cảnh báo hoặc lỗi nào.
2. Kiểm tra việc tải cả 2 mô hình (Tả thực và Khung xương) không vấp lỗi màn hình đen hoặc crash.
3. Kiểm tra tính năng click gắn mốc trên bề mặt thân ngựa: mốc tọa độ chính xác, hiển thị nhãn dẫn hướng rõ ràng.
4. Kiểm tra tương tác click danh sách bệnh án -> camera xoay trúng điểm chấn thương.
5. Kiểm tra xuất phiếu bệnh án và lưu dữ liệu mới trên giao diện.
