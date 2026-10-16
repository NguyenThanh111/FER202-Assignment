# RTMS — Google Stitch Master Design Specification

> Tài liệu nguồn để tạo toàn bộ giao diện cho **Racehorse Training & Management System** bằng Google Stitch.
> Ngôn ngữ hiển thị: **Tiếng Việt**. Phạm vi: **Front-end UI/UX với dữ liệu giả lập**, không thiết kế backend.

## 1. Mục tiêu đầu ra

Tạo một web application quản lý trại đua ngựa có cùng nhận diện thương hiệu nhưng cung cấp giao diện và quyền thao tác riêng cho năm vai trò:

1. **Head Trainer** — quản lý huấn luyện, lịch tập, đánh giá và thi đấu.
2. **Veterinarian** — khám bệnh, điều trị, chấn thương, tiêm phòng và khóa huấn luyện.
3. **Groom / Stable Hand** — chăm sóc chuồng, cho ăn, thực hiện task và báo cáo sự cố.
4. **Horse Owner** — theo dõi ngựa sở hữu, sức khỏe, tập luyện, thành tích và chi phí.
5. **Club Manager** — quản trị hoạt động, nhân sự, quyền truy cập, tài sản và báo cáo.

### Yêu cầu bắt buộc khi tạo bằng Stitch

- Tạo **năm actor workspace riêng**, không gộp chức năng của năm vai trò vào một dashboard duy nhất.
- Mỗi workspace có sidebar, dashboard, danh sách, trang chi tiết, form/modal và trạng thái empty/loading/error/success.
- Dùng cùng một design system và cùng dữ liệu ngựa mẫu để các màn hình có cảm giác thuộc một sản phẩm.
- Desktop-first ở khung 1440 px; tạo thêm hành vi responsive cho tablet và mobile.
- Tất cả layer, card, bảng, biểu đồ và form phải editable; không dùng ảnh chụp UI phẳng.
- Chỉ thể hiện hành vi front-end với mock data. Không mô tả database, API hoặc logic backend.

## 2. Phạm vi và nguyên tắc quyền

| Actor | Mục tiêu chính | Được xem | Được thao tác |
| --- | --- | --- | --- |
| Head Trainer | Tối ưu giáo án và hiệu suất đội ngựa | Ngựa, trạng thái sức khỏe, lịch tập, kết quả | Tạo giáo án, xếp lịch, bắt đầu/hoàn tất đánh giá, đăng ký thi đấu |
| Veterinarian | Đảm bảo an toàn y tế | Hồ sơ sức khỏe, ca khám, sự cố, thuốc, tiêm phòng | Khám, chẩn đoán, điều trị, đánh dấu chấn thương, ALLOWED/BLOCKED |
| Groom / Stable Hand | Thực hiện chăm sóc hằng ngày | Chuồng, khẩu phần, task được giao, cảnh báo | Hoàn thành task, ghi chỉ số, báo sự cố, cập nhật vật tư |
| Horse Owner | Theo dõi ngựa thuộc sở hữu | Chỉ ngựa của mình, báo cáo được chia sẻ | Xem, lọc, tải báo cáo; không sửa hồ sơ chuyên môn |
| Club Manager | Điều hành toàn hệ thống | Tổng hợp vận hành, nhân sự, tài chính, audit | Quản lý nhân sự/RBAC, tài sản, báo cáo và cấu hình |

### Business states dùng thống nhất

- Sức khỏe: `Đủ điều kiện`, `Cần theo dõi`, `Chấn thương`, `Cách ly`.
- Quyết định huấn luyện của Vet: chỉ có `ALLOWED` hoặc `BLOCKED`.
- Lịch Trainer: `SCHEDULED → IN_PROGRESS → COMPLETED`.
- Ca y tế: `REQUESTED → SCHEDULED → IN_PROGRESS → COMPLETED`.
- Sự cố Groom: `Mới báo cáo → Đang xử lý → Đã giải quyết`.
- Mức độ ưu tiên: `Thấp`, `Trung bình`, `Cao`, `Khẩn cấp`.

## 3. Shared Design System

### 3.1 Visual direction

Phong cách **Equestrian Neo-Utility / Soft Control Room**: một dashboard vận hành hiện đại với hình khối tối giản, mật độ thông tin cao nhưng thoáng, kết hợp nền trung tính mềm với màu đen và acid-lime. Giao diện phải tạo cảm giác như một “control panel” cao cấp cho trại đua, không giống dashboard SaaS xanh lá thông thường.

### 3.1.1 Reference visual grammar

Áp dụng các đặc điểm thị giác rút ra từ ảnh và video tham chiếu, nhưng không sao chép logo, nội dung hay bố cục y hệt:

