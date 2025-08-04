import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const Galleries = () => {
  useGSAP(() => {
    // Animation for the Galleries page
    gsap.from('.gallery-title', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.gallery-item', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  // Mock gallery data - replace with your actual gallery items
  const galleries = [
    { id: 1, title: "USA", image: "/images/hero-left-leaf.png", slug: "usa" },
    { id: 2, title: "Brazil", image: "/images/hero-left-leaf.png", slug: "brazil" },
    { id: 3, title: "Europe", image: "/images/hero-left-leaf.png", slug: "europe" },
    { id: 4, title: "Japan", image: "/images/hero-left-leaf.png", slug: "japan" },
    { id: 5, title: "Korea", image: "/images/hero-left-leaf.png", slug: "korea" }
  ];

  return (
    <section id="galleries" className="min-h-screen">
      <div className="container mx-auto py-20 pt-36">
        <h1 className="gallery-title text-5xl md:text-8xl font-modern-negra mb-10 text-center">Galleries</h1>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleries.map((gallery, index) => (
              <Link 
                key={gallery.id} 
                to={`/galleries/${gallery.slug}`} 
                className="gallery-item group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={gallery.image} 
                    alt={gallery.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl mt-3 font-modern-negra text-center transition-colors duration-300 group-hover:text-yellow">
                  {gallery.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galleries;