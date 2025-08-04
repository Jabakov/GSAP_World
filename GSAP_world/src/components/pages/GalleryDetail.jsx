import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const GalleryDetail = () => {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Gallery data
  const galleryData = {
    usa: {
      id: 1,
      title: "USA",
      description: "Exploring the diverse landscapes and urban scenes across the United States.",
      folderPath: "USA"
    },
    brazil: {
      id: 2,
      title: "Brazil",
      description: "Vibrant colors and cultural richness of Brazil captured through my lens.",
      folderPath: "Brazil"
    },
    europe: {
      id: 3,
      title: "Europe",
      description: "Historical architecture and scenic beauty from across European countries.",
      folderPath: "Europe"
    },
    japan: {
      id: 4,
      title: "Japan",
      description: "The perfect blend of tradition and modernity in Japan's unique landscape.",
      folderPath: "Japan"
    },
    korea: {
      id: 5,
      title: "Korea",
      description: "Discovering the beauty and culture of the Korean peninsula.",
      folderPath: "Korea"
    }
  };

  // Function to load images using Vite's glob import
  const loadGalleryImages = async (folderPath) => {
    try {
      let imageFiles = {};
      
      // Use import.meta.glob to get all images - this is processed at build time by Vite
      switch (folderPath) {
        case 'Korea':
          imageFiles = import.meta.glob('/public/images/Korea/*.png', { eager: true });
          break;
        case 'USA':
          imageFiles = import.meta.glob('/public/images/USA/*.{jpg,png,jpeg}', { eager: true });
          break;
        case 'Brazil':
          imageFiles = import.meta.glob('/public/images/Brazil/*.{jpg,png,jpeg}', { eager: true });
          break;
        case 'Europe':
          imageFiles = import.meta.glob('/public/images/Europe/*.{jpg,png,jpeg}', { eager: true });
          break;
        case 'Japan':
          imageFiles = import.meta.glob('/public/images/Japan/*.{jpg,png,jpeg}', { eager: true });
          break;
        default:
          imageFiles = {};
      }
      
      console.log(`Found images for ${folderPath}:`, imageFiles);
      
      // Convert the glob object to an array of paths
      const imagePaths = Object.keys(imageFiles).map(path => {
        // Extract just the relative path from the full path
        // We need to handle the path format correctly
        return path.replace('/public', '');
      });
      
      console.log(`Processed ${imagePaths.length} image paths:`, imagePaths);
      
      if (imagePaths.length === 0) {
        // Use fallback images if no images found
        console.warn(`No images found for ${folderPath}, using fallback images`);
        setImages([
          "/images/camera_zoom.png",
          "/images/hero-left-leaf.png",
          "/images/hero-right-leaf.png",
        ]);
      } else {
        setImages(imagePaths);
      }
    } catch (error) {
      console.error("Error loading gallery images:", error);
      console.error("Error details:", error.message, error.stack);
      // Use fallback images on error
      setImages([
        "/images/camera_zoom.png",
        "/images/hero-left-leaf.png",
        "/images/hero-right-leaf.png",
      ]);
    }
  };

  useEffect(() => {
    // Set the gallery based on the slug
    const selectedGallery = galleryData[slug];
    if (selectedGallery) {
      setGallery(selectedGallery);
      loadGalleryImages(selectedGallery.folderPath);
    }
    
    // Scroll to top when navigating to a new gallery
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(() => {
    // Animation for the Gallery Detail page
    gsap.from('.gallery-detail-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.gallery-description', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    gsap.from('.gallery-image', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      delay: 0.5,
      ease: 'power3.out'
    });
  }, [gallery]);

  // Add this effect to animate the modal
  useEffect(() => {
    if (modalOpen && selectedImage) {
      // Animate modal opening
      gsap.from('.modal-content', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [modalOpen, selectedImage]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Add this function to navigate between images
  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img === selectedImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };

  // Add this effect to handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, selectedImage, images]);

  if (!gallery) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading gallery...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="container mx-auto py-20 pt-36 px-4">
        <Link to="/galleries" className="inline-block mb-8 text-yellow hover:underline">
          ← Back to Galleries
        </Link>
        
        <h1 className="gallery-detail-title text-5xl md:text-8xl font-modern-negra mb-6">
          {gallery.title}
        </h1>
        
        <p className="gallery-description text-xl mb-10 max-w-3xl">
          {gallery.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-image cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openModal(image)}
            >
              <img 
                src={image} 
                alt={`${gallery.title} - Image ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
        
        {images.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl">No images found for this gallery.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {modalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full modal-content">
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-yellow"
              onClick={closeModal}
            >
              &times;
            </button>
            
            {/* Previous button */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:text-yellow"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              &#10094;
            </button>
            
            <img 
              src={selectedImage} 
              alt="Full size view" 
              className="w-full h-auto max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Next button */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:text-yellow"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              &#10095;
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
              {images.findIndex(img => img === selectedImage) + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryDetail;