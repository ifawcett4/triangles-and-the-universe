import { Box, OrbitControls } from '@react-three/drei'
import { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color, Vector3, Quaternion } from 'three'

//guided by: https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/

function Particles() {
  // This reference gives us direct access to our points
  const points = useRef()

  // You can see that, like our mesh, points also takes a geometry and a material,
  // but a specific material => pointsMaterial
  return (
    <group>
      <OrbitControls autoRotate={true} />{' '}
      <points ref={points}>
        <sphereGeometry args={[1, 48, 48]} />
        <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation />
      </points>
    </group>
  )
}

export default Particles
