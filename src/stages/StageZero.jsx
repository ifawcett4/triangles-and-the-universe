import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import TextType from '../components/TextType'
import BounceCards from '../components/bounceCards'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HOLD_FRACTION = 0

const defaultTransforms = [
  'rotate(10deg) translate(-30vw)',
  'rotate(5deg) translate(-15vw)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(15vw)',
  'rotate(2deg) translate(30vw)',
]

const TransformStyleVariations = [
  [
    'rotate(-8deg) translate(-30vw)',
    'rotate(5deg) translate(-15vw)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(15vw)',
    'rotate(2deg) translate(30vw)',
  ],
  [
    'rotate(2deg) translate(-30vw)',
    'rotate(3deg) translate(-15vw)',
    'rotate(0deg)',
    'rotate(-7deg) translate(15vw)',
    'rotate(7deg) translate(30vw)',
  ],
  [
    'rotate(-2deg) translate(-30vw)',
    'rotate(10deg) translate(-15vw)',
    'rotate(3deg)',
    'rotate(14deg) translate(15vw)',
    'rotate(-4deg) translate(30vw)',
  ],
  [
    'rotate(5deg) translate(-30vw)',
    'rotate(5deg) translate(-15vw)',
    'rotate(-8deg)',
    'rotate(-2deg) translate(15vw)',
    'rotate(2deg) translate(30vw)',
  ],
  [
    'rotate(3deg) translate(-30vw)',
    'rotate(9deg) translate(-15vw)',
    'rotate(-1deg)',
    'rotate(-4deg) translate(15vw)',
    'rotate(2deg) translate(30vw)',
  ],
  [
    'rotate(8deg) translate(-30vw)',
    'rotate(6deg) translate(-15vw)',
    'rotate(-4deg)',
    'rotate(-7deg) translate(15vw)',
    'rotate(2deg) translate(30vw)',
  ],
]

// one set of images per text entry — match this length/order to `text`
const imagesByText = [
  //hello world
  [],

  //im irina
  [
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785459296/Snapchat-1865796121_rsglrc.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461954/IMG_20190814_124715_275_spb0zx.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461954/2024-05-06_21_56_25.305-0500_kbnw8h.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461956/20250712_120814_m57gv2.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461954/PSX_20211121_234922_nlz6sw.jpg',
  ],

  //creative tech
  [
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460215/20251013_144323_1_yzudkr.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460214/20251204_153318_m2wgdi.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460210/Screenshot_20230519_170629_Slack_jtqrcr.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461128/Screenshot_20240122_121241_TikTok_ka5jdn.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785461290/20240227_115026_xudpmh.jpg',
  ],

  //design
  [
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460212/untitled_artwork-1_idsowt.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460212/IMG_2129_tipsob.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460211/VideoCapture_20250512-230205_brnux8.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460820/Poster02_crvqib.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785462172/20190423_100414_pvsphi.jpg',
  ],

  //dev
  [
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1777933896/RD_Cover_emgela.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460214/20260319_103947_jlzzap.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460211/20201204_183705_dwmdwb.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460591/20250617_174042_bgps9e.jpg',
    'https://res.cloudinary.com/dmdjguh0a/image/upload/v1785460823/20241011_184341_c05cbp.jpg',
  ],
  [],
]

function StageZero({ text }) {
  const container = useRef(null)
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: `+=${text.length * 150}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const segments = text.length
          const raw = self.progress * segments
          const i = Math.min(segments - 1, Math.floor(raw))
          const local = raw - i

          setIndex((prev) => (prev === i ? prev : i))
          setLeaving(local >= HOLD_FRACTION)
        },
      })

      return () => st.kill()
    },
    { scope: container, dependencies: [text] }
  )

  const currentImages = imagesByText[index] ?? []
  const transformStyles = TransformStyleVariations[index] ?? defaultTransforms

  return (
    <div ref={container} className="stage-zero">
      <div className="scrolldown">
        <div className="chevrons">
          <div className="chevrondown"></div>
          <div className="chevrondown"></div>
        </div>
      </div>

      <div className={`type-wrapper ${leaving ? 'is-leaving' : ''}`}>
        <TextType
          className="text-type"
          key={index}
          text={text[index]}
          typingSpeed={25}
          pauseDuration={100000}
          showCursor
          cursorCharacter="_"
          deletingSpeed={30}
        />
      </div>

      <BounceCards
        key={index}
        className="custom-bounceCards"
        images={currentImages}
        containerWidth={500}
        containerHeight={250}
        animationDelay={0.5}
        animationStagger={0.08}
        easeType="elastic.out(1, 0.5)"
        enableHover={false}
        transformStyles={transformStyles}
      />
    </div>
  )
}

export default StageZero
