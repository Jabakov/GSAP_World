import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'


const Hero = () => {
    const videoRef = useRef();
    const videoTimelineRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue =  isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadedmetadata = () => {
           tl.to(videoRef.current, {
            currentTime: videoRef.current.duration
           })
        }
    }, []);


    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">Ana's Pics</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />

                <div className="body">
                    <div className="content">
                       <div className="space-y-5 hidden md:block">
                        <p className="subtitle">
                            See my journey
                        </p>
                        <p>Scroll to See</p>
                        </div> 

                        <div className="view-galleries">
                            <p className="subtitle">
                                21 years of adventures, see what I've captured
                            </p>
                            <a href="#galleries">View Galleries</a>
                        </div>
                    </div> 
                </div>
            </section>

            <div className="video absolute inset-0">
                <video
                ref={videoRef}
                src="/videos/WorldFlyover.mp4"
                muted
                playsInline
                preload="auto"
                />
            </div>
        </>
    )
}

export default Hero