import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import LazyVideo from '../components/LazyVideo'

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

      const pinTriggers = panels.map((panel, i) => {
        const isLast = i === panels.length - 1
        return ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: isLast ? '+=100%' : 'bottom top',
          pin: true,
          pinSpacing: isLast,
          anticipatePin: 1,
        })
      })

      const fadeTriggers = panels.map((panel) => {
        const media = panel.querySelectorAll('img, video')
        if (!media.length) return null

        return gsap.fromTo(
          media,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        )
      })

      return () => {
        pinTriggers.forEach((st) => st.kill())
        fadeTriggers.forEach((tween) => tween?.scrollTrigger?.kill())
      }
    },
    { scope: containerRef, dependencies: [] }
  )

  return (
    <div className="stage-two" ref={containerRef}>
      <section className="panel center" ref={addPanel}>
        <h1>{text[0]}</h1>
      </section>
      {/* AUGMENTED REALITY */}
      <section className="panel photos" ref={addPanel}>
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785289092/AR_01_elmo_ni4cqn.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785288925/AR_02_unseen_zoo_badd1o.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785288923/AR_03_grey_goose_phqvl1.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785288923/AR_04_Nydia_l1fkwk.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
      </section>
      <section className="panel center photos" ref={addPanel}>
        <h1>{text[1]}</h1>
      </section>
      {/* INTERACTIVE EXPERIENCES */}
      <section className="panel photos" ref={addPanel}>
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785289078/INT_01_xcrykj.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '400px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785289080/INT_02_djkhvl.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '400px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785290286/INT_03_pwkwnu.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '400px', height: 'auto', display: 'block' }}
        />
      </section>
      <section className="panel center" ref={addPanel}>
        <h1>{text[2]}</h1>
      </section>

      {/* GAMES */}
      <section className="panel photos" ref={addPanel}>
        <img
          src="https://res.cloudinary.com/dmdjguh0a/image/upload/v1785289451/ezgif-4-bcad5192bf_ssmhuh.gif"
          alt=""
          width="400px"
          height="auto"
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785288920/GAME_01_pswjhj.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785290318/GAME_02_b3jmcu.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '400px', height: 'auto', display: 'block' }}
        />
      </section>
      <section className="panel center" ref={addPanel}>
        <h1>{text[3]}</h1>
      </section>

      {/* COOL STUFF */}
      <section className="panel photos" ref={addPanel}>
        <img
          src="https://res.cloudinary.com/dmdjguh0a/image/upload/v1785289461/ezgif-3-2872b0537e_xzankr.gif"
          alt=""
          width="400px"
          height="auto"
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1785290412/COOL_01_uzntnb.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '200px', height: 'auto', display: 'block' }}
        />
        <LazyVideo
          src={
            'https://res.cloudinary.com/dmdjguh0a/video/upload/v1781665062/usb_scrollsite_01_ebuvm1.mp4'
          }
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '400px', height: 'auto', display: 'block' }}
        />
      </section>
    </div>
  )
}

export default StageTwo