- Toàn bộ app nằm trong một **floating shell** bo tròn lớn, đặt trên nền sage/architectural blur nhẹ.
- Điều hướng chính là **black icon rail** rất hẹp; label hiển thị bằng tooltip hoặc secondary navigation.
- Page heading mang tính editorial, cỡ lớn, có thể xuống hai dòng; bên cạnh là một hoặc hai icon utility nhỏ.
- Ngay dưới heading là **segmented context tabs** dạng pill, chiều cao thấp và khoảng cách sát.
- Dashboard dùng **asymmetric bento grid**: metric cards, hero/media card, chart card và utility stack có kích thước khác nhau nhưng cùng hệ radius.
- Acid-lime chỉ dùng cho selected state, dữ liệu quan trọng, progress fill và CTA đặc biệt; không phủ kín toàn bộ UI.
- Chart dùng capsule bars màu Ink + Acid Lime, dotted empty state, value badge nhỏ và trục rất nhẹ.
- Bảng/list có row cao, nền trắng trong mờ, khoảng cách rộng, action nhỏ nằm ở mép phải.
- Card ưu tiên tonal separation thay vì border đậm; shadow nông, mềm và có cảm giác panel nổi.
- Ảnh ngựa hoặc 3D model được đặt trong một hero card có crop mạnh, overlay chữ lớn và CTA pill.
- Tránh gradient rực, glassmorphism quá trong, neon glow, shadow nặng và quá nhiều card cùng kích thước.

### 3.2 Color tokens

| Token | Giá trị | Mục đích |
| --- | --- | --- |
| Outer Canvas | `#AEBAB2` | Nền sage nằm ngoài floating app shell |
| App Shell | `#F5F6F2` | Nền chính của ứng dụng |
| Surface | `#FBFCF8` | Card, bảng và modal |
| Surface Muted | `#ECEFE9` | Tab, filter, secondary panel |
| Surface Glass | `rgba(248,249,246,0.82)` | Floating panel trong motion/overlay |
| Ink | `#181B1D` | Icon rail, text chính, chart segment |
| Ink Soft | `#2B3031` | Button tối, selected control |
| Acid Lime | `#E6FF57` | Selected state, key metric, CTA và progress |
| Acid Lime Soft | `#F1FF9C` | Highlight card và chart secondary fill |
| Stable Green | `#315B45` | Ngữ nghĩa thương hiệu và health success |
| Horse Brown | `#8D6E63` | Ảnh, avatar và accent phụ |
| Text Secondary | `#747C78` | Nhãn và nội dung phụ |
| Border Soft | `#E1E5DF` | Divider rất nhẹ khi thật sự cần |
| Success | `#4E8B63` | Đủ điều kiện, hoàn thành |
| Warning | `#E6A84A` | Cần theo dõi |
| Danger / Coral | `#F2766B` | Chấn thương, BLOCKED, lỗi |
| Info / Ice Blue | `#8EC5D6` | Cách ly, thông tin trung lập |

Không dùng màu làm tín hiệu duy nhất; luôn kết hợp icon và text label.

### 3.3 Typography

- Font: **Inter**.
- Hero/page title: 36–44 px / Medium hoặc Semi Bold / line-height 42–50 px / letter-spacing -2%.
- Standard page title: 28 px / Semi Bold / line-height 36 px.
- Section title: 20 px / Semi Bold / line-height 28 px.
- Card title: 16 px / Semi Bold / line-height 24 px.
- Body: 14 px / Regular / line-height 20 px.
- Label: 13 px / Medium / line-height 18 px.
- Caption: 12 px / Medium / line-height 16 px.

### 3.4 Spacing and shape

- Grid spacing: 4, 8, 12, 16, 20, 24, 32 và 40 px.
- App shell radius: 28–32 px; card radius: 20–24 px; nested card radius: 14–18 px; control/status chip radius: pill.
- Card mặc định không cần border; khi cần dùng 1 px Border Soft. Shadow: `0 18px 50px rgba(25,32,28,0.12)` cho shell và `0 8px 24px rgba(25,32,28,0.06)` cho floating panel.
- Button height: 42–44 px; input height: 44 px; table row tối thiểu 52 px.
- Khoảng trống giữa bento modules chỉ 8–12 px; khoảng trống giữa các section lớn 24–32 px.

### 3.5 Shared app shell

- Canvas ngoài app dùng màu sage hoặc ảnh kiến trúc chuồng trại blur rất nhẹ.
- App shell desktop tối đa 1360–1440 px, cao khoảng 880–960 px, bo 28–32 px và có shadow mềm.
- Primary navigation là icon rail rộng 64–72 px, nền Ink, bo phía trong 20–24 px. Chỉ icon active có nền tonal; avatar nằm cuối rail.
- Secondary context navigation dùng segmented tabs ngang dưới page heading; dùng cho menu con của từng actor.
- Header không tách thành thanh cao độc lập: page title, utility actions và primary CTA nằm trực tiếp trong content header cao khoảng 96–120 px.
- Main content dùng 12-column asymmetric bento grid, padding 16–24 px và gap 8–12 px.
- Một utility column rộng 240–280 px có thể nằm bên phải cho quick links, alerts hoặc help cards.
- Breadcrumb chỉ xuất hiện từ cấp trang chi tiết.
- Icon rail tự thay đổi icon theo actor nhưng giữ cấu trúc, vị trí logo và avatar giống nhau.

