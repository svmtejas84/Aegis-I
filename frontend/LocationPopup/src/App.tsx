import { MapPin, X } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleAllowLocation = () => {
    setIsGettingLocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Store location in localStorage
          localStorage.setItem('userLocation', JSON.stringify({
            lat: latitude,
            lng: longitude,
            timestamp: new Date().toISOString()
          }));
          
          console.log('Location captured:', { latitude, longitude });
          
          // Redirect to Map Public after location permission granted
          window.location.href = 'http://localhost:3000';
        },
        (error) => {
          setIsGettingLocation(false);
          console.error('Geolocation error:', error);
          
          let errorMessage = 'Unable to get your location. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location permission was denied. Please enable location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
          }
          
          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsGettingLocation(false);
      alert('Geolocation is not supported by your browser. Please use a modern browser to access location features.');
    }
  };

  const handleNotNow = () => {
    // Show alert message
    alert("Can't proceed without location access. Kindly enable it.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Location Permission Modal */}
      <div 
        className="rounded-xl p-8 max-w-md w-full relative shadow-2xl"
        style={{ 
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 transition-colors duration-200"
          style={{ color: '#999' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
          onClick={handleNotNow}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Location Icon */}
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            }}
          >
            <MapPin className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>

          {/* Main Text */}
          <h3 
            className="text-xl mb-2"
            style={{ 
              color: '#ffffff',
              fontWeight: '400',
              lineHeight: '1.4'
            }}
          >
            To see alerts near you,
          </h3>
          <p 
            className="mb-1"
            style={{ 
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '400'
            }}
          >
            please allow location access
          </p>

          {/* Subtext */}
          <p 
            className="text-sm mb-8 mt-4 leading-relaxed max-w-sm"
            style={{ 
              color: '#999',
              lineHeight: '1.6'
            }}
          >
            We'll use your location to show you relevant alerts and updates in your area
          </p>

          {/* Buttons */}
          <div className="flex flex-row w-full" style={{ gap: '70px' }}>
            {/* Allow Location Button */}
            <button 
              className="rounded-md gap-2 transition-all duration-200 flex items-center justify-center"
              style={{
                backgroundColor: isGettingLocation ? '#9ca3af' : '#22c55e',
                color: '#ffffff',
                fontWeight: '500',
                fontSize: '0.9rem',
                border: 'none',
                cursor: isGettingLocation ? 'not-allowed' : 'pointer',
                padding: '10px 20px',
                minWidth: '150px',
                opacity: isGettingLocation ? 0.7 : 1
              }}
              onMouseEnter={(e) => !isGettingLocation && (e.currentTarget.style.backgroundColor = '#16a34a')}
              onMouseLeave={(e) => !isGettingLocation && (e.currentTarget.style.backgroundColor = '#22c55e')}
              onClick={handleAllowLocation}
              disabled={isGettingLocation}
            >
              <MapPin className="w-4 h-4" />
              {isGettingLocation ? 'Getting Location...' : 'Allow Location'}
            </button>
            
            {/* Not now Button */}
            <button 
              className="rounded-md transition-all duration-200"
              style={{
                backgroundColor: '#5a5a5a',
                color: '#d0d0d0',
                fontWeight: '500',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 24px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#666';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5a5a5a';
                e.currentTarget.style.color = '#d0d0d0';
              }}
              onClick={handleNotNow}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
