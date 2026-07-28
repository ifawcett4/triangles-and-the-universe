// solar system from: Samer_Arab_S5 || https://sketchfab.com/Samer_Arab_S5 || https://creativecommons.org/licenses/by/4.0/

import { forwardRef, useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const SolarSystem = forwardRef((props, ref) => {
  const { scene, animations } = useGLTF('/models/solar_system_animation.glb')
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    const action = actions['Animation']
    if (action) {
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
      scene.userData.action = action
    }
  }, [actions, scene])

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0.45, -0.5, 0]}
      scale={[0.05, 0.05, 0.05]}
    />
  )
})

export default SolarSystem