### 3.6 Shared components

- `StatCard`, `StatusChip`, `HorseCard`, `TaskCard`, `AlertCard`.
- `IconRail`, `ContextTabs`, `BentoGrid`, `MetricCapsules`, `UtilityLinkCard`, `HeroMediaCard`.
- `DataTable`, `FilterBar`, `SearchField`, `DateRangePicker`, `Pagination`.
- `Timeline`, `Calendar`, `ScheduleRow`, `ActivityFeed`.
- `FormField`, `Select`, `MultiSelect`, `DateTimePicker`, `Uploader`.
- `Modal`, `Drawer`, `ConfirmationDialog`, `Toast`, `EmptyState`.
- `LineChart`, `BarChart`, `DonutChart`, `ProgressBar`, `KPIGrid`.
- `CapsuleBarChart`, `DottedCapacityMeter`, `ValueBadge`, `SoftDataTable`.
- `Equine3DViewer` có vùng canvas, rotate/zoom controls, legend và annotation panel.

## 4. Shared data mẫu

Dùng thống nhất các dữ liệu sau để các screen liên kết tự nhiên:

- **Thunder Bay** — Thoroughbred, 5 tuổi, Chuồng A-03, Đủ điều kiện, thể lực 92.
- **Silver Comet** — Arabian, 4 tuổi, Chuồng A-07, Cần theo dõi, thể lực 78.
- **Amber Queen** — Thoroughbred, 6 tuổi, Chuồng B-02, Đủ điều kiện, thể lực 86.
- **Red Horizon** — Quarter Horse, 5 tuổi, Chuồng B-05, Chấn thương chân trước trái, BLOCKED.
- **Blue Echo** — Thoroughbred, 3 tuổi, Khu cách ly Q-01, Cách ly.
- Nhân sự mẫu: Nguyễn Hoàng (Head Trainer), Bác sĩ Trần Minh (Vet), Lê An (Groom), Phạm Gia Huy (Owner), Đỗ Lan (Club Manager).
- Sự kiện mẫu: Saigon Autumn Cup — 12/10/2026; National Derby Trial — 25/10/2026.

## 5. Information Architecture tổng thể

### 5.1 Shared routes

- `/login`
- `/notifications`
- `/profile`
- `/settings`
- `/help`

### 5.2 Actor workspace routes

| Workspace | Base route | Số màn hình MVP |
| --- | --- | ---: |
| Head Trainer | `/trainer` | 8 |
| Veterinarian | `/vet` | 9 |
| Groom | `/groom` | 8 |
| Horse Owner | `/owner` | 7 |
| Club Manager | `/manager` | 8 |

Tổng cộng: **40 màn hình actor-specific**, chưa tính shared authentication/settings states.

## 6. Head Trainer Workspace

### 6.1 Sidebar

Tổng quan, Ngựa đua, Giáo án, Lịch huấn luyện, Đánh giá, Thi đấu, Cảnh báo, Báo cáo.

### 6.2 Screen inventory

| ID | Screen | Route | Mục tiêu |
| --- | --- | --- | --- |
| HT-01 | Trainer Dashboard | `/trainer/dashboard` | Tổng quan hiệu suất và lịch hôm nay |
| HT-02 | Horse Roster | `/trainer/horses` | Tìm, lọc và chọn ngựa |
| HT-03 | Horse Performance Detail | `/trainer/horses/:id` | Theo dõi thể lực và lịch sử tập |
| HT-04 | Training Plan Library | `/trainer/plans` | Quản lý giáo án mẫu/đang chạy |
| HT-05 | Training Plan Wizard | `/trainer/plans/new` | Tạo giáo án nhiều bước |
| HT-06 | Daily Training Schedule | `/trainer/schedule` | Xếp lịch và theo dõi buổi tập |
| HT-07 | Session Assessment | `/trainer/assessments/:id` | Bắt đầu và hoàn tất đánh giá |
| HT-08 | Competition Registration | `/trainer/competitions` | Chọn giải và đăng ký ngựa |

### 6.3 HT-01 — Trainer Dashboard

- Content header: greeting hai dòng, context tabs và CTA pill `Tạo giáo án` màu Ink.
- Bento hàng đầu: hai metric cards trung tính, một card Acid Lime cho tỷ lệ hoàn thành và một hero image card “Ngựa nổi bật”.
- Bento chính: capsule bar chart thể lực 7 ngày chiếm 8 cột; utility stack 4 cột cho cảnh báo Vet, lịch thi đấu và quick links.
- Lịch huấn luyện hôm nay hiển thị dạng soft rows với time pill, horse, plan, duration và status.
- Health summary dùng bốn status chips nhỏ; Vet `BLOCKED` dùng coral alert card, không dùng lime.
- CTA: `Tạo giáo án`, `Mở lịch tập`, `Xem cảnh báo`.

