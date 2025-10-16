import { Canvas } from '@react-three/fiber'
import StudioLights from './three/StudioLights'
import { features, featureSequence } from '../constants'
import clsx from 'clsx'
import { Suspense, useEffect, useRef } from 'react'
import MacbookModel from './models/Macbook'
import { useMediaQuery } from 'react-responsive'
import { Html } from '@react-three/drei'
import useMacbookStore from '../store'
import gsap from 'gsap'

const ModelScroll = () => {
  const isMobile =  useMediaQuery({ query: '(max-width: 1024px)' })
  const groupRef = useRef(null)
  const { setTexture } = useMacbookStore()

  // preload feature video when component mount
  useEffect(()=>{
    featureSequence.map((feature) => {
      const video = document.createElement('video')
      Object.assign(video, {
        src: feature.videoPath,
        loop: true,
        muted: true,
        playsInline: true,
        preload: 'auto',
        crossOrigin: 'anonymous'
      })
    })
  },[])

  // update texture on scroll
  useEffect(()=>{
    // 3d model rotation animation on scroll
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true
      }
    })

    // sync the feature content
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#f-canvas',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      }
    })

    // 3d spin
    if(groupRef.current){
      modelTimeline.to(groupRef.current.rotation, {y: Math.PI * 2, ease: 'power1.inOut'})
    }

   // content and texture sync
   timeline
          .call(()=> setTexture('/videos/feature-1.mp4'))
          .to('.box1', {opacity: 1, y: 0, delay: 1})
          .call(()=> setTexture('/videos/feature-2.mp4'))
          .to('.box2', {opacity: 1, y: 0,})
          .call(()=> setTexture('/videos/feature-3.mp4'))
          .to('.box3', {opacity: 1, y: 0,})
          .call(()=> setTexture('/videos/feature-4.mp4'))
          .to('.box4', {opacity: 1, y: 0,})
          .call(()=> setTexture('/videos/feature-5.mp4'))
          .to('.box5', {opacity: 1, y: 0,})
  },[])


  return (
    <group ref={groupRef}>
      <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
        <MacbookModel position={[0, -1, 0]} scale={isMobile ? 0.05 : 0.08} />
      </Suspense>
    </group>
  )
}
const Features = () => {
  return (
    <section id='features'>
      <h2>See it all in a new light</h2>

      <Canvas id='f-canvas' camera={{ position: [0, 2, 5] ,fov: 50, near:0.1, far:100 }}>
        <StudioLights />
        <ambientLight intensity={0.5} />

        <ModelScroll />
      </Canvas>

      <div className='absolute inset-0'>
        {features.map((feature, index) => (
          <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
              <img src={feature.icon} alt={feature.highlight} />
              <p>
                  <span className="text-white">{feature.highlight}</span>
                  {feature.text}
              </p>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Features