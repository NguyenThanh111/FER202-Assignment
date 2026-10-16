import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function HorseModel({
  modelPath = '/models/horse_-_realistic_3d_model_demo_free.glb',
  isAddMode = false,
  isPlayingAnimation = false,
  onPointerHit,
}) {
  const group = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, group)

  // Chuẩn hóa chiều cao về đúng 2.4 đơn vị, tâm X/Z tại 0, chân chạm sàn tại Y = -1.3 bằng useMemo
  const modelTransform = useMemo(() => {
    if (!scene) return { scale: 1, position: [0, -1.3, 0] }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            if (m) m.needsUpdate = true
          })
        } else if (child.material) {
          child.material.needsUpdate = true
        }
      }
    })

    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // Chuẩn hóa chiều cao tiêu chuẩn 2.4 đơn vị
    const targetHeight = 2.4
    const height = Math.max(size.y, 0.001)
    const scaleFactor = targetHeight / height

    const posX = -center.x * scaleFactor
    const posY = -box.min.y * scaleFactor - 1.3
    const posZ = -center.z * scaleFactor

    return {
      scale: scaleFactor,
      position: [posX, posY, posZ],
    }
  }, [scene])

  // Quản lý chuyển động của ngựa:
  // Trong y tế / khám lâm sàng, ngựa luôn phải ở tư thế đứng yên (Anatomical Standing Rest).
  // Chỉ khi người dùng chủ động bật "Hoạt cảnh bước chạy" thì mới phát animation di chuyển.
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    // Tìm animation Idle thực sự (đứng yên thở nhẹ)
    const idleAction =
      actions['Horse|Horse_Idle'] ||
      actions['Idle'] ||
      actions['idle'] ||
      null

    // Tìm animation di chuyển (Walk / Trot / Run / horse_A_)
    const moveAction =
      actions['Horse|Horse_Walk'] ||
      actions['Walk'] ||
      actions['Trot'] ||
      actions['horse_A_'] ||
      null

    if (isPlayingAnimation) {
      // Khi bật hoạt cảnh chạy:
      if (idleAction && typeof idleAction.fadeOut === 'function') {
        idleAction.fadeOut(0.3)
      }
      const targetMoveAction = moveAction || Object.values(actions)[0]
      if (targetMoveAction && typeof targetMoveAction.reset === 'function') {
        targetMoveAction.reset().fadeIn(0.3).play()
      }
    } else {
      // Khi ở trạng thái khám lâm sàng tĩnh (mặc định):
      if (moveAction && typeof moveAction.stop === 'function') {
        moveAction.fadeOut(0.2)
        setTimeout(() => {
          if (moveAction && typeof moveAction.stop === 'function') {
            moveAction.stop()
          }
        }, 200)
      }

      // Nếu có động tác Idle đứng yên thì phát nhẹ, nếu không có (như horse.glb) thì giữ nguyên tư thế đứng tự nhiên
      if (idleAction && typeof idleAction.reset === 'function') {
        idleAction.reset().fadeIn(0.3).play()
      }
    }

    return () => {
      if (moveAction && typeof moveAction.fadeOut === 'function') moveAction.fadeOut(0.2)
      if (idleAction && typeof idleAction.fadeOut === 'function') idleAction.fadeOut(0.2)
    }
  }, [actions, isPlayingAnimation])

  // Cleanup con trỏ chuột khi component unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Xử lý click raycasting chính xác để gắn điểm chấn thương
  const handleClick = (e) => {
    if (!isAddMode) return
    e.stopPropagation()

    const hitPoint = e.point

    // Tính toán vector pháp tuyến (normal) tại mặt tiếp xúc để đẩy marker và lead line ra ngoài
    let normal = [0, 1, 0]
    if (e.face && e.object) {
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(e.object.matrixWorld)
      const worldNormal = e.face.normal.clone().applyMatrix3(normalMatrix).normalize()
      normal = [
        Number(worldNormal.x.toFixed(4)),
        Number(worldNormal.y.toFixed(4)),
        Number(worldNormal.z.toFixed(4)),
      ]
    }

    onPointerHit?.({
      position: [
        Number(hitPoint.x.toFixed(4)),
        Number(hitPoint.y.toFixed(4)),
        Number(hitPoint.z.toFixed(4)),
      ],
      normal,
    })
  }

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (isAddMode) {
      document.body.style.cursor = 'crosshair'
    } else {
      document.body.style.cursor = 'grab'
    }
  }

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto'
  }

  return (
    <group
      ref={group}
      dispose={null}
      scale={modelTransform.scale}
      position={modelTransform.position}
    >
      <primitive
        object={scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  )
}

// Preload cả 2 mô hình chính
useGLTF.preload('/models/horse_-_realistic_3d_model_demo_free.glb')
useGLTF.preload('/models/horse_skeleton.glb')
