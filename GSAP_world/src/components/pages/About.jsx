import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {
  useGSAP(() => {
    // Animation for the About page
    gsap.from('.about-title', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });
 
 gsap.from('.about-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section id="about" className="min-h-screen">
      <div className="container mx-auto py-20">
        <h1 className="about-title text-5xl md:text-8xl font-modern-negra mb-10">About Me</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="about-content">
            <h2 className="text-3xl mb-5 font-modern-negra">My Journey</h2>
            <p className="mb-4">
              Hi, I'm Ana! I've been passionate about photography for over 21 years, capturing moments 
              that tell stories and evoke emotions.
            </p>
            <p>
              My photography journey started with a simple point-and-shoot camera and has evolved into 
              a lifelong passion for documenting the world's beauty.
            </p>
          </div>
          
          <div className="about-content">
            <img 
              src="/images/hero-left-leaf.png" 
              alt="About Me" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;