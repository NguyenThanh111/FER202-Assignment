# RTMS — UI/UX Delivery Plan

> Kế hoạch thực thi cho **Racehorse Training & Management System**.
> Source of truth về visual, quyền actor và screen anatomy: [`Design.md`](./Design.md).
> Phạm vi hiện tại: **thiết kế UI/UX + front-end prototype với mock data**, chưa triển khai backend.

## 1. Document control

| Thuộc tính | Giá trị |
| --- | --- |
| Project | Racehorse Training & Management System (RTMS) |
| Product language | Tiếng Việt |
| Actors | Head Trainer, Veterinarian, Groom, Horse Owner, Club Manager |
| Visual direction | Equestrian Neo-Utility / Soft Control Room |
| Design generator | Google Stitch theo 6 batch |
| Design source of truth | `Ideas/Design.md` |
| Target screen count | 40 actor-specific screens + shared screens |
| Code scope | React front-end với mock data; stack được khóa ở Phase 0 |

## 2. Mục tiêu

Xây dựng một hệ thống giao diện hoàn chỉnh cho năm actor, trong đó:

- Mỗi actor có workspace, navigation, dashboard và quyền thao tác riêng.
- Toàn bộ sản phẩm dùng chung một visual grammar và component library.
- Dashboard theo phong cách floating control panel: compact icon rail, bento grid bất đối xứng, surface trung tính, Ink + Acid Lime và motion tinh tế.
- Các flow liên actor được mô phỏng nhất quán bằng mock data.
- Thiết kế có thể chuyển sang React/Tailwind mà không cần diễn giải lại layout hoặc trạng thái.

## 3. Non-goals

- Không thiết kế database, REST API, authentication backend hoặc production authorization.
- Không xây admin UI cho hạ tầng/backend.
- Không tạo mọi màn hình trong một Stitch prompt duy nhất.
- Không copy branding, nội dung hoặc bố cục nguyên mẫu từ reference.
- Không dùng screenshot của dashboard làm UI implementation.
- Không ưu tiên 3D hoặc animation phức tạp trước khi shared shell và core flows đạt gate.

## 4. Nguyên tắc thực thi

1. **Design.md thắng khi có mâu thuẫn.** Plan này mô tả thứ tự và deliverable, không định nghĩa lại visual tokens.
2. **Foundation before screens.** Không tạo 40 màn hình trước khi tokens, shell và component primitives được duyệt.
3. **One visual anchor.** Club Manager Dashboard là benchmark gần reference nhất; các dashboard khác kế thừa grammar, không clone layout.
4. **Actor isolation.** Không hiển thị action ngoài quyền role chỉ vì component đã có.
5. **Dashboard-first per actor.** Dashboard khóa density và hierarchy trước khi tạo list/detail/form.
6. **Reusable, not uniform.** Component tái sử dụng nhưng bento composition khác nhau theo actor.
7. **State-complete.** Screen chưa hoàn thành nếu chỉ có populated state.
8. **Responsive by intent.** Mobile ưu tiên tác vụ quan trọng theo role, không chỉ thu nhỏ desktop.
9. **Mock-first contracts.** Data shape được khóa trước khi implementation để tránh mỗi screen dùng một schema khác.
10. **Gate-based delivery.** Chỉ chuyển phase khi acceptance gate trước đó đạt.

## 5. Deliverables

### 5.1 Design deliverables

- Shared foundations: color, type, spacing, radii, shadow, motion.
- Floating app shell và responsive navigation.
- Component library và component states.
- Năm actor dashboards.
- 40 actor-specific screens.
- Shared screens: Login, Notifications, Profile, Settings, Help, Permission Denied.
- Loading, empty, error, validation và success states.
- Desktop, tablet và mobile variants cho screen trọng yếu.
- Prototype links cho bốn cross-actor flows.
- Design QA checklist và handoff notes.

### 5.2 Front-end deliverables

- React application shell và role-based mock routing.
- Design tokens dưới dạng CSS variables/Tailwind theme.
- Reusable UI, data-display và domain components.
- Mock data và deterministic fixtures.
- 40 routes hoặc page compositions tương ứng screen inventory.
- Responsive behavior và reduced-motion fallback.
- Visual QA, accessibility checks, lint và production build.

