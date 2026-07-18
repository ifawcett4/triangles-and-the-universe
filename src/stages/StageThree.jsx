import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import TextType from '../components/TextType'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function StageThree({ text }) {
  const container = useRef(null)
  const [index, setIndex] = useState(0)

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: `+=${text.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const i = Math.min(
            text.length - 1,
            Math.floor(self.progress * text.length)
          )
          setIndex((prev) => (prev === i ? prev : i))
        },
      })

      return () => st.kill()
    },
    { scope: container, dependencies: [text] }
  )

  return (
    <div ref={container} className="stage-three">
      <div className="type-wrapper">
        {' '}
        <TextType
          className="text-type"
          key={index}
          text={text[index]}
          typingSpeed={25}
          pauseDuration={4000}
          showCursor
          cursorCharacter="_"
          deletingSpeed={30}
        />
      </div>
    </div>
  )
}

export default StageThree
