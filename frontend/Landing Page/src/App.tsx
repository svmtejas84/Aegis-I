import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Intro Section */}
      <IntroSection />

      {/* What's New Section */}
      <WhatsNewSection />

      {/* Disaster Types Section */}
      <DisasterTypesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">A</span>
          </div>
          <span className="text-lg font-semibold tracking-wide">AEGIS</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="#about" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            About Us
          </a>
          <a href="#resources" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Resources
          </a>
          <a href="#mitigation" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Mitigation
          </a>
          <a href="#response" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Response
          </a>
          <a href="#gallery" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Media Gallery
          </a>
          <a href="#jobs" className="text-sm uppercase tracking-wider hover:text-gray-300 transition-colors">
            Jobs
          </a>
        </nav>

        {/* Search Icon */}
        <button className="hover:text-gray-300 transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M12.5 12.5L17 17" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/src/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="serif text-6xl md:text-7xl lg:text-8xl mb-6">
          Stay Informed. Stay Safe.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Real-time alerts and resources at your fingertips. AEGIS provides comprehensive disaster
          management solutions to keep you and your community protected.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-base"
            onClick={() => window.location.href = 'http://localhost:3001'}
          >
            Get Alerts
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-white border border-white hover:bg-white/10 px-8 py-6 text-base"
            onClick={() => window.location.href = 'http://localhost:3003'}
          >
            Admin Login
          </Button>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="serif text-4xl md:text-5xl mb-6 text-center">
        AEGIS: Guardian of Global Resilience
      </h2>
      <p className="text-gray-400 text-center leading-relaxed text-lg">
        AEGIS is a smart disaster management system that connects citizens, local planners, and
        central command. It delivers real-time alerts, predictive insights, and coordinated
        response tools to prevent, prepare for, and mitigate crises. Its lighthouse emblem
        symbolizes guidance and resilience, helping communities stay safe and informed during
        disasters.
      </p>
    </section>
  );
}

function WhatsNewSection() {
  const cards = [
    {
      title: 'Recent Disaster Amendment acts',
      image: 'https://images.unsplash.com/photo-1712935303280-c9bad9e09427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjByZXNwb25zZSUyMHRlYW18ZW58MXx8fHwxNzYxMjEzNTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'One day workshops for Disaster Management',
      image: 'https://images.unsplash.com/photo-1750165023743-1ce8d4d03ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MTMxMzQ0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Short Animation/Film making competition',
      image: 'https://images.unsplash.com/photo-1691180273080-aacef51379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMGNhbWVyYXxlbnwxfHx8fDE3NjEyMzk0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="serif text-5xl md:text-6xl mb-4 text-center">
        What's New?
      </h2>

      <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto text-lg">
        Stay updated with the latest initiatives, workshops, and events from AEGIS. Explore
        opportunities to engage with disaster preparedness and community resilience programs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <NewsCard key={index} card={card} />
        ))}
      </div>

      <div className="text-center mt-12">
        <a href="#more" className="text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider text-sm font-medium">
          SEE MORE →
        </a>
      </div>
    </section>
  );
}

function NewsCard({ card }: { card: any }) {
  return (
    <div className="relative h-80 overflow-hidden rounded-lg cursor-pointer group">
      <ImageWithFallback
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="serif text-2xl text-white leading-tight">{card.title}</h3>
      </div>
    </div>
  );
}