## 6. Priority model

| Priority | Nội dung | Điều kiện |
| --- | --- | --- |
| P0 | Shared foundations, shell, 5 dashboards, core cross-actor flows | Bắt buộc trước demo |
| P1 | Đủ 40 actor screens và shared states | Bắt buộc để hoàn thành scope |
| P2 | 3D annotation nâng cao, drag-and-drop, video, export simulation | Chỉ làm sau G4 |
| P3 | Real-time simulation, complex motion, theme modes | Ngoài MVP nếu thiếu thời gian |

## 7. Screen delivery matrix

### 7.1 Head Trainer — 8 screens

| ID | Screen | Priority | Primary composition |
| --- | --- | --- | --- |
| HT-01 | Trainer Dashboard | P0 | Editorial header + bento metrics + capsule chart + utility stack |
| HT-02 | Horse Roster | P1 | Filter rail + compact horse rows/cards |
| HT-03 | Horse Performance Detail | P1 | Hero horse card + metric modules + history tabs |
| HT-04 | Training Plan Library | P1 | Segmented tabs + plan cards/table |
| HT-05 | Training Plan Wizard | P0 | Four-step wizard + sticky summary |
| HT-06 | Daily Training Schedule | P0 | Timeline/calendar + status rows |
| HT-07 | Session Assessment | P0 | State-aware form + performance summary |
| HT-08 | Competition Registration | P1 | Event selector + eligibility panel |

### 7.2 Veterinarian — 9 screens

| ID | Screen | Priority | Primary composition |
| --- | --- | --- | --- |
| VT-01 | Health Dashboard | P0 | Health metrics + capsule distribution + urgent queue |
| VT-02 | Medical Queue | P0 | Priority filters + soft data table |
| VT-03 | Examination Detail | P0 | Split clinical form + decision panel |
| VT-04 | Horse Medical Record | P1 | Timeline + tabbed records |
| VT-05 | Injury 3D Annotation | P1 | Large model module + slim annotation drawer |
| VT-06 | Treatment Plan | P1 | Medication plan + recheck schedule |
| VT-07 | Preventive Care Calendar | P1 | Calendar + due-soon utility stack |
| VT-08 | Incident Triage | P0 | Urgent queue + incident detail drawer |
| VT-09 | Medication Inventory | P1 | Inventory table + expiry/stock alerts |

### 7.3 Groom / Stable Hand — 8 screens

| ID | Screen | Priority | Primary composition |
| --- | --- | --- | --- |
| GR-01 | Groom Daily Dashboard | P0 | Shift progress + task timeline + occupancy map |
| GR-02 | Stable Map | P0 | Interactive stall grid + detail drawer |
| GR-03 | Stall Detail | P1 | Horse/stall summary + care history |
| GR-04 | Feeding Schedule | P0 | Meal timeline + completion controls |
| GR-05 | Care Task Board | P0 | Large checkable task rows |
| GR-06 | Incident Report Form | P0 | Mobile-first observation form |
| GR-07 | Incident History | P1 | Status timeline + filters |
| GR-08 | Supplies Inventory | P1 | Inventory list + low-stock action |

### 7.4 Horse Owner — 7 screens

| ID | Screen | Priority | Primary composition |
| --- | --- | --- | --- |
| OW-01 | Owner Dashboard | P0 | Image-led horse hero + portfolio metrics |
| OW-02 | My Horses | P0 | Compact premium horse list |
| OW-03 | Horse Profile | P0 | Hero profile + pedigree + tabs |
| OW-04 | Health Tracking | P1 | Read-only health chart + shared reports |
| OW-05 | Training & Media | P1 | Schedule + video/session cards |
| OW-06 | Race Results | P1 | Achievement modules + event history |
| OW-07 | Finance Report | P1 | Cost metrics + soft transaction table |

### 7.5 Club Manager — 8 screens

