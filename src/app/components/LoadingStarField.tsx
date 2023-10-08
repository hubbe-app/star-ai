import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
}

const LoadingStarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars: Star[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("2D rendering context not supported!");
      return;
    }

    const generateStars = () => {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        stars.push({ x, y, radius });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.x -= 2.5; 
        if (star.x < 0) {
          star.x = canvas.width;
        }
      }

      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    generateStars();
    animate();

    return () => {
      stars.length = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    ></canvas>
  );
};

export default LoadingStarField;