### 6.4 HT-05 — Training Plan Wizard

Stepper bốn bước:

1. Chọn ngựa và kiểm tra trạng thái `ALLOWED`.
2. Chọn mục tiêu: sức bền, tốc độ, kỹ thuật, phục hồi.
3. Thiết lập bài tập, cự ly, thời lượng, cường độ và mặt sân.
4. Xếp lịch theo ngày, xem summary và xác nhận.

Nếu ngựa `BLOCKED`, disable nút tiếp tục và hiển thị lý do từ Vet.

### 6.5 HT-07 — Session Assessment

- Header trạng thái `SCHEDULED`, `IN_PROGRESS` hoặc `COMPLETED`.
- Horse summary, lịch khám gần nhất và chỉ số trước buổi tập.
- Form: mức hoàn thành, pace, nhịp tim hồi phục, fatigue, ghi chú.
- CTA thay đổi theo state: `Bắt đầu đánh giá`, `Hoàn tất đánh giá`, `Chỉ xem`.

## 7. Veterinarian Workspace

### 7.1 Sidebar

Tổng quan y tế, Hàng đợi khám, Hồ sơ sức khỏe, Chấn thương 3D, Lịch chăm sóc, Tiêm phòng, Thuốc & vật tư, Sự cố khẩn cấp, Báo cáo.

### 7.2 Screen inventory

| ID | Screen | Route | Mục tiêu |
| --- | --- | --- | --- |
| VT-01 | Health Dashboard | `/vet/dashboard` | Tổng quan sức khỏe toàn đàn |
| VT-02 | Medical Queue | `/vet/queue` | Quản lý ca INITIAL/ROUTINE/URGENT |
| VT-03 | Examination Detail | `/vet/examinations/:id` | Khám và ghi chẩn đoán |
| VT-04 | Horse Medical Record | `/vet/horses/:id/medical` | Timeline hồ sơ y tế |
| VT-05 | Injury 3D Annotation | `/vet/horses/:id/injuries` | Đánh dấu vùng chấn thương |
| VT-06 | Treatment Plan | `/vet/treatments/:id` | Phác đồ, thuốc và tái khám |
| VT-07 | Preventive Care Calendar | `/vet/preventive-care` | Tiêm phòng và khám định kỳ |
| VT-08 | Incident Triage | `/vet/incidents` | Xử lý báo cáo khẩn từ Groom |
| VT-09 | Medication Inventory | `/vet/medications` | Theo dõi thuốc và hạn dùng |

### 7.3 VT-01 — Health Dashboard

- Content header: title editorial `Theo dõi sức khỏe / và chăm sóc chủ động`, context tabs và CTA `Tạo lịch khám`.
- Bento hàng đầu: Đủ điều kiện, Cần theo dõi, BLOCKED, Ca khám hôm nay; card cần chú ý dùng coral/amber, card selected dùng lime.
- Capsule distribution chart thay cho donut mặc định; dùng Ink + status colors và label trực tiếp.
- Medical queue là soft table lớn, urgent row có coral side marker và action pill.
- Utility stack: preventive care sắp đến hạn, thuốc sắp hết và quick access tới 3D injury viewer.
- Heatmap chấn thương nằm trong một module rộng, có body thumbnail và value badges.

### 7.4 VT-03 — Examination Detail

- Split layout: bên trái horse summary + vital signs; bên phải form khám.
- Tabs: Khám tổng quát, Chẩn đoán, Điều trị, Tệp đính kèm, Lịch sử.
- Form vital signs: nhiệt độ, nhịp tim, nhịp thở, cân nặng, pain score.
- Quyết định cuối chỉ có `ALLOWED` hoặc `BLOCKED`.
- Khi chọn `BLOCKED`, bắt buộc nhập lý do và ngày tái khám.

### 7.5 VT-05 — Injury 3D Annotation

- Canvas 3D chiếm khoảng 65% chiều rộng.
- Toolbar rotate, zoom, front/left/right/top view.
- Click mô hình để tạo marker; màu theo severity.
- Drawer bên phải: vùng cơ thể, loại chấn thương, severity, mô tả, ảnh.
- Danh sách marker dưới canvas và CTA `Lưu đánh dấu`.

## 8. Groom / Stable Hand Workspace

### 8.1 Sidebar

Hôm nay, Sơ đồ chuồng, Chăm sóc, Cho ăn, Công việc, Báo cáo sự cố, Vật tư, Nhật ký ca.

### 8.2 Screen inventory

