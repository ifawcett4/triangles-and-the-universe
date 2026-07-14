import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import './StageOne.scss'
import DecryptedText from '../components/DecryptedText'

function StageOne({ text }) {
  const containerRef = useRef()
  const panelRef = useRef()

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: panelRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div className="full-page centered stage-one">
      <div className="wrapper">
        <div className="decrypted-text">
          <DecryptedText
            text={text[0]}
            speed={20}
            maxIterations={5}
            animateOn="view"
            clickMode="once"
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
          />
        </div>

        <div className="decrypted-text">
          <DecryptedText
            className=" accent-color"
            text={text[1]}
            speed={20}
            maxIterations={5}
            animateOn="view"
            clickMode="once"
            revealDirection="start"
            sequential
            useOriginalCharsOnly={false}
          />
        </div>
      </div>

      <section
        className="panel center"
        ref={panelRef}
        style={{ zIndex: 0 }}
      ></section>
    </div>
  )
}

export default StageOne
