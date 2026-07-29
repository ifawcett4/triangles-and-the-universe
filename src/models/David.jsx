// model from: https://sketchfab.com/1d_inc

import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const David = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/david_head.glb')

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[0, -1, 0]}
      position={[0, -1, 0]}
    />
  )
})

export default David