| ID | Screen | Route | Mục tiêu |
| --- | --- | --- | --- |
| GR-01 | Groom Daily Dashboard | `/groom/dashboard` | Danh sách việc theo ca |
| GR-02 | Stable Map | `/groom/stables` | Trạng thái chuồng theo sơ đồ |
| GR-03 | Stall Detail | `/groom/stables/:id` | Thông tin ngựa và vệ sinh chuồng |
| GR-04 | Feeding Schedule | `/groom/feeding` | Thực hiện khẩu phần theo bữa |
| GR-05 | Care Task Board | `/groom/tasks` | Checklist chăm sóc |
| GR-06 | Incident Report Form | `/groom/incidents/new` | Báo cáo bất thường/khẩn cấp |
| GR-07 | Incident History | `/groom/incidents` | Theo dõi trạng thái xử lý |
| GR-08 | Supplies Inventory | `/groom/supplies` | Theo dõi tồn kho và yêu cầu bổ sung |

### 8.3 GR-01 — Groom Daily Dashboard

- Header hiển thị ca làm, context tabs và tiến độ `12/18 việc hoàn thành`.
- Card Acid Lime dùng cho shift progress, hiển thị 18 capsule segments với 12 segment đã hoàn thành.
- Timeline theo giờ chiếm module chính: cho ăn, vệ sinh, chải lông, cân đo, hỗ trợ tập luyện.
- Task row có horse, location, due time, priority và checkbox lớn; hoàn thành bằng motion fill ngắn.
- Stable occupancy mini-map và feeding summary nằm trong hai bento modules lệch kích thước.
- Utility stack: ngựa BLOCKED, thay đổi khẩu phần, Vet cần hỗ trợ và low-stock.
- CTA nổi bật trên mobile: `Báo cáo sự cố`.

### 8.4 GR-02 — Stable Map

- Sơ đồ chuồng A/B/Q dạng grid, mỗi stall là một card.
- Màu trạng thái: trống, đang sử dụng, cần vệ sinh, cách ly, bảo trì.
- Filter theo khu, trạng thái và groom phụ trách.
- Click stall mở drawer với horse, task, nhiệt độ, lần vệ sinh gần nhất.

### 8.5 GR-06 — Incident Report Form

- Đây là form quan sát nhanh, không phải form chẩn đoán y tế.
- Trường: chọn ngựa, nhóm triệu chứng, mức độ lo ngại, vị trí, mô tả, ảnh/video, thời điểm.
- CTA `Gửi báo cáo khẩn` nếu severity cao.
- Sau submit hiển thị confirmation và mã sự cố; hệ thống UI chuyển ngựa sang cảnh báo an toàn trong khi chờ Vet.

## 9. Horse Owner Workspace

### 9.1 Sidebar

Tổng quan, Ngựa của tôi, Sức khỏe, Huấn luyện, Thành tích, Tài chính, Tài liệu.

### 9.2 Screen inventory

| ID | Screen | Route | Mục tiêu |
| --- | --- | --- | --- |
| OW-01 | Owner Dashboard | `/owner/dashboard` | Tổng quan các ngựa sở hữu |
| OW-02 | My Horses | `/owner/horses` | Danh sách chỉ ngựa của owner |
| OW-03 | Horse Profile | `/owner/horses/:id` | Hồ sơ, pedigree và chỉ số |
| OW-04 | Health Tracking | `/owner/horses/:id/health` | Báo cáo sức khỏe được chia sẻ |
| OW-05 | Training & Media | `/owner/horses/:id/training` | Lịch tập, video và ghi chú |
| OW-06 | Race Results | `/owner/results` | Thành tích và lịch thi đấu |
| OW-07 | Finance Report | `/owner/finance` | Chi phí, hóa đơn và doanh thu thưởng |

### 9.3 OW-01 — Owner Dashboard

- Hero greeting editorial và portfolio summary: số ngựa, active training, race entries, monthly cost.
- Hero horse card chiếm module lớn nhất, dùng ảnh crop mạnh, overlay tên ngựa, trainer, health chip và CTA `Xem hồ sơ`.
- Hai metric cards trung tính và một Acid Lime card cho performance highlight.
- Capsule performance trend 30 ngày, upcoming race card và activity utility stack.
- Các ngựa còn lại hiển thị bằng compact image rows thay vì grid card đồng đều.
- Không hiển thị nút chỉnh sửa hồ sơ y tế/giáo án.

### 9.4 OW-03 — Horse Profile

- Hero profile với ảnh ngựa, tên, breed, tuổi, owner, trainer và status.
- Tabs: Tổng quan, Pedigree, Sức khỏe, Huấn luyện, Thành tích, Tài liệu.
- Pedigree tree ba thế hệ.
- KPI: rating, win rate, best time, current weight.

### 9.5 OW-07 — Finance Report

- KPI: chi phí tháng, chi phí y tế, chi phí huấn luyện, tiền thưởng.
- Stacked bar theo tháng và donut theo nhóm chi phí.
- Bảng giao dịch có filter ngựa/tháng/loại và CTA `Tải báo cáo`.

## 10. Club Manager Workspace

### 10.1 Sidebar

Điều hành, Ngựa & chuồng, Nhân sự, Phân quyền, Lịch vận hành, Vật tư, Báo cáo, Nhật ký hệ thống, Cấu hình.