| ID | Screen | Priority | Primary composition |
| --- | --- | --- | --- |
| CM-01 | Executive Dashboard | P0 | Reference benchmark control-room dashboard |
| CM-02 | Horse & Stable Operations | P0 | Capacity bento + stable operations table |
| CM-03 | Staff Directory | P1 | Staff rows + workload capsules |
| CM-04 | Role & Permission Management | P0 | Role list + permission matrix |
| CM-05 | Master Schedule | P0 | Multi-lane actor/facility calendar |
| CM-06 | Inventory Overview | P1 | Category metrics + alert table |
| CM-07 | Performance Reports | P1 | KPI filters + chart/report modules |
| CM-08 | Audit Log & Settings | P1 | Audit table + configuration panels |

## 8. Phase roadmap

### Phase 0 — Alignment and scope lock

**Objective:** khóa điều kiện triển khai trước khi tạo assets.

Tasks:

- Xác nhận `Design.md` là source of truth.
- Chốt front-end stack: React + Vite hoặc framework hiện có; TypeScript; Tailwind; router; forms; charts; 3D.
- Chốt output Stitch/Figma và naming convention.
- Khóa 40-screen inventory, P0/P1/P2 và route IDs.
- Khóa mock entities và status vocabulary.
- Tạo baseline checklist cho desktop/tablet/mobile.

Deliverables:

- `screen-inventory.md` hoặc bảng route được duyệt.
- Stack decision record.
- Mock-data contract draft.

**Gate G0:** không còn screen/actor chưa rõ phạm vi; không có hai tên khác nhau cho cùng một status.

### Phase 1 — Visual foundations

**Objective:** xây hệ visual trước component.

Tasks:

- Tạo tokens theo `Design.md`: Outer Canvas, App Shell, Surface, Ink, Acid Lime và semantic status colors.
- Tạo type scale Inter, grid/spacing, radius, shadow và z-index.
- Tạo motion tokens 180–320 ms và reduced-motion mapping.
- Tạo specimens cho surfaces, focus, status, typography và chart palette.

Deliverables:

- Foundations page.
- Token table dùng được cho Stitch và code.
- Accessibility contrast notes.

**Gate G1:** tokens không còn màu xanh/nâu legacy; Acid Lime không thay thế danger/warning semantics; contrast đạt yêu cầu.

### Phase 2 — Shared shell and component system

**Objective:** tạo vocabulary dùng chung cho 40 screens.

Tasks:

- Floating shell, compact icon rail, context tabs, content header và utility stack.
- Buttons, icon buttons, inputs, select, date/time controls, checkbox, tabs.
- Cards: metric, Acid Lime highlight, hero media, alert, utility link.
- Data display: soft table, timeline, calendar row, status chip, avatar.
- Charts: capsule bar, dotted meter, line/area, donut chỉ khi phù hợp.
- Overlay: modal, drawer, confirmation, toast.
- States: skeleton, empty, error, permission denied.

Deliverables:

- Component inventory với default/hover/focus/disabled/error states.
- Desktop/tablet/mobile shell variants.

**Gate G2:** component library có thể dựng CM-01 mà không tạo các one-off primitives lặp lại.

### Phase 3 — Benchmark dashboard: Club Manager

**Objective:** khóa visual density và composition gần reference nhất.

Tasks:

- Tạo CM-01 từ prompt trong `Design.md`.
- Kiểm tra editorial heading, segmented tabs, bento rhythm, Acid Lime balance.
- Tạo capsule statistics chart, image-led strategy card và utility stack.
- Tạo populated/loading/empty/error variants.
- Review ở 1440 px, 1024 px và mobile summary mode.

Deliverables:

- CM-01 approved design.
- Dashboard composition template và list các reusable patterns.

**Gate G3:** CM-01 đạt visual reference grammar mà không sao chép; không có overflow; hierarchy đọc được trong 5 giây.

### Phase 4 — Five actor dashboards

**Objective:** tạo dashboard riêng nhưng cùng family.

Order:

1. CM-01 Executive Dashboard.
2. HT-01 Trainer Dashboard.
3. VT-01 Health Dashboard.
4. GR-01 Groom Daily Dashboard.
5. OW-01 Owner Dashboard.

