import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

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
      const triggers = panels.map((panel, i) => {
        const isLast = i === panels.length - 1
        return ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: isLast ? '+=100%' : 'bottom top',
          pin: true,
          pinSpacing: isLast, // false for every panel except the last
        })
      })

      return () => triggers.forEach((st) => st.kill())
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div className="stage-two" ref={containerRef}>
      <section className="panel center" ref={addPanel}>
        <h1>{text[0]}</h1>
      </section>

      <section className="panel photos" ref={addPanel}>
        <img
          src="https://picsum.photos/200/300?random=1"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=2"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=3"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=4"
          alt=""
          width="200"
          height="300"
        />
      </section>

      <section className="panel center photos" ref={addPanel}>
        <h1>{text[1]}</h1>
      </section>

      <section className="panel photos" ref={addPanel}>
        <img
          src="https://picsum.photos/200/300?random=4223"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=435"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=67"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=627"
          alt=""
          width="200"
          height="300"
        />
      </section>

      <section className="panel center" ref={addPanel}>
        <h1>{text[2]}</h1>
      </section>

      <section className="panel photos" ref={addPanel}>
        <img
          src="https://picsum.photos/200/300?random=76"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=324"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=3294"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=32994"
          alt=""
          width="200"
          height="300"
        />
      </section>

      <section className="panel center" ref={addPanel}>
        <h1>{text[3]}</h1>
      </section>

      <section className="panel photos" ref={addPanel}>
        <img
          src="https://picsum.photos/200/300?random=67785"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=23"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=765"
          alt=""
          width="200"
          height="300"
        />
        <img
          src="https://picsum.photos/200/300?random=7605"
          alt=""
          width="200"
          height="300"
        />
      </section>
    </div>
  )
}

export default StageTwo