### 10.2 Screen inventory

| ID | Screen | Route | Mục tiêu |
| --- | --- | --- | --- |
| CM-01 | Executive Dashboard | `/manager/dashboard` | KPI toàn câu lạc bộ |
| CM-02 | Horse & Stable Operations | `/manager/operations` | Công suất và tình trạng chuồng |
| CM-03 | Staff Directory | `/manager/staff` | Danh sách và workload nhân sự |
| CM-04 | Role & Permission Management | `/manager/roles` | Quản lý RBAC |
| CM-05 | Master Schedule | `/manager/schedule` | Lịch tổng Vet/Trainer/Groom |
| CM-06 | Inventory Overview | `/manager/inventory` | Vật tư thức ăn, y tế, chuồng trại |
| CM-07 | Performance Reports | `/manager/reports` | Báo cáo KPI và export |
| CM-08 | Audit Log & Settings | `/manager/audit` | Nhật ký thay đổi và cấu hình |

### 10.3 CM-01 — Executive Dashboard

- Đây là dashboard gần reference nhất: title editorial hai dòng, segmented tabs và CTA tối `Tạo tác vụ vận hành`.
- Bento hàng đầu: Operations, Stable Capacity, Staff Workload, Monthly Expense; một card Acid Lime cho KPI nổi bật.
- Một image-led strategy card dùng ảnh đường đua/chuồng trại với overlay text và CTA pill.
- Capsule statistics chart lớn hiển thị 7 ngày, có dotted empty bars và value badges.
- Utility stack bên phải: cảnh báo công suất, vật tư thấp, lịch trùng, ca khẩn chưa nhận và quick links.
- Quick actions: thêm nhân sự, phân quyền, mở báo cáo, xem audit.

### 10.4 CM-04 — Role & Permission Management

- Split layout: role list bên trái, permission matrix bên phải.
- Roles: Head Trainer, Veterinarian, Groom, Horse Owner, Club Manager.
- Permission groups: Horses, Health, Training, Stable, Finance, Users, Reports, Settings.
- Modal gán role cho nhân sự; confirmation khi thay đổi quyền nhạy cảm.
- Access history hiển thị ai thay đổi, thời gian và before/after.

### 10.5 CM-05 — Master Schedule

- Calendar day/week/month với lane theo actor hoặc facility.
- Event màu theo Training, Medical, Feeding, Competition, Maintenance.
- Filter actor, horse, location, priority.
- Click event mở detail drawer; cảnh báo conflict hiển thị cạnh sự kiện.

## 11. Cross-actor workflows

### 11.1 Admission và đưa ngựa vào huấn luyện

`Club Manager tạo hồ sơ → Groom kiểm tra chuồng → Vet khám INITIAL → ALLOWED/BLOCKED → hệ thống tạo Trainer Schedule → Head Trainer đánh giá → Owner xem trạng thái`.

Thiết kế notification và status timeline nhất quán ở từng workspace; mỗi actor chỉ thấy action thuộc quyền của mình.

### 11.2 Sự cố sức khỏe khẩn cấp

`Groom báo sự cố → UI đánh dấu cảnh báo an toàn → Vet nhận URGENT case → khám + điều trị → ALLOWED/BLOCKED → Trainer nhận cảnh báo → Owner nhận bản tóm tắt được chia sẻ`.

### 11.3 Lập và thực hiện giáo án

`Head Trainer tạo giáo án → Groom nhận task hỗ trợ → Trainer ghi kết quả → Vet chỉ can thiệp khi có cảnh báo sức khỏe → Owner xem progress`.

### 11.4 Thi đấu và báo cáo

`Head Trainer chọn giải/ngựa → Vet xác nhận đủ điều kiện → Club Manager duyệt vận hành → Owner xem lịch/kết quả → Manager xem KPI`.

## 12. Interaction and UI states

### 12.1 Required states cho mọi screen

- Default populated state.
- Loading skeleton.
- Empty state có hướng dẫn và CTA phù hợp quyền.
- Inline validation error.
- Permission denied state.
- Network/error placeholder ở cấp card hoặc page.
- Success toast sau create/update mock action.

### 12.2 Interaction patterns

- Card hover nâng 2 px và tăng shadow rất nhẹ; không đổi toàn bộ card thành Acid Lime.
- Segmented tab active trượt bằng một pill indicator trong 180–220 ms.
- Metric number có count-up ngắn; capsule bars grow từ đáy; progress segments sáng dần theo thứ tự.
- Page transition dùng fade + translateY 8–12 px + blur giảm từ 6 px về 0 trong 240–320 ms.
- Drawer/modal dùng scale 0.98 → 1 và opacity; không dùng bounce mạnh.
- Hero image có parallax tối đa 4–6 px khi hover; ưu tiên tinh tế.
- Focus ring 2 px màu Acid Lime trên nền Ink, hoặc Ink trên nền sáng.
- Row click mở detail; action phụ nằm trong kebab menu.
- Destructive action luôn dùng confirmation dialog.
- Status changes có badge trước/sau và timestamp.
- Drawer dùng cho quick detail; full page dùng cho workflow phức tạp.
- Tôn trọng `prefers-reduced-motion`: bỏ blur/parallax/count-up và dùng fade đơn giản.

