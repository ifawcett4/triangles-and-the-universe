import { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StageZero from './stages/StageZero'
import StageOne from './stages/StageOne'
import StageTwo from './stages/StageTwo'
import TextType from './components/TextType'
import StageThree from './stages/StageThree'
import Particles from './components/particles'

function Model() {
  const groupRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.canvas-stage',
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
      },
    })
    tl.to(groupRef.current.rotation, { y: Math.PI * 2 }).to(
      groupRef.current.position,
      { z: 2 },
      '<'
    )
  }, [])

  return (
    <group ref={groupRef}>
      <Box material-color="hotpink" />
    </group>
  )
}

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
      'Cool Stuff',
    ],
  },
  three: {
    id: 3,
    description: 'more about',
    text: [
      'Im currently searching for other forward thinking creatives to work with. And searching to expand my creative tech capabilities to a variety of new executions.',
      'more good words here about something interesting.',
      'I am just a little guy. idk what to write about myself ',
      'but lets get to the imortant stuff',
      'The beginning of the universe.',
    ],
  },
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
  const container = useRef(null)

  useGSAP(() => {
    const refresh = () => ScrollTrigger.refresh(true) // true = hard refresh, recalculates from scratch

    // run once immediately after mount
    requestAnimationFrame(() => requestAnimationFrame(refresh))

    // and again once everything (images etc.) has fully loaded
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

      {/* 3D scroll for the rest, going sideways? */}
      {/* Stage 4 which will be 3D using r3f and drei's html elements */}

      <div className="canvas-stage">
        <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#06060a']} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <Suspense fallback={null}>
            {/* <Model /> */}
            <Particles />
          </Suspense>
        </Canvas>
      </div>
    </main>
  )
}
