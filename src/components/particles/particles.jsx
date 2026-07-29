//guided by: https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/

import { OrbitControls, Float, Html, Environment } from '@react-three/drei'
import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'
import * as THREE from 'three'
import {
  Bloom,
  EffectComposer,
  DepthOfField,
  Noise,
} from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextType from '../TextType'

import vertexShader from './vertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'

import SolarSystem from '../../models/SolarSystem'
import Dino from '../../models/Dino'
import Pyramid from '../../models/Pyramid'
import David from '../../models/David'
import Computer from '../../models/Computer'

const steps = [
  { step: 0, breakpoint: 0, text: 'at first there was nothing...' },
  { step: 1, breakpoint: 0.1, text: 'until...there was something' },
  { step: 2, breakpoint: 0.2, text: 'which became everything' },
  { step: 3, breakpoint: 0.3, text: 'like our Solar System' },
  { step: 4, breakpoint: 0.4, text: 'which just so happens to include earth' },
  { step: 5, breakpoint: 0.5, text: 'where all of history happened' },
  { step: 6, breakpoint: 0.6, text: 'like pyramids' },
  { step: 7, breakpoint: 0.7, text: 'and art & stuff' },
  { step: 8, breakpoint: 0.8, text: 'and now you are here' },
  { step: 9, breakpoint: 0.9, text: 'looking at a triangle on a screen' },
]

const SCALE = {
  particlesSpread: 1,
  particlesBackground: 100,
  solarSystem: 0.05,
  earthZoom: 15,
  dino: 0.4,
  pyramid: 0.2,
  david: 0.012,
  computer: 0.4,
}

// how much of each breakpoint gap is spent actually transitioning;
// the rest is a hold — but now purely a function of scroll progress,
// never wall-clock time
const TRANSITION_FRACTION = 0.35

// ramps 0 -> 1 across the first TRANSITION_FRACTION of [from, to], holds
// at 1 after `to`, sits at 0 before `from`. This is the ONLY timing
// primitive in the whole system — no durations, no timelines.
function mapRange(progress, from, to, fraction = TRANSITION_FRACTION) {
  const width = (to - from) * fraction
  if (width <= 0) return progress >= from ? 1 : 0
  return THREE.MathUtils.clamp((progress - from) / width, 0, 1)
}

function setModelScale(
  obj,
  progress,
  enterBp,
  exitBp,
  exitNextBp,
  restScale,
  baseRotationY = 0
) {
  if (!obj) return
  const enterFactor = mapRange(progress, enterBp, exitBp)
  const exitFactor = mapRange(progress, exitBp, exitNextBp)
  obj.scale.setScalar(restScale * enterFactor * (1 - exitFactor))

  const rotationProgress = mapRange(progress, enterBp, exitNextBp, 1)
  obj.rotation.y = baseRotationY + rotationProgress * Math.PI * 2
}

