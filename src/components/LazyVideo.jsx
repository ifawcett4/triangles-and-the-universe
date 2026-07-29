// components/LazyVideo.jsx
import { useRef, useEffect, useState } from 'react'

function LazyVideo({ src, style, rootMargin = '50% 0px' }) {
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (inView) {
      if (el.src !== src) {
        el.src = src
        el.load()
      }
      el.play().catch(() => {}) // autoplay can reject before user gesture on some browsers
    } else {
      el.pause()
      el.removeAttribute('src') // actually frees the decoded frame buffer
      el.load() // forces the unload to take effect immediately
    }
  }, [inView, src])

  return (
    <video ref={videoRef} muted loop playsInline preload="none" style={style} />
  )
}

export default LazyVideo
