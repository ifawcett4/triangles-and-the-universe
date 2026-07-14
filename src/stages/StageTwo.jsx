import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import './StageTwo.scss'

//TODO: find out how to make the images swipe up on scolltrigger

gsap.registerPlugin(useGSAP, ScrollTrigger)

function StageTwo({ text }) {
  const containerRef = useRef()
  const panelsRef = useRef([])

  const addPanel = (el) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el)
    }
  }

  useGSAP(
    () => {
      const panels = panelsRef.current

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: isLast ? '+=100%' : 'bottom top',
          pin: true,
          pinSpacing: false,
        })
      })
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div className="stage-two" ref={containerRef}>
      <div className="spacer" />

      {/* title 1 */}
      <section className="panel center" ref={addPanel} style={{ zIndex: 0 }}>
        <h1>{text[0]}</h1>
      </section>

      {/* content 1 */}
      <section className="panel photos" ref={addPanel} style={{ zIndex: 1 }}>
        <img src="https://picsum.photos/200/300?random=1" alt="" />
        <img src="https://picsum.photos/200/300?random=2" alt="" />
        <img src="https://picsum.photos/200/300?random=3" alt="" />
        <img src="https://picsum.photos/200/300?random=4" alt="" />
      </section>

      {/* title 2 */}
      <section
        className="panel center photos"
        ref={addPanel}
        style={{ zIndex: 2 }}
      >
        <h1>{text[1]}</h1>
      </section>

      {/* content 2 */}
      <section className="panel photos" ref={addPanel} style={{ zIndex: 3 }}>
        <img src="https://picsum.photos/200/300?random=4223" alt="" />
        <img src="https://picsum.photos/200/300?random=435" alt="" />
        <img src="https://picsum.photos/200/300?random=67" alt="" />
        <img src="https://picsum.photos/200/300?random=627" alt="" />
      </section>

      {/* title 3 */}
      <section className="panel center" ref={addPanel} style={{ zIndex: 4 }}>
        <h1>{text[2]}</h1>
      </section>

      {/* content 3 */}
      <section className="panel photos" ref={addPanel} style={{ zIndex: 5 }}>
        <img src="https://picsum.photos/200/300?random=76" alt="" />
        <img src="https://picsum.photos/200/300?random=324" alt="" />
        <img src="https://picsum.photos/200/300?random=3294" alt="" />
        <img src="https://picsum.photos/200/300?random=32994" alt="" />
      </section>

      {/* title 4 */}
      <section className="panel center" ref={addPanel} style={{ zIndex: 6 }}>
        <h1>{text[3]}</h1>
      </section>

      {/* content 4 */}
      <section className="panel photos" ref={addPanel} style={{ zIndex: 7 }}>
        <img src="https://picsum.photos/200/300?random=67785" alt="" />
        <img src="https://picsum.photos/200/300?random=23" alt="" />
        <img src="https://picsum.photos/200/300?random=765" alt="" />
        <img src="https://picsum.photos/200/300?random=7605" alt="" />
      </section>
    </div>
  )
}

export default StageTwo
