import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
  useGSAP(() => {
    // Animation for the Contact page
    gsap.from('.contact-title', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.contact-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section id="contact" className="min-h-screen">
      <div className="container mx-auto py-20">
        <h1 className="contact-title text-5xl md:text-8xl font-modern-negra mb-10">Contact</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="contact-content">
            <h2 className="text-3xl mb-5 font-modern-negra">Get In Touch</h2>
            <p className="mb-6">
              Interested in working together? Have questions about my photography? 
              Fill out the form and I'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <p><strong>Email:</strong> ana@anaspics.com</p>
              <p><strong>Instagram:</strong> @anaspics</p>
            </div>
          </div>
          
          <div className="contact-content">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 bg-transparent border border-white rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 bg-transparent border border-white rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full p-3 bg-transparent border border-white rounded-md"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;