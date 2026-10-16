import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import HorseModel from './components/HorseModel'
import InjuryMarker from './components/InjuryMarker'
import Sidebar from './components/Sidebar'
import InjuryFormModal from './components/InjuryFormModal'
import ErrorBoundary from './components/ErrorBoundary'
import { INITIAL_INJURIES } from './data/sampleInjuries'
import './App.css'

// Loading indicator y tế chuyên nghiệp với spinner tinh tế & progress bar
function MedicalLoadingFallback() {
  return (
    <Html center>
      <div className="canvas-loader">
        <div className="medical-spinner-ring">
          <div className="inner-pulse"></div>
        </div>
        <div className="loader-text-group">
          <div className="loader-title">ĐANG TẢI MÔ HÌNH GIẢI PHẪU 3D</div>
          <div className="loader-sub">Khởi tạo hệ thống tọa độ giải phẫu & lưới bề mặt...</div>
        </div>
        <div className="loader-progress-bar">
          <div className="loader-progress-fill"></div>
        </div>
      </div>
    </Html>
  )
}

// Hệ thống chiếu sáng y tế phòng mổ & khám lâm sàng
function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 6, -6]} intensity={1.0} />
      <directionalLight position={[0, -4, 0]} intensity={0.4} />
      <hemisphereLight skyColor="#ffffff" groundColor="#334155" intensity={0.6} />
    </>
  )
}

// Component điều khiển camera xoay chuyển mượt mà tới tọa độ chấn thương
function SmoothCameraController({ targetData, controlsRef, onFinished }) {
  useFrame((state, delta) => {
    if (!targetData || !controlsRef.current) return
    const controls = controlsRef.current

    let posDone = true
    let targetDone = true

    if (targetData.lookAt) {
      controls.target.lerp(targetData.lookAt, Math.min(1, delta * 3.8))
      if (controls.target.distanceTo(targetData.lookAt) > 0.015) {
        targetDone = false
      }
    }
    if (targetData.position) {
      state.camera.position.lerp(targetData.position, Math.min(1, delta * 3.8))
      if (state.camera.position.distanceTo(targetData.position) > 0.025) {
        posDone = false
      }
    }
    controls.update()

    if (posDone && targetDone) {
      onFinished?.()
    }
  })
  return null
}

const CURRENT_DOSSIER_DATE = new Date().toLocaleDateString('vi-VN')
const FOLLOW_UP_DOSSIER_DATE = new Date(Date.now() + 7 * 86400000).toLocaleDateString('vi-VN')

