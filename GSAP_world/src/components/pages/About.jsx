import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const About = () => {
  const imageRef = useRef();
  const titleRef = useRef();
  const textContainerRef = useRef();

  useEffect(() => {
    // Initialize the timeline
    const timeline = gsap.timeline();

    // Make sure the elements are available before animating
    if (!titleRef.current || !imageRef.current || !textContainerRef.current) {
      console.error('Some refs are not available for animation');
      return;
    }

    // Scale the mask to reveal the about_me image
    timeline
      .to('.masked-img', {
        maskSize: '400%',
        duration: 2,
        ease: 'power3.inOut',
      })
      // Reveal the title at the top
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
      // Move the image to the right side without changing scale
      .to(imageRef.current, {
        x: '20%', // Move to the right side
        duration: 1.2,
        ease: 'power3.inOut',
      }, '-=0.5')
      // Reveal the content text
      .to(textContainerRef.current, {
        opacity: 1,
        x: 100,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');
  }, []);

  return (
    <section id="about" className="min-h-screen relative">
      {/* Title that appears at the top - reduced top padding but increased bottom padding */}
      <div 
        ref={titleRef} 
        className="container mx-auto pt-16 pb-16 opacity-0" 
        style={{ transform: 'translateY(-30px)' }}
      >
        <h1 className="about-title text-5xl md:text-8xl font-modern-negra text-center">About Me</h1>
      </div>

      {/* Image with cut-out - smaller version */}
      <div ref={imageRef} className='about-me-image absolute inset-0 flex justify-center items-center pt-24'>
        <img
          src="/images/about_me.png"
          className="masked-img w-1/2 md:w-1/3 lg:w-1/4 object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Text content */}
      <div 
        ref={textContainerRef} 
        className="container mx-auto py-6 opacity-0 absolute left-10 top-1/3 max-w-md mt-10"
        style={{ transform: 'translateX(-30px)' }}
      >
        <h2 className="text-3xl mb-5 font-modern-negra">My Journey</h2>
        <p className="text-xl mb-4">
          Hi, I'm Ana! I've been passionate about photography for over 21 years, 
          capturing moments that tell stories and evoke emotions.
        </p>
        <p>
          My photography journey started with a simple point-and-shoot camera and has evolved into 
          a lifelong passion for documenting the world's beauty.
        </p>
      </div>
    </section>
  );
};

export default About;