## 13. Responsive behavior

| Breakpoint | Behavior |
| --- | --- |
| ≥ 1280 px | Floating shell, icon rail 64–72 px, asymmetric 12-column bento grid |
| 768–1279 px | Icon rail 56–64 px, utility column xuống hàng, dashboard 2 cột |
| < 768 px | Shell chiếm toàn màn hình, nav thành bottom bar, card xếp 1 cột |

Mobile priority:

- Groom: task checklist và incident report.
- Vet: medical queue và quick vital entry.
- Trainer: schedule và alerts.
- Owner: horse cards và notifications.
- Manager: KPI summary và approvals.

Table trên mobile chuyển thành stacked list card; không dùng horizontal scroll cho tác vụ cốt lõi.

## 14. Accessibility

- Contrast text tối thiểu 4.5:1.
- Keyboard navigation đầy đủ cho menu, tabs, table, calendar, stepper và modal.
- Focus luôn hiển thị rõ.
- Icon-only button có accessible label/tooltip.
- Status có icon + label, không chỉ màu.
- Chart có legend và text summary.
- Equine3DViewer có alternative 2D body map và danh sách marker cho keyboard/screen reader.
- Image, video thumbnail và horse profile image có alt text.

## 15. Asset direction

- Ảnh ngựa chất lượng cao, ánh sáng tự nhiên, tone xanh/nâu ấm.
- Có thể dùng ảnh kiến trúc chuồng trại/đường đua làm background blur rất nhẹ ngoài app shell.
- Ảnh card dùng cùng aspect ratio 4:3; avatar người dùng 1:1.
- Icon: Lucide, stroke 1.75–2 px, kích thước 18/20/24 px.
- 3D horse placeholder có nền trung tính, không dùng hiệu ứng game quá mạnh.
- Không dùng emoji làm icon chức năng chính.
- Ảnh trong hero card cần crop mạnh, contrast cao hơn card nền và có dark overlay để chữ trắng dễ đọc.

## 16. Google Stitch generation plan

Khuyến nghị tạo theo sáu batch để giảm sai lệch:

1. Shared design system + authentication shell.
2. Head Trainer workspace.
3. Veterinarian workspace.
4. Groom workspace.
5. Horse Owner workspace.
6. Club Manager workspace.

Sau mỗi batch, giữ nguyên colors, typography, spacing, app shell, bento grammar, motion language và sample data của tài liệu này. Tạo dashboard đầu tiên của từng actor trước, sau đó dùng dashboard đó làm visual anchor cho các list/detail/form screens còn lại.

## 17. Copy-ready prompt — Shared foundation

```text
Create a responsive Vietnamese design system for a Racehorse Training & Management System in an Equestrian Neo-Utility / Soft Control Room style. Place the application inside a rounded floating shell on a muted sage or softly blurred architectural background. Use a compact 64–72px black icon rail, large editorial headings, pill context tabs, asymmetric bento grids, off-white and translucent neutral surfaces, minimal borders, deep ink typography and acid-lime (#E6FF57) as a controlled data/selection accent. Use capsule charts, dotted capacity meters, soft data tables, image-led hero cards and a narrow utility-card column. Use Inter, 20–24px card radii and restrained shadows. Build editable components: IconRail, ContextTabs, BentoGrid, StatCard, MetricCapsules, HorseCard, HeroMediaCard, StatusChip, SoftDataTable, FilterBar, TaskCard, ScheduleRow, Timeline, Calendar, FormField, Modal, Drawer, Toast, EmptyState and chart cards. Define subtle 180–320ms fade, slide, blur and bar-grow motion with reduced-motion fallbacks. Include populated, loading, empty, error and permission-denied states. Use Vietnamese labels and shared RTMS sample data. Do not copy reference branding and do not create backend or API screens.
```

## 18. Copy-ready prompt — Head Trainer

```text
Using the RTMS Neo-Utility shared design system, create the complete Head Trainer workspace in Vietnamese. Generate eight connected desktop-first screens: Trainer Dashboard, Horse Roster, Horse Performance Detail, Training Plan Library, four-step Training Plan Wizard, Daily Training Schedule, Session Assessment and Competition Registration. Make the dashboard the visual anchor: two-line editorial greeting, pill tabs, two compact metric cards, one acid-lime performance card, an image-led featured-horse card, a large capsule-bar fitness chart and a right utility stack for alerts and quick actions. Disable training actions for BLOCKED horses. Trainer schedule states are SCHEDULED, IN_PROGRESS and COMPLETED. Keep list/detail/form screens in the same floating-shell, icon-rail and soft-panel language. Include responsive behavior and all UI states.
```

