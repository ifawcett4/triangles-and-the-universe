// model from: https://www.cgtrader.com/designers/r3g3nerator?utm_source=credit&utm_source=credit_item_page

import { forwardRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const Dino = forwardRef((props, ref) => {
  const { scene, animations } = useGLTF('/models/t-rex_v2.glb')
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    const action = actions['roar']
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
      rotation={[0, -2, 0]}
      scale={[0.05, 0.05, 0.05]}
    />
  )
})

export default Dino