Actor adaptations:

- Manager: density cao nhất, control-room analytics.
- Trainer: performance và schedule.
- Vet: urgent queue và clinical safety.
- Groom: task execution, mobile-first.
- Owner: image-led và read-focused.

**Gate G4:** cả năm dashboard có shell giống nhau, composition khác nhau, quyền đúng và không actor nào bị xem như bản sao của Vet/Trainer.

### Phase 5 — Core cross-actor flows

**Objective:** hoàn thiện các flow cần cho demo end-to-end.

#### Flow A — Admission to training

`CM operations → Groom stall check → Vet INITIAL exam → ALLOWED/BLOCKED → Trainer assessment → Owner read-only status`.

#### Flow B — Urgent health incident

`Groom incident form → Vet triage → Examination → Treatment/BLOCKED → Trainer alert → Owner summary`.

#### Flow C — Training execution

`Trainer wizard → Daily schedule → Groom support task → Session assessment → Owner progress`.

#### Flow D — Competition

`Trainer registration → Vet eligibility → Manager operations approval → Owner result view`.

Deliverables:

- Linked prototypes.
- Shared notification/status timeline.
- Permission audit per step.

**Gate G5:** mỗi flow có happy path, blocked path và actor handoff state.

### Phase 6 — Remaining P1 screens

**Objective:** hoàn thành inventory 40 screens.

Order khuyến nghị:

1. Trainer remaining screens.
2. Vet remaining screens.
3. Groom remaining screens.
4. Owner remaining screens.
5. Manager remaining screens.

Mỗi screen phải có:

- Route ID và actor owner.
- Populated + loading + empty + error.
- Role-appropriate CTA.
- Responsive notes.
- Components reused/new components recorded.

**Gate G6:** count HT 8, VT 9, GR 8, OW 7, CM 8; không có placeholder screen.

### Phase 7 — Responsive, motion and accessibility pass

**Objective:** biến desktop mockups thành product-ready UX.

Tasks:

- Desktop: 1440/1280 px floating shell.
- Tablet: 1024/768 px, utility stack xuống hàng.
- Mobile: full-screen shell, bottom navigation và prioritized content.
- Table → stacked rows/cards ở mobile.
- Keyboard order, focus states, labels, chart summaries và modal focus trap.
- Reduced-motion variants.
- 3D screen có 2D accessible alternative.

**Gate G7:** không horizontal scroll cho core tasks; tất cả interaction chính dùng keyboard; status không phụ thuộc chỉ vào màu.

### Phase 8 — Front-end implementation foundation

**Objective:** chuyển design system sang code trước khi code 40 pages.

Suggested structure:

```text
src/
  app/
    router/
    providers/
    layouts/
  design-system/
    tokens/
    primitives/
    data-display/
    feedback/
    charts/
  domain/
    horses/
    health/
    training/
    stable/
    competitions/
    finance/
    users/
  actors/
    trainer/
    veterinarian/
    groom/
    owner/
    manager/
  mocks/
    fixtures/
    scenarios/
  assets/
    images/
    models/
```

Rules:

- CSS variables là nguồn token; Tailwind mapping tới variables.
- Actor layouts compose shared shell; không duplicate shell theo role.
- Mock scenarios deterministic: default, empty, urgent, blocked, permission denied.
- Recharts hoặc một chart library duy nhất.
- React Three Fiber chỉ load ở route 3D bằng lazy import.
- Không dùng emoji làm functional icon; dùng Lucide.

**Gate G8:** shell + foundations + CM-01 code match design trước khi mở rộng routes.

### Phase 9 — Actor implementation

Implementation order:

1. Shared screens and CM-01 benchmark.
2. Head Trainer routes.
3. Veterinarian routes.
4. Groom routes.
5. Horse Owner routes.
6. Club Manager remaining routes.
7. Cross-actor scenario navigation.

For each route:

- Implement layout and data state.
- Wire mock interaction/state transition.
- Verify desktop/tablet/mobile.
- Verify keyboard and reduced motion.
- Record visual deviations from Design.md.

