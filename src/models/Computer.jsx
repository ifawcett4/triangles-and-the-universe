// model from: https://sketchfab.com/1d_inc

import { forwardRef, useMemo, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const Computer = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/computer_v2.glb')
  const [tex1, tex2] = useTexture(['/tv_tex_1.jpg', '/tv_tex_2.jpg'])

  const screenMesh = useMemo(() => {
    let found = null
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === 'Screen Surface') {
        console.log('screen candidate:', child.name)
        found = child
      }
    })
    return found
  }, [scene])

  useEffect(() => {
    if (!screenMesh) {
      console.warn('Computer: no mesh found with material "Screen Surface"')
      return
    }

    tex1.colorSpace = THREE.SRGBColorSpace
    tex2.colorSpace = THREE.SRGBColorSpace

    const original = screenMesh.material

    const overlay = new THREE.Mesh(
      screenMesh.geometry,
      new THREE.MeshBasicMaterial({
        map: tex2,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
      })
    )
    overlay.name = 'ScreenOverlay'
    screenMesh.material = new THREE.MeshBasicMaterial({ map: tex1 })
    screenMesh.add(overlay)
    screenMesh.userData.overlay = overlay
    scene.userData.screenMesh = screenMesh

    return () => {
      screenMesh.remove(overlay)
      overlay.material.dispose()
      screenMesh.material = original
    }
  }, [screenMesh, tex1, tex2, scene.userData])

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, -0.4, 0]}
      rotation={[0, -2, 0]}
    />
  )
})

Computer.setScreenLerp = (root, t) => {
  const screenMesh = root?.userData?.screenMesh
  const overlay = screenMesh?.userData?.overlay

  console.log('screenMesh', screenMesh)
  console.log('overlay', overlay)

  if (!overlay) return

  overlay.material.opacity = THREE.MathUtils.clamp(t, 0, 1)

  if (screenMesh && t >= 1) {
    screenMesh.material.map = overlay.material.map
    screenMesh.material.needsUpdate = true
    console.log('screenMesh.material.map', screenMesh.material.map)
  }
}
export default Computer
