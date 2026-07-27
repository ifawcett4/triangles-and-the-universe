//guided by: https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/

import { OrbitControls } from '@react-three/drei'
import { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color, Vector3, Quaternion } from 'three'
import * as THREE from 'three'
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

//Shaders for particle
import vertexShader from './vertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'

const Particles = (props) => {
  const { count, emissiveColor = '#ff00c3', emissiveIntensity = 1.5 } = props
  const radius = 2
  const points = useRef()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = (distance / 4) * Math.sin(theta) * Math.sin(phi)
      let z = distance * Math.cos(theta)

      positions.set([x, y, z], i * 3)
    }

    return positions
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
      uEmissiveColor: {
        value: new Color(emissiveColor),
      },
      uEmissiveIntensity: {
        value: emissiveIntensity,
      },
    }),
    []
  )

  useFrame((state) => {
    const { clock } = state

    points.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <points ref={points}>
      <OrbitControls enableZoom={false} autoRotate enablePan={false} />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.2}
        />
      </EffectComposer>

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
      />
    </points>
  )
}

export default Particles
