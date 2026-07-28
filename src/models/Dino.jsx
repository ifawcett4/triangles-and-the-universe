// model from: https://www.cgtrader.com/designers/r3g3nerator?utm_source=credit&utm_source=credit_item_page

import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Dino = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/t-rex.glb')

  return <primitive ref={ref} object={scene} rotation={[0, 0, 0]} />
})

export default Dino
