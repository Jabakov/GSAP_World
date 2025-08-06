import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef();
    const videoTimelineRef = useRef();
    const heroSectionRef = useRef();

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

        // Hero section animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
    }, []);

    // Separate useEffect for video scroll animation to ensure it runs after video is loaded
    useEffect(() => {
        if (!videoRef.current) return;

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        // Ensure video is properly loaded before setting up ScrollTrigger
        const handleVideoLoaded = () => {
            // Clear any existing ScrollTriggers to avoid duplicates
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // Create a new timeline for video scrubbing
            const videoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.video-section', // Using a dedicated section for better control
                    start: startValue,
                    end: endValue,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    markers: false, // Set to true for debugging
                    onEnter: () => console.log('Video section entered'),
                    onLeave: () => console.log('Video section left'),
                }
            });

            // Pause video initially and set up scrubbing animation
            videoRef.current.pause();
            videoTl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
                ease: "none",
                duration: 1,
            });

            console.log('Video ScrollTrigger setup complete, duration:', videoRef.current.duration);
        };

        // Set up event listeners for video
        videoRef.current.addEventListener('loadedmetadata', handleVideoLoaded);
        videoRef.current.addEventListener('error', (e) => {
            console.error('Video error:', e);
        });

        // Load video
        videoRef.current.load();

        return () => {
            // Clean up event listeners
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleVideoLoaded);
            }
        };
    }, [isMobile]);

    return (
        <>
            <section id="hero" ref={heroSectionRef} className="noisy relative min-h-screen z-10">
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
                            <Link 
                                to="/galleries" 
                                className="hover:text-yellow transition-colors duration-300"
                            >
                                View Galleries
                            </Link>
                        </div>
                    </div> 
                </div>
            </section>

            {/* Dedicated video section with proper sizing */}
            <section className="video-section relative min-h-screen">
                <div className="video absolute inset-0 z-0 overflow-hidden">
                    <video
                        ref={videoRef}
                        src="/videos/WorldFlyover.mp4"
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Additional content for the video section (if needed) */}
                <div className="container mx-auto relative z-10">
                    <div className="h-screen flex items-center justify-center">
                        {/* Optional: Add text or elements that appear as the video plays */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;