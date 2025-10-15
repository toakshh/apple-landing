import React, { useRef } from 'react'
import { performanceImages, performanceImgPositions } from '../constants'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
            // Text Animation
            gsap.fromTo(
                ".content p",
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".content p",
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
            
            if (isMobile) return;

            // Image Positioning Timeline
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "center 70%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            
            // Position Each Performance Image
            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;
                
                const selector = `.${item.id}`;
                const vars = {};

                if (typeof item.left === "number") vars.left = `${item.left}%`;
                if (typeof item.right === "number") vars.right = `${item.right}%`;
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

                if (item.transform) vars.transform = item.transform;

                tl.to(selector, vars, 0);
            });

            const onResize = () => ScrollTrigger.refresh();
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );
  return (
    <section id='performance' ref={sectionRef}>
        <h2>Next-level graphics performance. Game on.</h2>

        <div className='wrapper'>
            {performanceImages.map((img) => (<img className={img.id} src={img.src} alt={img.id} key={img.id} />))}
        </div>

        <div className='content'>
            <p className=''>
                Run graphics-intensive workflows with a responsiveness that keeps up
                with your imagination. The M4 family of chips features a GPU with a
                second-generation hardware-accelerated ray tracing engine that renders
                images faster, so{" "}
                <span className="">
                    gaming feels more immersive and realistic than ever.
                </span>{" "}
                And Dynamic Caching optimizes fast on-chip memory to dramatically
                increase average GPU utilization — driving a huge performance boost
                for the most demanding pro apps and games.
            </p>
        </div>
    </section>
  )
}

export default Performance