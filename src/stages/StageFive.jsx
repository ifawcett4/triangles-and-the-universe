import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import TextType from '../components/TextType'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function StageFive({ text }) {
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
    <div ref={container} className="stage-five">
      <section>
        {' '}
        <div className="type-wrapper">
          {' '}
          <TextType
            className="text-type-three"
            key={index}
            text={text[index]}
            typingSpeed={25}
            pauseDuration={100000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={30}
          />
        </div>
      </section>

      <section className=" centered">
        <div className="five-wrapper">
          <h2>consider clicking these buttons!</h2>

          <a
            href="https://www.irinafawcett.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.irinafawcett.xyz
          </a>

          <div className="icon-links centered">
            <ul>
              <li>
                <a
                  href="mailto:irinafawcett4@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    {/* <!-- Font Awesome Free 6.7.2 by @fontawesome --> */}
                    <path
                      fill="currentColor"
                      d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"
                    />
                  </svg>

                  {/* <p className="link-text"> irinafawcett4@gmail.com </p> */}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/irina-fawcett-78b287180/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/* <!-- Font Awesome Free 6.7.2 by @fontawesome --> */}
                    <path
                      fill="currentColor"
                      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                    />
                  </svg>

                  {/* <p className="link-text"> irinafawcett </p> */}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pixel_fish_creative/profilecard/?igsh=MTJjbXVpNzRtMzVwYQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="icon"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    />
                  </svg>
                  {/* <p className="link-text"> pixel_fish_creative </p> */}
                </a>
              </li>

              <li>
                <a
                  href="https://www.behance.net/irinafawcett1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="icon"
                  >
                    <path
                      fill="currentColor"
                      d="M232 237.2c31.8-15.2 50.4-35.2 50.4-74 0-70.6-52.6-87.8-113.7-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1l.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/@PixelFishCreative"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="icon"
                  >
                    <path
                      fill="currentColor"
                      d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5C51.1 81.8 32.6 100.4 26.3 124.1 14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StageFive
