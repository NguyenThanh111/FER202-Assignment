// Danh mục giải phẫu tiêu chuẩn của ngựa phục vụ đánh dấu bệnh án (28 phân vùng chuẩn quốc tế)
export const HORSE_ANATOMY_PARTS = [
  { id: 'head', nameVi: 'Đầu & Mặt', nameEn: 'Head & Face', zone: 'Đầu' },
  { id: 'poll', nameVi: 'Đỉnh đầu / Gáy', nameEn: 'Poll (Occiput)', zone: 'Đầu' },
  { id: 'neck', nameVi: 'Cổ & Cơ cổ', nameEn: 'Cervical Spine & Neck', zone: 'Cổ' },
  { id: 'withers', nameVi: 'U vai (Vai gáy)', nameEn: 'Withers', zone: 'Thân' },
  { id: 'back', nameVi: 'Lưng & Cột sống ngực', nameEn: 'Thoracic Back & Spine', zone: 'Thân' },
  { id: 'loin', nameVi: 'Thắt lưng & Cột sống thắt lưng', nameEn: 'Loin & Lumbar', zone: 'Thân' },
  { id: 'croup', nameVi: 'Hông & Khung chậu', nameEn: 'Croup & Pelvis', zone: 'Thân' },
  { id: 'shoulder_fl', nameVi: 'Khớp bả vai trước (Trái)', nameEn: 'Left Shoulder Joint', zone: 'Chân trước' },
  { id: 'shoulder_fr', nameVi: 'Khớp bả vai trước (Phải)', nameEn: 'Right Shoulder Joint', zone: 'Chân trước' },
  { id: 'knee_fl', nameVi: 'Khớp gối trước (Trái - Carpus)', nameEn: 'Left Carpus (Knee)', zone: 'Chân trước' },
  { id: 'knee_fr', nameVi: 'Khớp gối trước (Phải - Carpus)', nameEn: 'Right Carpus (Knee)', zone: 'Chân trước' },
  { id: 'cannon_fl', nameVi: 'Ống chân & Gân gấp SDFT (Trước Trái)', nameEn: 'Left Fore Cannon & SDFT', zone: 'Chân trước' },
  { id: 'cannon_fr', nameVi: 'Ống chân & Gân gấp SDFT (Trước Phải)', nameEn: 'Right Fore Cannon & SDFT', zone: 'Chân trước' },
  { id: 'fetlock_fl', nameVi: 'Khớp cổ chân (Trước Trái - Fetlock)', nameEn: 'Left Front Fetlock', zone: 'Chân trước' },
  { id: 'fetlock_fr', nameVi: 'Khớp cổ chân (Trước Phải - Fetlock)', nameEn: 'Right Front Fetlock', zone: 'Chân trước' },
  { id: 'hoof_fl', nameVi: 'Móng guốc trước (Trái)', nameEn: 'Left Front Hoof', zone: 'Chân trước' },
  { id: 'hoof_fr', nameVi: 'Móng guốc trước (Phải)', nameEn: 'Right Front Hoof', zone: 'Chân trước' },
  { id: 'stifle_hl', nameVi: 'Khớp gối sau (Trái - Stifle)', nameEn: 'Left Stifle Joint', zone: 'Chân sau' },
  { id: 'stifle_hr', nameVi: 'Khớp gối sau (Phải - Stifle)', nameEn: 'Right Stifle Joint', zone: 'Chân sau' },
  { id: 'hock_hl', nameVi: 'Khớp khuỷu sau (Trái - Hock)', nameEn: 'Left Hock Joint', zone: 'Chân sau' },
  { id: 'hock_hr', nameVi: 'Khớp khuỷu sau (Phải - Hock)', nameEn: 'Right Hock Joint', zone: 'Chân sau' },
  { id: 'cannon_hl', nameVi: 'Ống chân sau (Trái)', nameEn: 'Left Hind Cannon', zone: 'Chân sau' },
  { id: 'cannon_hr', nameVi: 'Ống chân sau (Phải)', nameEn: 'Right Hind Cannon', zone: 'Chân sau' },
  { id: 'fetlock_hl', nameVi: 'Khớp cổ chân sau (Trái)', nameEn: 'Left Hind Fetlock', zone: 'Chân sau' },
  { id: 'fetlock_hr', nameVi: 'Khớp cổ chân sau (Phải)', nameEn: 'Right Hind Fetlock', zone: 'Chân sau' },
  { id: 'hoof_hl', nameVi: 'Móng guốc sau (Trái)', nameEn: 'Left Hind Hoof', zone: 'Chân sau' },
  { id: 'hoof_hr', nameVi: 'Móng guốc sau (Phải)', nameEn: 'Right Hind Hoof', zone: 'Chân sau' },
  { id: 'flank', nameVi: 'Mạn sườn & Bụng', nameEn: 'Flank & Ribs', zone: 'Thân' },
]

// Phân cấp mức độ nghiêm trọng chuẩn thú y
export const SEVERITY_LEVELS = {
  severe: {
    key: 'severe',
    label: 'Nặng / Cấp tính',
    color: '#ef4444',
    ringColor: 'rgba(239, 68, 68, 0.65)',
    text: 'Cần can thiệp gấp',
    badgeClass: 'severity-severe',
  },
  moderate: {
    key: 'moderate',
    label: 'Trung bình',
    color: '#f97316',
    ringColor: 'rgba(249, 115, 22, 0.55)',
    text: 'Điều trị ngoại trú',
    badgeClass: 'severity-moderate',
  },
  mild: {
    key: 'mild',
    label: 'Nhẹ / Theo dõi',
    color: '#3b82f6',
    ringColor: 'rgba(59, 130, 246, 0.5)',
    text: 'Cần theo dõi sát',
    badgeClass: 'severity-mild',
  },
  recovered: {
    key: 'recovered',
    label: 'Đã phục hồi',
    color: '#10b981',
    ringColor: 'rgba(16, 185, 129, 0.45)',
    text: 'Phục hồi tốt',
    badgeClass: 'severity-recovered',
  },
}

// Thang điểm đau chuẩn lâm sàng thú y (Equine Pain Scale 1 - 5)
export const PAIN_SCORES = {
  1: { score: 1, label: 'Rất nhẹ', desc: 'Chỉ khó chịu khi sờ nắn sâu, dáng đi bình thường', color: '#10b981' },
  2: { score: 2, label: 'Nhẹ', desc: 'Phản ứng giật nhẹ khi ấn, không khập khiễng', color: '#3b82f6' },
  3: { score: 3, label: 'Vừa', desc: 'Đau rõ rệt khi sờ nắn, khập khiễng nhẹ khi chạy', color: '#f59e0b' },
  4: { score: 4, label: 'Nặng', desc: 'Đau nhiều, sưng nóng rõ, khập khiễng khi đi bước thường', color: '#f97316' },
  5: { score: 5, label: 'Nghiêm trọng', desc: 'Đau dữ dội, không chịu tì chân, sốt cục bộ hoặc toàn thân', color: '#ef4444' },
}

export const PAIN_SCORE_LIST = Object.values(PAIN_SCORES)

export function getAnatomyPart(id) {
  return HORSE_ANATOMY_PARTS.find((part) => part.id === id) || null
}

export function getSeverityConfig(severity) {
  return SEVERITY_LEVELS[severity] || SEVERITY_LEVELS.severe
}