const Particles = (props) => {
  const {
    count,
    emissiveColor = '#ff00c3',
    emissiveIntensity = 1.5,
    scrollTriggerRef,
  } = props

  const ORIGIN = new THREE.Vector3(0, 0, 0) // top of file

  const radius = 2
  const points = useRef()
  const activeStepRef = useRef(0)
  const solarSystemRef = useRef()
  const rotationSpeed = useRef(1)
  const accumulatedTime = useRef(0)
  const dinoRef = useRef()
  const pyramidRef = useRef()
  const davidRef = useRef()
  const computerRef = useRef()

  // earth-specific reparenting state — lives across onUpdate calls
  const earthTargetRef = useRef(null)
  const earthReparentedRef = useRef(false)
  const earthBasePosRef = useRef(null)
  const earthBaseScaleRef = useRef(null)
  const otherChildrenRef = useRef([])

  const [activeStep, setActiveStep] = useState(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uRadius: { value: radius },
      uOpacity: { value: 0.0 },
      uSpread: { value: 0.0 },
      uWhiteMix: { value: 0.0 },
      uEmissiveColor: { value: new Color(emissiveColor) },
      uEmissiveIntensity: { value: emissiveIntensity },
    }),
    [emissiveColor, emissiveIntensity]
  )

  useGSAP(
    () => {
      if (!points.current || !solarSystemRef.current) return

      points.current.material.uniforms.uOpacity.value = 0
      points.current.material.uniforms.uSpread.value = 0
      points.current.material.uniforms.uWhiteMix.value = 0
      points.current.scale.set(1, 1, 1)

      // just LOCATE earth — do NOT attach/reparent yet, so it stays under
      // its animated orbit parent and keeps moving with the GLTF animation
      // right up until the earth step begins
      let earthTarget = null
      solarSystemRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
        if (child.name === 'Object_11') {
          earthTarget = child
        }
      })
      earthTargetRef.current = earthTarget

      solarSystemRef.current.scale.set(0, 0, 0)
      dinoRef.current?.scale.set(0, 0, 0)
      pyramidRef.current?.scale.set(0, 0, 0)
      davidRef.current?.scale.set(0, 0, 0)
      computerRef.current?.scale.set(0, 0, 0)

      const dinoBaseRotationY = dinoRef.current?.rotation.y ?? 0
      const pyramidBaseRotationY = pyramidRef.current?.rotation.y ?? 0
      const davidBaseRotationY = davidRef.current?.rotation.y ?? 0
      const computerBaseRotationY = computerRef.current?.rotation.y ?? 0

      const action = solarSystemRef.current.userData.action

      const st = ScrollTrigger.create({
        trigger: scrollTriggerRef?.current ?? '.canvas-stage',
        start: 'top top',
        end: `+=${steps.length * 2 * 100}%`,
        scrub: 1,
        markers: true,
        pin: true,
        onUpdate: (self) => {
          // the ONLY progress value in the whole system — everything
          // below is a pure function of this, so nothing can drift
          // out of sync with anything else
          const progress = self.progress

          // ── active step text ──
          let step = 0
          for (let i = steps.length - 1; i >= 0; i--) {
            if (progress >= steps[i].breakpoint) {
              step = i
              break
            }
          }
          if (step !== activeStepRef.current) {
            activeStepRef.current = step
            setActiveStep(step)
          }

          // ── step 1: particle opacity ──
          const opacityFactor = mapRange(
            progress,
            steps[1].breakpoint,
            steps[2].breakpoint
          )
          points.current.material.uniforms.uOpacity.value = opacityFactor

          // ── step 2: spread + scale up ──
          const spreadFactor = mapRange(
            progress,
            steps[2].breakpoint,
            steps[3].breakpoint
          )
          points.current.material.uniforms.uSpread.value = spreadFactor
          let particleScale = THREE.MathUtils.lerp(
            1,
            SCALE.particlesSpread,
            spreadFactor
          )

          // ── step 3: blow out to background, turn white, freeze rotation, reveal solar system ──
          const bgFactor = mapRange(
            progress,
            steps[3].breakpoint,
            steps[4].breakpoint
          )
          particleScale = THREE.MathUtils.lerp(
            particleScale,
            SCALE.particlesBackground,
            bgFactor
          )
          points.current.scale.setScalar(particleScale)
          points.current.material.uniforms.uWhiteMix.value = bgFactor
          rotationSpeed.current = THREE.MathUtils.lerp(1, 0, bgFactor)
          solarSystemRef.current.scale.setScalar(
            THREE.MathUtils.lerp(0, SCALE.solarSystem, bgFactor)
          )

          // ── step 4: zoom into earth ──
          const earthTarget = earthTargetRef.current
          if (earthTarget) {
            const enteringEarthStep = progress >= steps[4].breakpoint

            // reparent exactly ONCE, right when the earth step begins —
            // captures whatever world position/scale earth is orbiting at
            // that instant as the tween's starting point
            if (enteringEarthStep && !earthReparentedRef.current) {
              earthReparentedRef.current = true

              if (action) action.timeScale = 0 // freeze orbit animation now

              solarSystemRef.current.attach(earthTarget) // preserves current world transform

              earthBasePosRef.current = earthTarget.position.clone()
              earthBaseScaleRef.current = earthTarget.scale.clone()

              // snapshot remaining planet scales at this same instant too
              const others = []
              solarSystemRef.current.traverse((child) => {
                if (
                  child !== solarSystemRef.current &&
                  (child.isMesh || child.isGroup) &&
                  child !== earthTarget
                ) {
                  others.push({ obj: child, baseScale: child.scale.clone() })
                }
              })
              otherChildrenRef.current = others
            }

            if (earthReparentedRef.current) {
              const earthEnter = mapRange(
                progress,
                steps[4].breakpoint,
                steps[5].breakpoint
              )
              const earthExit = mapRange(
                progress,
                steps[5].breakpoint,
                steps[6].breakpoint
              )

              earthTarget.position.lerpVectors(
                earthBasePosRef.current,
                ORIGIN,
                earthEnter
              )

              const earthScale =
                THREE.MathUtils.lerp(
                  earthBaseScaleRef.current.x,
                  SCALE.earthZoom,
                  earthEnter
                ) *
                (1 - earthExit)
              earthTarget.scale.setScalar(earthScale)

              otherChildrenRef.current.forEach(({ obj, baseScale }) => {
                obj.scale.setScalar(
                  THREE.MathUtils.lerp(baseScale.x, 0, earthEnter)
                )
              })
            }
          }

          // ── steps 5–8: model swaps, each enter/exit purely progress-driven ──
          setModelScale(
            dinoRef.current,
            progress,
            steps[5].breakpoint,
            steps[6].breakpoint,
            steps[7].breakpoint,
            SCALE.dino,
            dinoBaseRotationY
          )
          setModelScale(
            pyramidRef.current,
            progress,
            steps[6].breakpoint,
            steps[7].breakpoint,
            steps[8].breakpoint,
            SCALE.pyramid,
            pyramidBaseRotationY
          )
          setModelScale(
            davidRef.current,
            progress,
            steps[7].breakpoint,
            steps[8].breakpoint,
            steps[9].breakpoint,
            SCALE.david,
            davidBaseRotationY
          )

          // then an additional scale-up + texture crossfade as we move through step 9
          const computerEnter = mapRange(
            progress,
            steps[8].breakpoint,
            steps[9].breakpoint
          )

          //step 9: Computer Transition — entrance (from step 8) continues,

          // ramps 0 -> 1 across the remaining scroll distance after step 9's breakpoint,
          // since there's no steps[10] to mark an end — "to" must be 1 (end of scroll)
          const computerExpand = mapRange(progress, steps[9].breakpoint, 1)

          const computerScale =
            SCALE.computer *
            computerEnter *
            THREE.MathUtils.lerp(1, 2, computerExpand)

          computerRef.current?.scale.setScalar(computerScale)

          if (computerRef.current) {
            computerRef.current.rotation.y =
              computerBaseRotationY +
              mapRange(progress, steps[8].breakpoint, 1, 1) * Math.PI * 2
            Computer.setScreenLerp(computerRef.current, computerExpand)
          }
        },
      })

      return () => st.kill()
    },
    { scope: points, dependencies: [] }
  )

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = (distance / 4) * Math.sin(theta) * Math.sin(phi)
      let z = distance * Math.cos(theta)

      positions.set([x, y, z], i * 3)
    }

    return positions
  }, [count])

  useFrame((state, delta) => {
    accumulatedTime.current += delta * rotationSpeed.current
    points.current.material.uniforms.uTime.value = accumulatedTime.current
  })

  return (
    <group>
      <OrbitControls enableZoom={false} enablePan={false} />
      <EffectComposer>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.2}
        />
      </EffectComposer>
      <Html>
        <div className="three-d-text-wrapper">
          <TextType
            className="three-d-text-type"
            key={activeStep}
            text={steps[activeStep].text}
            typingSpeed={25}
            pauseDuration={100000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={30}
          />
        </div>
      </Html>
      <Float rotationIntensity={0} floatingRange={[0.1, 0.5]}>
        <points ref={points} scale={[1, 1, 1]} rotation={[0.75, 0, 0.2]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
            transparent
          />
        </points>

        <SolarSystem ref={solarSystemRef} />
      </Float>

      <Dino ref={dinoRef} />
      <Pyramid ref={pyramidRef} />
      <David ref={davidRef} />
      <Computer ref={computerRef} />
    </group>
  )
}

export default Particles
