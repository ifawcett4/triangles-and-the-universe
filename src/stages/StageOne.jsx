import { useRef } from 'react'
import DecryptedText from '../components/DecryptedText'

function StageOne({ text }) {
  const container = useRef(null)

  return (
    <div ref={container} className="stage-one">
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
            className="accent-color"
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
    </div>
  )
}

export default StageOne