// Modal xuất phiếu bệnh án lâm sàng chuẩn y tế chuyên sâu
function MedicalDossierModal({ injuries, onClose }) {
  const patient = {
    name: 'Thunder Flash',
    code: 'EQ-2026-088',
    breed: 'Thoroughbred thuần chủng',
    age: '4 tuổi',
    gender: 'Ngựa đực (Stallion)',
    color: 'Hồng mã (Bay)',
    owner: 'Royal Turf Stable - Liên đoàn Đua ngựa RTMS',
    trainer: 'HLV. Phạm Đình Chiến',
    vet: 'Dr. Nguyễn Văn An (Trưởng khoa Chấn thương chỉnh hình)',
    date: CURRENT_DOSSIER_DATE,
    vitals: {
      temperature: '38.1°C',
      heartRate: '36 bpm',
      respiratory: '12 rpm',
      weight: '465 kg',
      status: 'CẦN THEO DÕI (OBSERVATION)',
    },
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="modal-backdrop dossier-backdrop">
      <div className="modal-content dossier-modal-content animate-slide-in">
        <div className="modal-header">
          <div className="dossier-header-title">
            <h3>📋 PHIẾU BỆNH ÁN LÂM SÀNG & TỔN THƯƠNG GIẢI PHẪU</h3>
            <p className="modal-subtitle">Hệ thống Quản lý & Giám sát Sức khỏe Ngựa đua RTMS Equine Clinic</p>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dossier-paper">
          {/* Thông tin hành chính & bệnh viện */}
          <div className="dossier-section-row header-info">
            <div>
              <h2 className="hospital-name">RTMS EQUINE CLINIC • BỆNH VIỆN THÚ Y CHUYÊN SÂU</h2>
              <p className="hospital-dept">Trung tâm Chẩn đoán Hình ảnh & Chấn thương Thể thao Ngựa Đua</p>
              <p className="hospital-ref">Mã hồ sơ: <strong>MED-EQ-2026-088-V2</strong> • Ngày lập: {patient.date}</p>
            </div>
            <div className="dossier-badge-seal">
              <span className="seal-text">CLINICAL DOSSIER</span>
              <span className="seal-status">{patient.vitals.status}</span>
            </div>
          </div>

          {/* Hồ sơ bệnh nhân ngựa */}
          <div className="dossier-patient-grid">
            <div className="patient-field">
              <span className="field-lbl">Tên ngựa:</span>
              <span className="field-val highlight">{patient.name}</span>
            </div>
            <div className="patient-field">
              <span className="field-lbl">Mã định danh:</span>
              <span className="field-val">{patient.code}</span>
            </div>
            <div className="patient-field">
              <span className="field-lbl">Giống loài:</span>
              <span className="field-val">{patient.breed}</span>
            </div>
            <div className="patient-field">
              <span className="field-lbl">Độ tuổi / Giới tính:</span>
              <span className="field-val">{patient.age} • {patient.gender}</span>
            </div>
            <div className="patient-field">
              <span className="field-lbl">Chủ ngựa:</span>
              <span className="field-val">{patient.owner}</span>
            </div>
            <div className="patient-field">
              <span className="field-lbl">Bác sĩ phụ trách:</span>
              <span className="field-val">{patient.vet}</span>
            </div>
          </div>

          {/* Chỉ số sinh tồn */}
          <div className="dossier-vitals-block">
            <h4 className="block-title">CHỈ SỐ SINH TỒN HIỆN TẠI (VITAL SIGNS)</h4>
            <div className="vitals-row-table">
              <div className="vital-box">
                <span className="v-label">Thân nhiệt:</span>
                <span className="v-value">{patient.vitals.temperature}</span>
                <span className="v-note">Chuẩn: 37.5 - 38.5°C</span>
              </div>
              <div className="vital-box">
                <span className="v-label">Nhịp tim:</span>
                <span className="v-value">{patient.vitals.heartRate}</span>
                <span className="v-note">Chuẩn: 28 - 44 bpm</span>
              </div>
              <div className="vital-box">
                <span className="v-label">Nhịp thở:</span>
                <span className="v-value">{patient.vitals.respiratory}</span>
                <span className="v-note">Chuẩn: 8 - 16 rpm</span>
              </div>
              <div className="vital-box">
                <span className="v-label">Cân nặng:</span>
                <span className="v-value">{patient.vitals.weight}</span>
                <span className="v-note">Chuẩn thi đấu</span>
              </div>
            </div>
          </div>

          {/* Bảng tổng hợp tổn thương */}
          <div className="dossier-injuries-block">
            <h4 className="block-title">DANH MỤC TỔN THƯƠNG ĐÃ ĐÁNH DẤU TRÊN MÔ HÌNH 3D ({injuries.length})</h4>
            <table className="dossier-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên Chấn Thương</th>
                  <th>Vị Trí Giải Phẫu</th>
                  <th>Mức Độ</th>
                  <th>Điểm Đau</th>
                  <th>Phác Đồ Điều Trị</th>
                  <th>Bác Sĩ</th>
                </tr>
              </thead>
              <tbody>
                {injuries.map((inj, index) => {
                  const pain = inj.painScore || (inj.severity === 'severe' ? 4 : inj.severity === 'moderate' ? 3 : 1)
                  return (
                    <tr key={inj.id}>
                      <td>{index + 1}</td>
                      <td className="strong">{inj.title}</td>
                      <td>{inj.anatomyName} ({inj.zone})</td>
                      <td>
                        <span className={`dossier-sev-pill ${inj.severity}`}>
                          {inj.severity === 'severe' ? 'Nặng' :
                           inj.severity === 'moderate' ? 'Trung bình' :
                           inj.severity === 'mild' ? 'Nhẹ' : 'Đã phục hồi'}
                        </span>
                      </td>
                      <td>{pain}/5</td>
                      <td>{inj.treatmentPlan || 'Nghỉ ngơi, theo dõi'}</td>
                      <td>{inj.veterinarian || 'Dr. Nguyễn Văn An'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Đánh giá kết luận & chữ ký */}
          <div className="dossier-conclusion">
            <h4 className="block-title">KẾT LUẬN & KHUYẾN NGHỊ VẬN ĐỘNG</h4>
            <p className="conclusion-text">
              Ngựa <strong>{patient.name}</strong> hiện có tổn thương cấp tính tại gân cơ chân trước và tràn dịch khớp sau.
              Khuyến cáo: <strong>TẠM NGỪNG THI ĐẤU</strong> trong tối thiểu 14 ngày, tuân thủ phác đồ điều trị nội khoa,
              băng ép cố định và tái khám siêu âm gân SDFT vào ngày {FOLLOW_UP_DOSSIER_DATE}.
            </p>
          </div>

          <div className="dossier-signatures">
            <div className="sig-block">
              <span className="sig-title">Trưởng Ban Huấn Luyện</span>
              <div className="sig-space"></div>
              <span className="sig-name">{patient.trainer}</span>
            </div>
            <div className="sig-block">
              <span className="sig-title">Bác Sĩ Thú Y Điều Trị</span>
              <div className="sig-space"></div>
              <span className="sig-name">{patient.vet}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions dossier-actions">
          <button type="button" className="btn-print" onClick={handlePrint}>
            🖨️ In Phiếu Bệnh Án
          </button>
          <button type="button" className="btn-save" onClick={onClose}>
            Đóng Hồ Sơ
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [injuries, setInjuries] = useState(INITIAL_INJURIES)
  const [selectedInjury, setSelectedInjury] = useState(null)
  const [isAddMode, setIsAddMode] = useState(false)
  const [pendingPoint, setPendingPoint] = useState(null)
  const [currentModel, setCurrentModel] = useState('/models/horse_-_realistic_3d_model_demo_free.glb')

  // Modal bệnh án lâm sàng
  const [showDossierModal, setShowDossierModal] = useState(false)

  // Tùy chọn hiển thị 3D
  const [showLabels, setShowLabels] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false)

  // Điều khiển Camera
  const controlsRef = useRef()
  const [cameraTarget, setCameraTarget] = useState(null)

  // Xử lý khi click vào thân ngựa ở chế độ thêm
  const handlePointerHit = (hitData) => {
    setPendingPoint(hitData)
  }

  // Lưu chấn thương mới
  const handleSaveInjury = (newInjury) => {
    setInjuries((prev) => [newInjury, ...prev])
    setSelectedInjury(newInjury)
    setPendingPoint(null)
    setIsAddMode(false) // Tắt chế độ thêm sau khi tạo xong

    // Tự động focus camera vào chấn thương mới
    handleSelectInjury(newInjury)
  }

  // Xóa chấn thương
  const handleDeleteInjury = (id) => {
    setInjuries((prev) => prev.filter((i) => i.id !== id))
    if (selectedInjury?.id === id) {
      setSelectedInjury(null)
    }
  }

  // Chuyển góc nhìn camera
  const handleCameraPreset = (preset) => {
    const origin = new THREE.Vector3(0, 0, 0)
    let camPos = new THREE.Vector3(3.2, 1.6, 3.2)

    switch (preset) {
      case 'left':
        camPos = new THREE.Vector3(-4.2, 0.3, 0)
        break
      case 'right':
        camPos = new THREE.Vector3(4.2, 0.3, 0)
        break
      case 'front':
        camPos = new THREE.Vector3(0, 0.5, 4.2)
        break
      case 'rear':
        camPos = new THREE.Vector3(0, 0.5, -4.2)
        break
      case 'top':
        camPos = new THREE.Vector3(0, 5.2, 0.01)
        break
      case 'reset':
      default:
        camPos = new THREE.Vector3(3.2, 1.6, 3.2)
        break
    }

    setCameraTarget({
      lookAt: origin,
      position: camPos,
      timestamp: Date.now(),
    })
  }

  // Khi chọn một chấn thương từ danh sách hoặc click marker, xoay camera mượt mà đến vị trí đó
  const handleSelectInjury = (inj) => {
    setSelectedInjury(inj)
    if (!inj?.position) return

    const pos = new THREE.Vector3(...inj.position)
    const norm = inj.normal ? new THREE.Vector3(...inj.normal) : new THREE.Vector3(0, 1, 0)
    
    // Đặt camera đối diện chấn thương từ phía bên ngoài bề mặt
    const camPos = pos.clone().add(norm.clone().multiplyScalar(1.65)).add(new THREE.Vector3(0, 0.25, 0))

    setCameraTarget({
      lookAt: pos,
      position: camPos,
      timestamp: Date.now(),
    })
  }

  return (
    <div className="app-container">
      {/* 1. Clinical Header Bar phía trên */}
      <header className="clinical-header">
        <div className="header-left">
          <div className="hospital-logo">
            <span className="logo-cross">+</span>
            <span className="logo-horse">🐎</span>
          </div>
          <div>
            <h1 className="hospital-title">RTMS EQUINE CLINIC</h1>
            <p className="hospital-subtitle">Bệnh viện Thú y Chuyên sâu • Khoa Chấn thương Chỉnh hình</p>
          </div>
        </div>

        <div className="patient-banner">
          <div className="patient-main-info">
            <span className="patient-tag">BỆNH NHÂN:</span>
            <span className="patient-name">Thunder Flash</span>
            <span className="patient-code">EQ-2026-088</span>
            <span className="patient-meta">Thoroughbred • 4 tuổi • Đực</span>
          </div>

          <div className="vitals-chips-group">
            <div className="vital-chip" title="Thân nhiệt bình thường">
              <span className="chip-icon">🌡️</span>
              <span className="chip-label">Nhiệt độ:</span>
              <span className="chip-value">38.1°C</span>
            </div>
            <div className="vital-chip" title="Nhịp tim ổn định">
              <span className="chip-icon">💓</span>
              <span className="chip-label">Nhịp tim:</span>
              <span className="chip-value">36 bpm</span>
            </div>
            <div className="vital-chip" title="Nhịp thở bình thường">
              <span className="chip-icon">🫁</span>
              <span className="chip-label">Nhịp thở:</span>
              <span className="chip-value">12 rpm</span>
            </div>
            <div className="vital-chip" title="Cân nặng tiêu chuẩn thi đấu">
              <span className="chip-icon">⚖️</span>
              <span className="chip-label">Cân nặng:</span>
              <span className="chip-value">465 kg</span>
            </div>
            <div className="status-badge-observation" title="Tình trạng theo dõi sát">
              ● CẦN THEO DÕI (OBSERVATION)
            </div>
          </div>
        </div>

        <div className="header-right">
          <button
            type="button"
            className="btn-dossier-export"
            onClick={() => setShowDossierModal(true)}
          >
            📋 Xuất Phiếu Bệnh Án
          </button>
        </div>
      </header>

      {/* 2. Nội dung chính: Sidebar + 3D Viewport */}
      <div className="main-content-layout">
        {/* Sidebar quản lý chấn thương & góc nhìn */}
        <Sidebar
          injuries={injuries}
          selectedInjury={selectedInjury}
          onSelectInjury={handleSelectInjury}
          onDeleteInjury={handleDeleteInjury}
          isAddMode={isAddMode}
          setIsAddMode={setIsAddMode}
          showLabels={showLabels}
          setShowLabels={setShowLabels}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          isPlayingAnimation={isPlayingAnimation}
          setIsPlayingAnimation={setIsPlayingAnimation}
          onCameraPreset={handleCameraPreset}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
        />

        {/* Vùng hiển thị 3D Canvas */}
        <main className="canvas-wrapper">
          <ErrorBoundary>
            {/* Banner trạng thái chế độ góc trên */}
            <div className="viewport-overlay-status">
              {isAddMode ? (
                <div className="status-badge adding animate-pulse">
                  🎯 <strong>Chế độ gắn chấn thương:</strong> Click trực tiếp lên vị trí bất kỳ trên thân ngựa để gắn điểm tổn thương
                </div>
              ) : (
                <div className="status-badge view">
                  🔍 <strong>Chế độ xoay & quan sát:</strong> Giữ chuột trái để xoay 360°, cuộn để phóng to, click marker để xem chi tiết bệnh án
                </div>
              )}
            </div>

            <Canvas
              shadows
              camera={{ position: [3.2, 1.6, 3.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <SceneLights />

              <Suspense fallback={<MedicalLoadingFallback />}>
                {/* Bộ điều khiển chuyển động camera mượt mà */}
                <SmoothCameraController
                  targetData={cameraTarget}
                  controlsRef={controlsRef}
                  onFinished={() => setCameraTarget(null)}
                />

                {/* Mô hình con ngựa 3D */}
                <HorseModel
                  key={currentModel}
                  modelPath={currentModel}
                  isAddMode={isAddMode}
                  isPlayingAnimation={isPlayingAnimation}
                  onPointerHit={handlePointerHit}
                />

                {/* Danh sách các Marker & Nhãn dẫn đường đỏ trên ngựa */}
                {injuries.map((injury) => (
                  <InjuryMarker
                    key={injury.id}
                    injury={injury}
                    isSelected={selectedInjury?.id === injury.id}
                    onSelect={handleSelectInjury}
                    onDelete={handleDeleteInjury}
                    showLabel={showLabels}
                  />
                ))}

                {/* Lưới sàn không gian y tế 3D */}
                <gridHelper
                  args={[14, 28, '#0d9488', '#1e293b']}
                  position={[0, -1.3, 0]}
                />
              </Suspense>

              {/* Điều khiển xoay chuột 3D Orbit */}
              <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.06}
                minDistance={1.2}
                maxDistance={9.0}
                maxPolarAngle={Math.PI / 2 + 0.08}
                autoRotate={autoRotate}
                autoRotateSpeed={1.2}
                onStart={() => setCameraTarget(null)}
              />
            </Canvas>
          </ErrorBoundary>

          {/* Modal nhập liệu chấn thương khi vừa click lên thân ngựa */}
          {pendingPoint && (
            <InjuryFormModal
              pendingPoint={pendingPoint}
              onSave={handleSaveInjury}
              onCancel={() => setPendingPoint(null)}
            />
          )}

          {/* Modal xuất phiếu bệnh án lâm sàng */}
          {showDossierModal && (
            <MedicalDossierModal
              injuries={injuries}
              onClose={() => setShowDossierModal(false)}
            />
          )}
        </main>
      </div>
    </div>
  )
}
