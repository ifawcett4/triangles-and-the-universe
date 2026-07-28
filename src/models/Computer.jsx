// model from: https://sketchfab.com/1d_inc

import { forwardRef, useMemo, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const Computer = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/computer.glb')
  const [tex1, tex2] = useTexture(['/tv_tex_1.jpg', '/tv_tex_2.jpg'])

  // find the mesh by material name, not mesh name — stable regardless of
  // how the exporter split/named the submeshes
  const screenMesh = useMemo(() => {
    let found = null
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === 'Screen Surface') {
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

    // one overlay mesh, texture 2, invisible by default (texture 1 shows through)
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
    screenMesh.userData.overlay = overlay // stash for the lerp fn below
    scene.userData.screenMesh = screenMesh // ADD THIS

    return () => {
      screenMesh.remove(overlay)
      overlay.material.dispose()
      screenMesh.material = original
    }
  }, [screenMesh, tex1, tex2])

  return <primitive ref={ref} object={scene} />
})

// call this from anywhere — the gsap timeline file, wherever — with t: 0 -> 1
Computer.setScreenLerp = (root, t) => {
  const overlay = root?.getObjectByName('ScreenOverlay')
  if (!overlay) return

  overlay.material.opacity = THREE.MathUtils.clamp(t, 0, 1)
  overlay.material.needsUpdate = true

  // TEMPORARY TEST — direct swap on the base mesh using overlay's own tex2
  const screenMesh = overlay.parent
  if (screenMesh && t >= 1) {
    screenMesh.material.map = overlay.material.map
    screenMesh.material.needsUpdate = true
  }
}

export default Computer
