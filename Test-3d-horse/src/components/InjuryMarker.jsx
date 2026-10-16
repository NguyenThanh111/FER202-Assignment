import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'
import { SEVERITY_LEVELS } from '../data/anatomyPresets'

export default function InjuryMarker({
  injury,
  isSelected = false,
  onSelect,
  onDelete,
  showLabel = true,
}) {
  const pulseRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const severityCfg = SEVERITY_LEVELS[injury.severity] || SEVERITY_LEVELS.severe
  const color = severityCfg.color

  // Vị trí gốc trên thân ngựa
  const pos = injury.position || [0, 0, 0]
  const normalX = injury.normal?.[0] ?? 0
  const normalY = injury.normal?.[1] ?? 1
  const normalZ = injury.normal?.[2] ?? 0

  // Định hướng vòng sóng radar theo vector pháp tuyến (normal)
  useEffect(() => {
    if (pulseRef.current) {
      const dir = new THREE.Vector3(normalX, normalY, normalZ).normalize()
      pulseRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)
    }
  }, [normalX, normalY, normalZ])

  // Vị trí chốt kim loại đẩy nhẹ ra ngoài theo normal để chống z-fighting
  const pinPos = [
    pos[0] + normalX * 0.015,
    pos[1] + normalY * 0.015,
    pos[2] + normalZ * 0.015,
  ]

  // Tính toán vị trí nhãn dẫn hướng (Callout position)
  // Đẩy ra ngoài theo hướng vector pháp tuyến (normal) và nâng nhẹ theo trục Y
  const offsetDistance = 0.48
  const labelPos = [
    pos[0] + normalX * offsetDistance,
    pos[1] + normalY * offsetDistance + 0.16,
    pos[2] + normalZ * offsetDistance,
  ]

  // Điểm uốn cong ở giữa cho đường dẫn bezier
  const midPos = [
    pos[0] + normalX * (offsetDistance * 0.5) + (normalX >= 0 ? 0.06 : -0.06),
    pos[1] + normalY * (offsetDistance * 0.5) + 0.2,
    pos[2] + normalZ * (offsetDistance * 0.5),
  ]

  // Animation hiệu ứng sóng phát sáng (Pulsing radar beacon) tại điểm chấn thương
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = (clock.getElapsedTime() * 2) % 1
      pulseRef.current.scale.setScalar(1 + t * 2.0)
      if (pulseRef.current.material) {
        pulseRef.current.material.opacity = (1 - t) * 0.85
      }
    }
  })

  const handleMarkerClick = (e) => {
    e.stopPropagation()
    onSelect?.(injury)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onDelete?.(injury.id)
  }

  const toggleExpand = (e) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <group>
      {/* 1. Điểm neo chính trên da ngựa (Metallic Core Pin) */}
      <mesh
        position={pinPos}
        onClick={handleMarkerClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 3.5 : 2.0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Quả cầu mô mềm bán trong suốt thể hiện bán kính tổn thương (Injury Radius Bubble) */}
      <mesh position={pos}>
        <sphereGeometry args={[injury.radius || 0.12, 24, 24]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered || isSelected ? 0.38 : 0.22}
          depthWrite={false}
          roughness={0.6}
        />
      </mesh>

      {/* 3. Vòng sóng radar nhấp nháy tỏa ra (Pulsing Radar Beacon) */}
      <mesh ref={pulseRef} position={pinPos}>
        <ringGeometry args={[0.035, 0.065, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Đường cong Bezier nối mềm mại từ điểm chấn thương ra nhãn dẫn */}
      {showLabel && (
        <QuadraticBezierLine
          start={pinPos}
          end={labelPos}
          mid={midPos}
          color={hovered || isSelected ? '#ffffff' : color}
          lineWidth={hovered || isSelected ? 2.5 : 1.5}
          dashed={false}
        />
      )}

      {/* 5. Điểm chốt tại đầu đường dẫn (Lead Anchor Dot) */}
      {showLabel && (
        <mesh position={labelPos}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshBasicMaterial color={hovered || isSelected ? '#ffffff' : color} />
        </mesh>
      )}

      {/* 6. Thẻ nhãn Html nổi hiển thị thông tin lâm sàng */}
      {showLabel && (
        <Html
          position={labelPos}
          center
          distanceFactor={5.5}
          zIndexRange={[100, 0]}
          style={{
            pointerEvents: 'auto',
            transform: 'translate3d(0, -50%, 0)',
            transition: 'all 0.2s ease',
          }}
        >
          <div
            className={`callout-box injury-callout ${isSelected ? 'selected' : ''} ${
              hovered ? 'hovered' : ''
            }`}
            onClick={handleMarkerClick}
            style={{ borderLeft: `3px solid ${color}` }}
          >
            {/* Header của thẻ dẫn */}
            <div className="callout-header">
              <span
                className="callout-badge severity-pill"
                style={{
                  backgroundColor: color,
                  color: '#ffffff',
                }}
              >
                {severityCfg.label}
              </span>
              <span className="zone-tag" style={{ fontSize: '10px', color: '#94a3b8' }}>
                {injury.zone || 'Giải phẫu'}
              </span>
            </div>

            {/* Tên chấn thương & vị trí */}
            <div className="callout-body">
              <h4 className="callout-title" style={{ margin: '4px 0 2px 0' }}>
                {injury.title}
              </h4>
              <p className="callout-sub callout-part" style={{ margin: 0 }}>
                📍 {injury.anatomyName}
              </p>
              {injury.painScore && (
                <div style={{ fontSize: '10px', color: '#fbbf24', marginTop: '2px' }}>
                  ⚡ Mức đau: {injury.painScore}/5
                </div>
              )}
            </div>

            {/* Chi tiết mở rộng khi click hoặc chọn */}
            {(isExpanded || isSelected) && (
              <div className="callout-details callout-extra" style={{ marginTop: '6px' }}>
                {injury.notes && (
                  <p className="callout-notes" style={{ margin: '2px 0' }}>
                    <strong>Ghi chú:</strong> {injury.notes}
                  </p>
                )}
                {injury.treatmentPlan && (
                  <p className="callout-treatment" style={{ margin: '2px 0' }}>
                    <strong>Điều trị:</strong> {injury.treatmentPlan}
                  </p>
                )}
                <div
                  className="callout-meta"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '9px',
                    color: '#94a3b8',
                    marginTop: '4px',
                  }}
                >
                  <span>📅 {injury.date || 'Hôm nay'}</span>
                  <span>👨‍⚕️ {injury.veterinarian || 'Bác sĩ thú y'}</span>
                </div>
              </div>
            )}

            {/* Thanh công cụ nhỏ */}
            <div
              className="callout-actions"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '6px',
                marginTop: '6px',
              }}
            >
              <button
                type="button"
                className="btn-tiny"
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#cbd5e1',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={toggleExpand}
              >
                {isExpanded || isSelected ? 'Thu gọn ▲' : 'Chi tiết ▼'}
              </button>
              <button
                type="button"
                className="callout-del-btn btn-tiny btn-danger"
                title="Xóa điểm đánh dấu này"
                onClick={handleDeleteClick}
              >
                ✕ Xóa
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
