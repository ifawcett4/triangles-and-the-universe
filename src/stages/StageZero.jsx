import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import TextType from '../components/TextType'
import './StageZero.scss'
import StageOne from './StageOne'
import StageTwo from './StageTwo'

const texts = [
  'Hello World!',
  'Im Irina',
  'Im a Creative Technologist',
  'Im a Designer',
  'Im a Developer',
]

gsap.registerPlugin(useGSAP, ScrollTrigger)

function StageZero({ onContinue }) {
  const container = useRef(null)
  const [index, setIndex] = useState(0)

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
              texts.length - 1,
              Math.floor(self.progress * texts.length)
            )
            setIndex((prev) => (prev === i ? prev : i))
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
    <div ref={container} className="full-page stage-zero">
      <section className="zero-section center" style={{ zIndex: 0 }}>
        <TextType
          className="text-type"
          key={index}
          text={texts[index]}
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

      <StageOne />
      {/* <StageTwo /> */}

      <button className="next-btn" type="button" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}

export default StageZero