### Phase 10 — QA and handoff

Checks:

- Visual comparison against approved dashboard anchors.
- Route and permission matrix audit.
- Responsive screenshots at key breakpoints.
- Keyboard-only navigation.
- Contrast and accessible names.
- No clipped text/overflow.
- Mock data consistency across actors.
- Lint and production build.
- 3D model lazy-load and fallback.

Deliverables:

- QA report.
- Screen completion matrix.
- Component usage documentation.
- Known limitations/P2 backlog.

**Gate G9:** Definition of Done đạt và không còn blocking visual/permission defect.

## 9. Component backlog

### 9.1 P0 foundations and navigation

- `FloatingAppShell`
- `IconRail`
- `RoleSwitcher` chỉ dành cho demo, không xuất hiện nếu user không có nhiều role.
- `ContentHeader`
- `ContextTabs`
- `UtilityStack`
- `ResponsiveBottomNav`

### 9.2 P0 cards and data display

- `MetricCard`
- `HighlightMetricCard`
- `HeroMediaCard`
- `StatusChip`
- `AlertCard`
- `UtilityLinkCard`
- `SoftDataTable`
- `ScheduleRow`
- `Timeline`
- `CapsuleBarChart`
- `DottedCapacityMeter`
- `ValueBadge`

### 9.3 P0 forms and feedback

- `Field`, `Select`, `MultiSelect`, `DateTimePicker`, `Uploader`.
- `Stepper`, `StickySummary`, `ValidationMessage`.
- `Modal`, `Drawer`, `ConfirmationDialog`, `Toast`.
- `Skeleton`, `EmptyState`, `ErrorState`, `PermissionDenied`.

### 9.4 P1 domain components

- `HorseCompactRow`, `HorseHero`, `PedigreeTree`.
- `MedicalQueueRow`, `VitalSignsPanel`, `TrainingDecisionPanel`.
- `Equine3DViewer`, `BodyMap2D`, `InjuryMarkerPanel`.
- `StableGrid`, `StallCard`, `MealTaskRow`, `IncidentSummary`.
- `TrainingPlanCard`, `SessionAssessmentForm`, `CompetitionCard`.
- `PermissionMatrix`, `AuditDiff`, `StaffWorkloadRow`.

## 10. Mock data contract

Entities cần khóa trước implementation:

- `Horse`, `Owner`, `Staff`, `Stable`, `Stall`.
- `TrainingPlan`, `TrainingSession`, `TrainerSchedule`.
- `CareSchedule`, `HealthRecord`, `Injury`, `TreatmentPlan`.
- `IncidentReport`, `FeedingPlan`, `CareTask`.
- `Competition`, `RaceResult`, `Expense`, `InventoryItem`.
- `Notification`, `AuditEvent`, `Role`, `Permission`.

Required mock scenarios:

- Healthy/default herd.
- Horse `BLOCKED` with recheck date.
- Urgent Groom incident awaiting Vet.
- Empty schedule.
- Low-stock medication/feed.
- Permission denied.
- Completed training assessment.
- Upcoming competition eligibility conflict.

## 11. Stitch generation workflow

Không chạy một prompt cho toàn bộ 40 screens.

### Batch sequence

1. Shared foundation prompt — `Design.md` section 17.
2. Club Manager prompt — tạo CM-01 trước để khóa reference grammar.
3. Head Trainer prompt.
4. Veterinarian prompt.
5. Groom prompt.
6. Horse Owner prompt.
7. Club Manager remaining screens.

### Per-batch loop

1. Generate dashboard/anchor screen.
2. Compare với token and shell checklist.
3. Correct drift before generating more screens.
4. Generate list/detail/form screens from approved anchor.
5. Add missing states and responsive variants.
6. Record new component; reuse it in later batches.

### Common drift to reject

- Sidebar tự mở rộng thành 220–260 px.
- Toàn bộ app chuyển về xanh lá/nâu legacy.
- Acid Lime phủ quá nhiều surface.
- Tất cả cards có cùng size và hierarchy.
- Dashboard biến thành admin template generic.
- Motion quá bounce hoặc glow mạnh.
- Actor có action ngoài quyền.

