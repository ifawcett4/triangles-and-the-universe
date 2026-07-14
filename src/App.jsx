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

function Model() {
  return (
    <group>
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
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
  const container = useRef(null)
  const [stageZeroText, setStageZeroText] = useState(0)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.zero-section',
          pin: true,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          markers: true,
          onUpdate: (self) => {
            console.log('progress:', self.progress)
            const i = Math.min(
              stageData.zero.text.length - 1,
              Math.floor(self.progress * stageData.zero.text.length)
            )
            setStageZeroText((prev) => (prev === i ? prev : i))
          },
        },
      })

      tl.addLabel('start')
        .from('.zero-section', {})
        .to('.zero-section', {})
        .addLabel('end')
    },
    { scope: container }
  )

  return (
    <main className="scene-shell">
      <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#06060a']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>

      <div ref={container} className="full-page stage-zero">
        <section className="zero-section center" style={{ zIndex: 0 }}>
          <TextType
            className="text-type"
            key={stageZeroText}
            text={stageData.zero.text[stageZeroText]}
            typingSpeed={25}
            pauseDuration={4000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={30}
            variableSpeedEnabled={false}
            variableSpeedMin={15}
            variableSpeedMax={90}
            cursorBlinkDuration={0.5}
          />
        </section>

        <StageOne text={stageData.one.text} />
      </div>

      <StageTwo text={stageData.two.text} />
    </main>
  )
}