## 19. Copy-ready prompt — Veterinarian

```text
Using the RTMS Neo-Utility shared design system, create the complete Veterinarian workspace in Vietnamese. Generate nine connected screens: Health Dashboard, Medical Queue, Examination Detail, Horse Medical Record, Injury 3D Annotation, Treatment Plan, Preventive Care Calendar, Incident Triage and Medication Inventory. The dashboard uses bento metric cards, a large health-distribution capsule chart, urgent queue rows and a right-side triage utility stack. Prioritize urgent cases with coral, but reserve acid-lime for selection and positive progress. Examination Detail uses a translucent split panel; the final decision is ALLOWED or BLOCKED, and BLOCKED requires reason and recheck date. The 3D injury screen places the horse canvas in the largest rounded module with a slim annotation drawer and accessible 2D alternative.
```

## 20. Copy-ready prompt — Groom / Stable Hand

```text
Using the RTMS Neo-Utility shared design system, create the complete Groom / Stable Hand workspace in Vietnamese, optimized for mobile task execution while retaining desktop layouts. Generate eight connected screens: Groom Daily Dashboard, Stable Map, Stall Detail, Feeding Schedule, Care Task Board, Incident Report Form, Incident History and Supplies Inventory. The dashboard uses a large shift-progress card with segmented acid-lime completion capsules, compact time-task rows, an asymmetric stable occupancy map and a right quick-action stack. Use large checkboxes, tonal stall states, meal controls and low-stock alerts. Incident Report is an observation form, not a diagnosis form; include horse, symptom group, concern level, location, description, media and time. Use coral only for the emergency action.
```

## 21. Copy-ready prompt — Horse Owner

```text
Using the RTMS Neo-Utility shared design system, create the complete Horse Owner workspace in Vietnamese. Generate seven read-focused screens: Owner Dashboard, My Horses, Horse Profile, Health Tracking, Training & Media, Race Results and Finance Report. Make this workspace more editorial and image-led while preserving the same floating shell and icon rail: large horse hero card, compact ownership metrics, capsule performance chart, upcoming-event card and utility links. Only show the signed-in owner's horses. Use premium photography, pedigree tree, video cards, achievement cards and soft finance tables. Do not show controls that edit medical records, plans, staff or permissions.
```

## 22. Copy-ready prompt — Club Manager

```text
Using the RTMS Neo-Utility shared design system, create the complete Club Manager workspace in Vietnamese. Generate eight connected screens: Executive Dashboard, Horse & Stable Operations, Staff Directory, Role & Permission Management, Master Schedule, Inventory Overview, Performance Reports and Audit Log & Settings. Use the densest control-room bento layout of all roles: operations and transfer-style metric cards, a large capsule statistics chart, compact segmented tabs, image-led strategy card and a right utility stack. Emphasize club KPIs, workload, capacity, conflicts, expenses and alerts. Build a soft permission matrix, assignment modal, actor/facility calendar lanes, report filters/export and audit before/after details. Confirm sensitive changes.
```

## 23. Acceptance checklist

### Coverage

- [ ] Có đủ 5 workspace riêng và menu theo role.
- [ ] Head Trainer đủ 8 screen.
- [ ] Veterinarian đủ 9 screen.
- [ ] Groom đủ 8 screen.
- [ ] Horse Owner đủ 7 screen.
- [ ] Club Manager đủ 8 screen.
- [ ] Cross-actor notifications và status dùng cùng thuật ngữ.

### Visual consistency

- [ ] Dùng đúng shared color tokens, typography và spacing.
- [ ] Các page cùng floating shell, compact icon rail, context tabs và component patterns.
- [ ] Dashboard dùng asymmetric bento grid; không biến mọi module thành card kích thước bằng nhau.
- [ ] Acid Lime được dùng có kiểm soát cho selected state, key data và progress; không lạm dụng làm background toàn trang.
- [ ] Chart chính dùng capsule bars/dotted meters và value badges theo reference grammar.
- [ ] Motion giữ trong khoảng 180–320 ms, tinh tế và có reduced-motion fallback.
- [ ] Không dùng emoji thay icon chức năng.
- [ ] Status luôn có label, icon và màu.

### UX completeness

- [ ] Mỗi role có dashboard, list, detail và form/action phù hợp.
- [ ] Có loading, empty, error, success và permission states.
- [ ] Responsive cho desktop, tablet và mobile.
- [ ] Không hiển thị action ngoài quyền actor.
- [ ] Luồng ALLOWED/BLOCKED và incident urgent nhất quán.

### Front-end scope

- [ ] Chỉ dùng mock data.
- [ ] Không tạo backend/database/API administration UI.
- [ ] Tất cả thành phần giao diện editable và có thể chuyển sang React/Tailwind.

---

**Recommended output:** 40 actor-specific screens + shared authentication/settings screens, generated in six consistent Stitch batches.
