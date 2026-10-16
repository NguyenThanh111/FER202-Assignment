import React, { useState } from 'react'

const SEVERITY_CONFIG = {
  severe: { label: 'Nặng', color: '#ef4444' },
  moderate: { label: 'Trung bình', color: '#f97316' },
  mild: { label: 'Nhẹ', color: '#3b82f6' },
  recovered: { label: 'Đã phục hồi', color: '#10b981' },
}

export default function Sidebar({
  injuries,
  selectedInjury,
  onSelectInjury,
  onDeleteInjury,
  isAddMode,
  setIsAddMode,
  showLabels,
  setShowLabels,
  autoRotate,
  setAutoRotate,
  isPlayingAnimation,
  setIsPlayingAnimation,
  onCameraPreset,
  currentModel = '/models/horse_-_realistic_3d_model_demo_free.glb',
  setCurrentModel,
}) {
  const [filterSeverity, setFilterSeverity] = useState('all')

  const filteredInjuries = injuries.filter((inj) => {
    if (filterSeverity === 'all') return true
    return inj.severity === filterSeverity
  })

  // Thống kê theo 4 mức độ: Nặng (đỏ), Trung bình (cam), Nhẹ (xanh dương), Đã phục hồi (xanh lá)
  const stats = {
    total: injuries.length,
    severe: injuries.filter((i) => i.severity === 'severe').length,
    moderate: injuries.filter((i) => i.severity === 'moderate').length,
    mild: injuries.filter((i) => i.severity === 'mild').length,
    recovered: injuries.filter((i) => i.severity === 'recovered').length,
  }

  return (
    <aside className="sidebar">
      {/* 1. Header & Thương hiệu RTMS Equine Clinic */}
      <div className="sidebar-brand">
        <div className="brand-icon">🐎</div>
        <div>
          <h1 className="brand-title">BỆNH ÁN GIẢI PHẪU 3D</h1>
          <p className="brand-desc">Hệ Thống Đánh Dấu Tổn Thương Ngựa Đua</p>
        </div>
      </div>

      {/* 2. Chọn Mô hình 3D */}
      <div className="sidebar-section">
        <label className="section-label">MÔ HÌNH 3D GIẢI PHẪU</label>
        <select
          className="model-select"
          value={currentModel}
          onChange={(e) => setCurrentModel && setCurrentModel(e.target.value)}
        >
          <option value="/models/horse_-_realistic_3d_model_demo_free.glb">
            🐎 Ngựa tả thực 3D (Full Muscle/Skin)
          </option>
          <option value="/models/horse_skeleton.glb">
            🦴 Khung xương giải phẫu (Skeleton X-Ray)
          </option>
          <option value="/models/horse_free_download.glb">
            🐎 Ngựa tả thực tĩnh (Low-poly Realistic)
          </option>
          <option value="/models/horse.glb">
            🐎 Mô hình giải phẫu cơ bản
          </option>
        </select>
      </div>

      {/* 3. Chuyển chế độ tương tác */}
      <div className="sidebar-section">
        <label className="section-label">CHẾ ĐỘ TƯƠNG TÁC</label>
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${!isAddMode ? 'active' : ''}`}
            onClick={() => setIsAddMode(false)}
          >
            <span>🔄</span> Xoay & Quan sát
          </button>
          <button
            type="button"
            className={`mode-btn add-btn ${isAddMode ? 'active' : ''}`}
            onClick={() => {
              setIsAddMode(true)
              setIsPlayingAnimation?.(false)
            }}
          >
            <span>📍</span> Gắn chấn thương
          </button>
        </div>
        {isAddMode && (
          <div className="add-mode-hint animate-fade-in">
            <span className="hint-icon">🎯</span>
            <span>
              Click trực tiếp lên bề mặt thân ngựa để định vị mốc tổn thương và mở bệnh án lâm sàng.
            </span>
          </div>
        )}
      </div>

      {/* 4. Phím tắt góc nhìn giải phẫu */}
      <div className="sidebar-section">
        <label className="section-label">GÓC NHÌN GIẢI PHẪU</label>
        <div className="camera-grid">
          <button
            type="button"
            className="cam-btn"
            onClick={() => onCameraPreset('left')}
            title="Nhìn mạn trái"
          >
            Mạn Trái
          </button>
          <button
            type="button"
            className="cam-btn"
            onClick={() => onCameraPreset('right')}
            title="Nhìn mạn phải"
          >
            Mạn Phải
          </button>
          <button
            type="button"
            className="cam-btn"
            onClick={() => onCameraPreset('front')}
            title="Nhìn phía trước"
          >
            Phía Trước
          </button>
          <button
            type="button"
            className="cam-btn"
            onClick={() => onCameraPreset('rear')}
            title="Nhìn phía sau"
          >
            Phía Sau
          </button>
          <button
            type="button"
            className="cam-btn"
            onClick={() => onCameraPreset('top')}
            title="Nhìn từ trên xuống"
          >
            Nhìn Từ Trên
          </button>
          <button
            type="button"
            className="cam-btn reset-cam"
            onClick={() => onCameraPreset('reset')}
            title="Góc nhìn toàn cảnh chuẩn"
          >
            🏠 Toàn Cảnh (Reset)
          </button>
        </div>
      </div>

      {/* 5. Tùy chọn hiển thị 3D */}
      <div className="sidebar-section">
        <label className="section-label">TÙY CHỌN HIỂN THỊ 3D</label>
        <div className="toggle-list">
          <label className="toggle-item">
            <span>Bật nhãn chỉ đường 3D (Callouts)</span>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
          </label>
          <label className="toggle-item">
            <span>Tự động xoay quanh ngựa</span>
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
            />
          </label>
          <label className="toggle-item">
            <span>Hoạt cảnh bước chạy (Trot)</span>
            <input
              type="checkbox"
              checked={isPlayingAnimation}
              onChange={(e) => setIsPlayingAnimation(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* 6. Thống kê & Bộ lọc chấn thương */}
      <div className="sidebar-section flex-grow">
        <div className="stats-header">
          <label className="section-label">
            DANH SÁCH CHẤN THƯƠNG ({injuries.length})
          </label>
          <div className="stats-badges">
            <span
              className={`stat-badge severe ${filterSeverity === 'severe' ? 'active' : ''}`}
              title="Lọc mức độ Nặng"
              onClick={() => setFilterSeverity(filterSeverity === 'severe' ? 'all' : 'severe')}
            >
              Nặng: {stats.severe}
            </span>
            <span
              className={`stat-badge moderate ${filterSeverity === 'moderate' ? 'active' : ''}`}
              title="Lọc mức độ Trung bình"
              onClick={() => setFilterSeverity(filterSeverity === 'moderate' ? 'all' : 'moderate')}
            >
              TB: {stats.moderate}
            </span>
            <span
              className={`stat-badge mild ${filterSeverity === 'mild' ? 'active' : ''}`}
              title="Lọc mức độ Nhẹ"
              onClick={() => setFilterSeverity(filterSeverity === 'mild' ? 'all' : 'mild')}
            >
              Nhẹ: {stats.mild}
            </span>
            <span
              className={`stat-badge recovered ${filterSeverity === 'recovered' ? 'active' : ''}`}
              title="Lọc mức độ Đã phục hồi"
              onClick={() => setFilterSeverity(filterSeverity === 'recovered' ? 'all' : 'recovered')}
            >
              Hồi phục: {stats.recovered}
            </span>
          </div>
        </div>

        {filterSeverity !== 'all' && (
          <div className="active-filter-bar">
            <span>Đang lọc: {SEVERITY_CONFIG[filterSeverity]?.label}</span>
            <button
              type="button"
              className="btn-clear-filter"
              onClick={() => setFilterSeverity('all')}
            >
              ✕ Bỏ lọc
            </button>
          </div>
        )}

        <div className="injury-list">
          {filteredInjuries.length === 0 ? (
            <div className="empty-state">
              Không có chấn thương nào trong bộ lọc này.
            </div>
          ) : (
            filteredInjuries.map((inj) => {
              const sev = SEVERITY_CONFIG[inj.severity] || SEVERITY_CONFIG.severe
              const isSel = selectedInjury?.id === inj.id
              const pain = inj.painScore || (inj.severity === 'severe' ? 4 : inj.severity === 'moderate' ? 3 : 1)
              return (
                <div
                  key={inj.id}
                  className={`injury-item ${isSel ? 'selected' : ''}`}
                  onClick={() => onSelectInjury(inj)}
                >
                  <div
                    className="severity-indicator"
                    style={{ backgroundColor: sev.color }}
                  />
                  <div className="injury-item-content">
                    <div className="injury-item-title">{inj.title}</div>
                    <div className="injury-item-sub">
                      📍 {inj.anatomyName} • <span style={{ color: sev.color, fontWeight: 600 }}>{sev.label}</span>
                    </div>
                    <div className="injury-item-meta">
                      <span className="pain-chip">⚡ Đau: {pain}/5</span>
                      {inj.radius && <span>⭕ {(inj.radius * 100).toFixed(0)}cm</span>}
                      {inj.veterinarian && <span className="vet-name">👨‍⚕️ {inj.veterinarian.split('(')[0].trim()}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-del-item"
                    title="Xóa điểm đánh dấu này"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteInjury(inj.id)
                    }}
                  >
                    ✕
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 7. Footer thông tin thao tác */}
      <div className="sidebar-footer">
        <p className="footer-guide">
          💡 <strong>Chuột:</strong> Giữ chuột trái để xoay • Cuộn để zoom • Giữ chuột phải để pan di chuyển khung nhìn.
        </p>
      </div>
    </aside>
  )
}
