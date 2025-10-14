import { PresentationControls } from '@react-three/drei'
import React, { useRef } from 'react'
import MacbookModel16 from '../models/Macbook-16'
import MacbookModel14 from '../models/Macbook-14'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 3;

const fadeMeshes = (group,opacity) => {
    if (!group) return;
    group.traverse((mesh) => {
        if(mesh.isMesh){
            mesh.material.transparent = true;
            gsap.to(mesh.material,{opacity , duration:ANIMATION_DURATION});
        }
    });
}

const moveGroup = (group,x) => {
    if (!group) return;
    gsap.to(group.position,{x , duration:ANIMATION_DURATION});
}

const ModelSwitcher = ({scale,isMobile}) => {

    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(()=>{
        if(showLargeMacbook){
            moveGroup(smallMacbookRef.current,-OFFSET_DISTANCE)
            moveGroup(largeMacbookRef.current, 0)
            
            fadeMeshes(smallMacbookRef.current,0)
            fadeMeshes(largeMacbookRef.current,1)
        } else{
            moveGroup(smallMacbookRef.current, 0)
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE)
            
            fadeMeshes(smallMacbookRef.current,1)
            fadeMeshes(largeMacbookRef.current,0)
        }
    },[scale])

    const controlsConfig = {
        // rotation: [0, 0, 0],
        // polar: [-Math.PI , Math.PI],
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 26 },
        snap: true,
        speed: 1,
        zoom: 1, 
    }

  return (
    <>
        <PresentationControls>
            <group ref={largeMacbookRef} {...controlsConfig}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
        </PresentationControls>
        <PresentationControls enabled={!showLargeMacbook} global>
            <group ref={smallMacbookRef} {...controlsConfig}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
    </>
  )
}

export default ModelSwitcher