## 12. Verification matrix

| Area | Check | Evidence |
| --- | --- | --- |
| Coverage | 40 actor screens + shared screens | Screen inventory |
| Visual | Shell, icon rail, bento, Acid Lime balance | Desktop screenshots |
| Permissions | CTA/action đúng actor | Permission matrix |
| States | Populated/loading/empty/error/permission | State boards |
| Responsive | Desktop/tablet/mobile | Breakpoint screenshots |
| Motion | 180–320 ms + reduced motion | Prototype/video capture |
| Accessibility | Contrast, focus, labels, keyboard | Audit checklist |
| Code | Lint + production build | Command logs |
| Data | Shared entities/status across roles | Fixture review |

## 13. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Stitch visual drift giữa batches | Năm actor trông như năm sản phẩm | Dùng CM-01 anchor và foundation prompt ở mọi batch |
| 40 screens vượt thời gian | Scope chưa hoàn chỉnh | P0/P1 priority và gate dashboard/core-flow trước |
| Acid Lime làm mất health semantics | Warning/danger khó hiểu | Lime chỉ selection/progress; coral/amber cho clinical risk |
| Component hóa quá sớm | Layout bị đồng đều, mất bento rhythm | Khóa composition trước, component hóa phần lặp thật sự |
| 3D gây chậm | Block core delivery | P1/P2, lazy-load, 2D fallback |
| Desktop đẹp nhưng mobile yếu | Groom/Vet task khó dùng | Mobile priority theo actor từ Phase 4 |
| Mock data không đồng nhất | Flow liên actor bị đứt | Shared fixture IDs và scenario contracts |

## 14. Progress tracker

### Foundations

- [ ] G0 — Scope/stack/status vocabulary locked.
- [ ] G1 — Visual foundations approved.
- [ ] G2 — Shared shell/component system approved.
- [ ] G3 — CM-01 benchmark dashboard approved.

### Actor dashboards

- [ ] CM-01 Club Manager.
- [ ] HT-01 Head Trainer.
- [ ] VT-01 Veterinarian.
- [ ] GR-01 Groom.
- [ ] OW-01 Horse Owner.
- [ ] G4 — Five-dashboard consistency gate.

### Core flows

- [ ] Admission to training.
- [ ] Urgent health incident.
- [ ] Training execution.
- [ ] Competition and results.
- [ ] G5 — Cross-actor flow gate.

### Screen completion

- [ ] HT 8/8.
- [ ] VT 9/9.
- [ ] GR 8/8.
- [ ] OW 7/7.
- [ ] CM 8/8.
- [ ] G6 — 40-screen gate.

### Quality and implementation

- [ ] G7 — Responsive/accessibility/motion pass.
- [ ] G8 — Code foundation and benchmark parity.
- [ ] All P0/P1 routes implemented.
- [ ] G9 — QA and handoff complete.

## 15. Definition of Done

Project UI/UX scope hoàn thành khi:

- Đủ 40 actor-specific screens và shared screens đã định nghĩa.
- Năm workspace dùng chung Neo-Utility design system nhưng phản ánh đúng nhiệm vụ mỗi actor.
- Bốn cross-actor flows có prototype happy/blocked paths.
- Mỗi screen có states phù hợp, không chỉ default.
- Desktop/tablet/mobile đã kiểm tra cho core tasks.
- Acid Lime, danger, warning và info semantics đúng.
- Motion tinh tế và có reduced-motion fallback.
- Front-end dùng shared tokens/components, mock data nhất quán.
- Lint và production build thành công.
- Không còn lỗi blocking về overflow, clipping, quyền hoặc accessibility.
- Design/code deviations và P2 backlog được ghi rõ trong handoff.

---

**Execution recommendation:** hoàn tất G0–G3 trước khi tạo hàng loạt màn hình; hoàn tất G4–G5 trước khi mở rộng đủ 40 screens; chỉ bắt đầu P2 sau khi G6 đạt.
