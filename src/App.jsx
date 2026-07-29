import { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StageZero from './stages/StageZero'
import StageOne from './stages/StageOne'
import StageTwo from './stages/StageTwo'
import StageThree from './stages/StageThree'
import Particles from './components/particles/particles'

const stageData = {
  zero: {
    id: 0,
    description: 'about me tyrpwriter text',
    text: [
      'Hello World!',
      'Im Irina',
      'Im a Creative Technologist',
      'Im a Designer',
      'Im a Developer',
      'and..',
    ],
  },
  one: {
    id: 1,
    description: 'decrypt text',
    text: [
      'I’m a Creative Technologist with five years of agency experience working in immersive technology and a specialized focus in Augmented Reality.',
      'But really, I’m just someone who can’t pick between design and development and loves making cool things. like...',
    ],
  },
  two: {
    id: 2,
    description: 'work scroll cards',
    text: [
      'Augmented Reality',
      'Interactive Experiences',
      'Games',
      'Generally Cool Stuff',
    ],
  },
  three: {
    id: 3,
    description: 'more about',
    text: [
      'Im looking to expand my creative tech capabilities',
      'Working with forward thinking creative people ',
      'who make interesting things',
      'And I think this could be my kind of place',
      'So I hope to get to chat more',
      'but lets get to the imortant stuff',
      'The beginning of the universe!',
    ],
  },
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
  const canvasStageRef = useRef(null)

  useGSAP(() => {
    const refresh = () => ScrollTrigger.refresh(true)
    requestAnimationFrame(() => requestAnimationFrame(refresh))
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <main className="scene-shell">
      {/* type text */}
      <StageZero text={stageData.zero.text} />

      {/* decode */}
      <StageOne text={stageData.one.text} />

      {/* categories */}
      <StageTwo text={stageData.two.text} />

      {/* type text again */}
      <StageThree text={stageData.three.text} />

      {/* 3D Stuff */}
      <div className="canvas-stage" ref={canvasStageRef}>
        <Canvas
          className="canvas"
          camera={{ position: [0, 0, 5], fov: 45 }}
          // frameloop="demand"
        >
          <color attach="background" args={['#06060a']} />

          <Suspense fallback={null}>
            <Particles count={8000} scrollTriggerRef={canvasStageRef} />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>
    </main>
  )
}
