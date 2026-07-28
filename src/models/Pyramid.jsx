// solar system from: https://sketchfab.com/MarloesB || https://creativecommons.org/licenses/by/4.0/

import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Pyramid = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/pyramid.glb')

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[0.1, 0.1, 0.1]}
      rotation={[0, 0, 0]}
    />
  )
})

export default Pyramid
