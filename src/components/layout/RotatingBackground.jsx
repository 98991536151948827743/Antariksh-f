import React from 'react';

const SlidingBackground = ({
  imagePath = '/rotatingbg.png',
  slidingSpeed = 120, // seconds for full motion before stopping
  opacity = 0.3,
  className = ''
}) => {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        zIndex: -2,
        backgroundColor: '#000011' // Dark space 
      }}
    >
      <div
        className="sliding-bg-container"
        style={{
          opacity: opacity,
          animation: `rotateXAnim ${slidingSpeed}s forwards` // runs once and stops==control speed given above 
        }}
      >
        <img
          src={imagePath}
          alt="Cosmic Background"
          className="sliding-bg-image"
          onLoad={() => console.log('Sliding background image loaded successfully')}
          onError={(e) => {
            console.log('Failed to load sliding background image:', imagePath);
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 
              'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.8) 0%, rgba(12, 18, 34, 0.9) 50%, rgba(0, 0, 17, 1) 100%)';
            e.target.parentElement.style.backgroundSize = 'cover';
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotateXAnim {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(45deg); } /* rotate only once */
        }
        .sliding-bg-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
        }
        .sliding-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default SlidingBackground;