function DisasterTypesSection() {
  const disasters = [
    {
      id: 'tsunami',
      name: 'Tsunami',
      category: 'Natural Disaster',
      description: 'A tsunami is a series of ocean waves with very long wavelengths caused by large-scale disturbances of the ocean, such as earthquakes, volcanic eruptions, or underwater landslides.',
      origin: 'Coastal Regions',
      severity: 'Extreme',
      image: 'https://images.unsplash.com/photo-1701172158005-504bb8589d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwb2NlYW4lMjB3YXZlfGVufDF8fHx8MTc2MTMxNTc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'landslide',
      name: 'Landslide',
      category: 'Natural Disaster',
      description: 'Landslides occur when masses of rock, earth, or debris move down a slope. They can be caused by rainfall, earthquakes, volcanic activity, or human modification of land.',
      origin: 'Mountainous Areas',
      severity: 'High',
      image: 'https://images.unsplash.com/photo-1621315898086-0e940d7a221e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2xpZGUlMjBtb3VudGFpbiUyMGRpc2FzdGVyfGVufDF8fHx8MTc2MTMxNTc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'cyclone',
      name: 'Cyclone',
      category: 'Natural Disaster',
      description: 'Cyclones are intense circular storms that originate over warm tropical oceans. They feature low atmospheric pressure, high winds, and heavy rain that can cause devastating damage.',
      origin: 'Tropical Oceans',
      severity: 'Extreme',
      image: 'https://images.unsplash.com/photo-1641933002369-1122e78d0b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwc3Rvcm0lMjBodXJyaWNhbmV8ZW58MXx8fHwxNzYxMzE1Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'urbanflood',
      name: 'Urban Flood',
      category: 'Natural Disaster',
      description: 'Urban flooding occurs when water overwhelms city drainage systems, often due to heavy rainfall. Concrete surfaces and inadequate infrastructure increase vulnerability in densely populated areas.',
      origin: 'Urban Areas',
      severity: 'Moderate to High',
      image: 'https://images.unsplash.com/photo-1591660096538-910a67a5304f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZsb29kJTIwY2l0eXxlbnwxfHx8fDE3NjEzMTU3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'chemical',
      name: 'Chemical',
      category: 'Man-Made Disaster',
      description: 'Chemical disasters involve the release of toxic substances that can harm human health and the environment. They may result from industrial accidents, transportation incidents, or facility failures.',
      origin: 'Industrial Facilities',
      severity: 'High',
      image: 'https://images.unsplash.com/photo-1581358723956-6ad0cd4fab45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGluZHVzdHJpYWwlMjBoYXphcmR8ZW58MXx8fHwxNzYxMzE1Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'nuclear',
      name: 'Nuclear',
      category: 'Man-Made Disaster',
      description: 'Nuclear disasters involve the release of radioactive materials from nuclear facilities. These events can have long-lasting environmental and health impacts across vast geographical areas.',
      origin: 'Nuclear Facilities',
      severity: 'Extreme',
      image: 'https://images.unsplash.com/photo-1591200834528-4050ce99fe78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWNsZWFyJTIwcG93ZXIlMjBwbGFudHxlbnwxfHx8fDE3NjEyMTQxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'earthquake',
      name: 'Earthquake',
      category: 'Natural Disaster',
      description: 'Earthquakes are sudden ground movements caused by the release of energy in the Earth\'s crust. They can trigger tsunamis, landslides, and cause widespread structural damage.',
      origin: 'Seismic Zones',
      severity: 'Extreme',
      image: 'https://images.unsplash.com/photo-1652565650574-b87cbe238ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZ3JvdW5kJTIwY3JhY2t8ZW58MXx8fHwxNzYxMzE1Nzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  // Start with index 3 so "Chemical" is in the center (Urban Flood, Chemical, Nuclear visible)
  const [currentIndex, setCurrentIndex] = useState(3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? disasters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === disasters.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + disasters.length) % disasters.length;
      cards.push({ disaster: disasters[index], position: i });
    }
    return cards;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="mb-16">
        <span className="text-gray-500 uppercase tracking-wider text-xs">DISASTER TYPES</span>
      </div>

      <div className="space-y-12">
        {/* Coverflow 3D Carousel */}
        <div className="relative h-[500px] flex items-center justify-center overflow-visible" style={{ perspective: '2000px' }}>
          <div className="relative w-full h-full flex items-center justify-center mx-auto">
            {getVisibleCards().map(({ disaster, position }) => {
              const isCenter = position === 0;
              
              // Coverflow calculations
              const translateX = position * 320; // Horizontal spacing
              const translateZ = isCenter ? 0 : -400; // Depth - side cards pushed back
              const rotateY = position * -50; // Strong rotation for coverflow effect
              const scale = isCenter ? 1.1 : 0.75; // Center card larger, sides smaller
              const opacity = isCenter ? 1 : 0.6; // Fade side cards
              const blur = isCenter ? 0 : 4; // Blur side cards
              const brightness = isCenter ? 1 : 0.7; // Darken side cards
              const zIndex = isCenter ? 30 : 20 - Math.abs(position) * 10;

              return (
                <motion.div
                  key={`${disaster.id}-${position}`}
                  className="absolute"
                  style={{ 
                    zIndex,
                    width: '450px',
                    height: '400px',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onClick={() => {
                    if (position < 0) handlePrev();
                    else if (position > 0) handleNext();
                  }}
                >
                  <div 
                    className={`relative w-full h-full rounded-lg overflow-hidden shadow-2xl bg-gray-800 ${
                      !isCenter ? 'cursor-pointer' : ''
                    }`}
                    style={{
                      filter: `blur(${blur}px) brightness(${brightness})`,
                      transition: 'filter 0.7s ease',
                    }}
                  >
                    <img
                      src={disaster.image}
                      alt={disaster.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Vignette effect on side cards */}
                    {!isCenter && (
                      <>
                        <div className="absolute inset-0 bg-black/50" />
                        <div 
                          className="absolute inset-0" 
                          style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 70%)',
                          }}
                        />
                      </>
                    )}
                    
                    {/* Card label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                      <h4 className={`serif text-white font-medium transition-all duration-700 ${
                        isCenter ? 'text-3xl' : 'text-xl'
                      }`}>
                        {disaster.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation arrows - Left and Right */}
          <button
            onClick={handlePrev}
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-xl"
            aria-label="Previous card"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-xl"
            aria-label="Next card"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Share Section */}
      <div className="flex items-center justify-end gap-3 mt-12 text-xs text-gray-500">
        <span>Share on</span>
        <button className="hover:text-white transition-colors">Fb</button>
        <button className="hover:text-white transition-colors">Tw</button>
        <button className="hover:text-white transition-colors">Ig</button>
      </div>
    </section>
  );
}

function DisasterCard({
  title,
  description,
  date,
  image,
}: {
  title: string;
  description: string;
  date: string;
  image: string;
}) {
  return (
    <div className="relative h-96 overflow-hidden cursor-pointer group">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{date}</p>
        <h3 className="serif text-3xl text-white mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 THE AEGIS AUTHORITY. All rights reserved.
          </p>

          <nav className="flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              About
            </a>
            <a
              href="#resources"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              Resources
            </a>
            <a
              href="#mitigation"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              Mitigation
            </a>
            <a
              href="#response"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              Response
            </a>
            <a
              href="#gallery"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
            >
              Gallery
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
