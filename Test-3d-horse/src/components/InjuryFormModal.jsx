import React, { useState } from 'react'
import { HORSE_ANATOMY_PARTS } from '../data/anatomyPresets'

const QUICK_INJURY_PRESETS = [
  { title: 'Viêm gân cơ gấp ngón nông (SDFT)', part: 'cannon_fl', severity: 'severe', pain: 4 },
  { title: 'Tràn dịch khớp gối sau (Stifle Effusion)', part: 'stifle_hr', severity: 'moderate', pain: 3 },
  { title: 'Bong gân khớp cổ chân (Fetlock Sprain)', part: 'fetlock_fl', severity: 'moderate', pain: 3 },
  { title: 'Nứt xương ống chân (Cannon Fracture)', part: 'cannon_hl', severity: 'severe', pain: 5 },
  { title: 'Áp xe móng guốc (Hoof Abscess)', part: 'hoof_fl', severity: 'severe', pain: 4 },
  { title: 'Căng cơ thắt lưng & hông (Loin Strain)', part: 'loin', severity: 'mild', pain: 2 },
  { title: 'Trầy xước mô mềm cọ sát yên (Withers)', part: 'withers', severity: 'mild', pain: 1 },
]

const FORM_SEVERITY_OPTIONS = [
  { id: 'severe', label: 'Nặng / Cấp tính', color: '#ef4444' },
  { id: 'moderate', label: 'Trung bình', color: '#f97316' },
  { id: 'mild', label: 'Nhẹ', color: '#3b82f6' },
  { id: 'recovered', label: 'Đã phục hồi', color: '#10b981' },
]

export default function InjuryFormModal({ pendingPoint, onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [anatomyPart, setAnatomyPart] = useState(HORSE_ANATOMY_PARTS[0].id)
  const [severity, setSeverity] = useState('severe')
  const [painScore, setPainScore] = useState(3)
  const [radius, setRadius] = useState(0.12)
  const [notes, setNotes] = useState('')
  const [treatmentPlan, setTreatmentPlan] = useState('')
  const [veterinarian, setVeterinarian] = useState('Dr. Nguyễn Văn An (Bác sĩ thú y chính)')

  if (!pendingPoint) return null

  const selectedPart = HORSE_ANATOMY_PARTS.find((p) => p.id === anatomyPart) || HORSE_ANATOMY_PARTS[0]

  const handleApplyPreset = (preset) => {
    setTitle(preset.title)
    if (preset.part) setAnatomyPart(preset.part)
    if (preset.severity) setSeverity(preset.severity)
    if (preset.pain) setPainScore(preset.pain)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newInjury = {
      id: `inj-${Date.now()}`,
      title: title.trim(),
      anatomyPart: selectedPart.id,
      anatomyName: selectedPart.nameVi,
      zone: selectedPart.zone,
      severity,
      position: pendingPoint.position,
      normal: pendingPoint.normal || [0, 1, 0],
      radius: parseFloat(radius),
      painScore: Number(painScore),
      veterinarian: veterinarian.trim(),
      notes: notes.trim(),
      treatmentPlan: treatmentPlan.trim(),
      date: new Date().toISOString().split('T')[0],
      status: severity === 'recovered' ? 'recovered' : 'in_treatment',
    }

    onSave(newInjury)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-slide-in">
        <div className="modal-header">
          <div>
            <h3>🩺 Ghi Nhận Tổn Thương & Bệnh Án Lâm Sàng</h3>
            <p className="modal-subtitle">
              Tọa độ 3D bề mặt: [{pendingPoint.position.map((v) => Number(v).toFixed(2)).join(', ')}]
            </p>
          </div>
          <button type="button" className="btn-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Gợi ý nhanh các bệnh lý thường gặp */}
          <div className="form-group">
            <label>Gợi ý nhanh bệnh lý thường gặp:</label>
            <div className="quick-tags">
              {QUICK_INJURY_PRESETS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  className="tag-btn"
                  onClick={() => handleApplyPreset(preset)}
                >
                  + {preset.title.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Tên chấn thương */}
          <div className="form-group">
            <label htmlFor="inj-title">
              Tên bệnh lý / chấn thương <span className="req">*</span>
            </label>
            <input
              id="inj-title"
              type="text"
              placeholder="VD: Viêm gân SDFT, Rạn xương ống chân..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Vị trí giải phẫu */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="inj-anatomy">Phân vùng giải phẫu chuẩn</label>
              <select
                id="inj-anatomy"
                value={anatomyPart}
                onChange={(e) => setAnatomyPart(e.target.value)}
              >
                {HORSE_ANATOMY_PARTS.map((part) => (
                  <option key={part.id} value={part.id}>
                    [{part.zone}] {part.nameVi} ({part.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Mức độ nghiêm trọng */}
            <div className="form-group flex-1">
              <label>Mức độ nghiêm trọng</label>
              <div className="severity-selector">
                {FORM_SEVERITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`severity-opt ${severity === opt.id ? 'active' : ''}`}
                    style={{
                      borderColor: opt.color,
                      backgroundColor: severity === opt.id ? opt.color : 'transparent',
                      color: severity === opt.id ? '#ffffff' : opt.color,
                    }}
                    onClick={() => setSeverity(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Thang điểm đau (Pain scale 1 - 5) */}
          <div className="form-group">
            <div className="label-with-value">
              <label>Thang điểm đau lâm sàng (Pain Score)</label>
              <span className="pain-score-display">
                Mức {painScore}/5: {
                  painScore === 1 ? 'Đau nhẹ khi chạm' :
                  painScore === 2 ? 'Khó chịu / Nhấc chân' :
                  painScore === 3 ? 'Đau vừa / Khập khiễng nhẹ' :
                  painScore === 4 ? 'Đau dữ dội / Co quắp chân' : 'Không thể tì đè / Cực độ'
                }
              </span>
            </div>
            <div className="pain-scale-selector">
              {[1, 2, 3, 4, 5].map((score) => {
                const colors = ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444']
                const isAct = painScore === score
                return (
                  <button
                    key={score}
                    type="button"
                    className={`pain-btn ${isAct ? 'active' : ''}`}
                    style={{
                      backgroundColor: isAct ? colors[score - 1] : '#1e293b',
                      borderColor: colors[score - 1],
                      color: isAct ? '#ffffff' : colors[score - 1],
                    }}
                    onClick={() => setPainScore(score)}
                  >
                    {score} {score === 1 ? '• Nhẹ' : score === 5 ? '• Cực độ' : ''}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bán kính vùng ảnh hưởng đỏ */}
          <div className="form-group">
            <div className="label-with-value">
              <label htmlFor="inj-radius">Bán kính vùng tổn thương (Vùng đỏ trên 3D)</label>
              <span className="slider-val">{(radius * 100).toFixed(0)} cm</span>
            </div>
            <input
              id="inj-radius"
              type="range"
              min="0.06"
              max="0.30"
              step="0.02"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
          </div>

          {/* Triệu chứng & Ghi chú lâm sàng */}
          <div className="form-group">
            <label htmlFor="inj-notes">Ghi chú lâm sàng / Triệu chứng quan sát</label>
            <textarea
              id="inj-notes"
              rows="2"
              placeholder="Sưng nóng, phản ứng đau khi sờ nắn, mức độ khập khiễng..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Phác đồ điều trị */}
          <div className="form-group">
            <label htmlFor="inj-treatment">Phác đồ điều trị đề xuất</label>
            <textarea
              id="inj-treatment"
              rows="2"
              placeholder="Thuốc kháng viêm NSAID, chườm lạnh, băng ép, nghỉ ngơi chuồng..."
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
            />
          </div>

          {/* Bác sĩ phụ trách */}
          <div className="form-group">
            <label htmlFor="inj-vet">Bác sĩ thú y phụ trách</label>
            <input
              id="inj-vet"
              type="text"
              value={veterinarian}
              onChange={(e) => setVeterinarian(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-save">
              ✓ Xác Nhận Lưu & Gắn Điểm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
