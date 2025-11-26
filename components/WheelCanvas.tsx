
import React, { useRef, useEffect, useState } from 'react';
import { WheelItem } from '../types';
import { runConfetti } from '../utils/confetti';
import { playClickSound } from '../utils/audio';

interface WheelCanvasProps {
  items: WheelItem[];
  size: number; // This is the desktop size setting
  spinDuration: number;
  onSpinEnd: (winner: string) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
}

const WheelCanvas: React.FC<WheelCanvasProps> = ({ 
  items, 
  size, 
  spinDuration, 
  onSpinEnd,
  isSpinning,
  setIsSpinning
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Constants
  const CANVAS_SIZE = 800; // Internal resolution
  const CENTER = CANVAS_SIZE / 2;
  const RADIUS = CANVAS_SIZE / 2 - 20;

  // Draw function
  const draw = (currentRot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    if (items.length === 0) return;

    const arc = (2 * Math.PI) / items.length;
    const isDark = document.documentElement.classList.contains('dark');

    items.forEach((item, i) => {
      const angle = currentRot + i * arc;
      
      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.moveTo(CENTER, CENTER);
      ctx.arc(CENTER, CENTER, RADIUS, angle, angle + arc);
      ctx.lineTo(CENTER, CENTER);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = isDark ? '#1f2937' : '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(CENTER, CENTER);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 4;
      ctx.fillText(item.text, RADIUS - 50, 10);
      ctx.restore();
    });
  };

  // Initial Draw & Resize
  useEffect(() => {
    draw(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, rotation]);

  const handleStartSpin = () => {
    if (isSpinning || items.length < 2) {
      if (items.length < 2) alert('至少需要2个选项才能开始！');
      return;
    }

    playClickSound();
    setIsSpinning(true);

    const winIndex = Math.floor(Math.random() * items.length);
    const winItem = items[winIndex];

    const num = items.length;
    const arc = (2 * Math.PI) / num;
    const currentAngleMod = rotation % (2 * Math.PI);
    
    // Calculate target angle to point at the winner
    // The pointer is at 270 degrees (1.5 * PI) or top
    const pointerPos = 1.5 * Math.PI;
    const targetSectorAngle = winIndex * arc + arc / 2;
    
    let delta = pointerPos - targetSectorAngle - currentAngleMod;
    while (delta < 0) delta += 2 * Math.PI;
    
    // Add extra rotations for suspense
    delta += 5 * 2 * Math.PI; 

    const targetRotation = rotation + delta;
    const startTime = performance.now();
    const startRot = rotation;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (spinDuration * 1000), 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const newRotation = startRot + (targetRotation - startRot) * ease;
      
      setRotation(newRotation);
      draw(newRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setRotation(newRotation % (2 * Math.PI)); // Normalize
        runConfetti();
        onSpinEnd(winItem.text);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 relative">
      <div className="relative flex justify-center items-center">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10 w-8 h-10 bg-rose-500 clip-pointer shadow-md filter drop-shadow-lg" 
             style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
        </div>

        {/* Wheel Wrapper - Mobile Size Fixed, Desktop Size Variable */}
        <div 
          className="relative rounded-full overflow-visible transition-all duration-300 shadow-2xl border-4 border-gray-200 dark:border-gray-700"
          style={{ 
            width: 'var(--wheel-size)', 
            height: 'var(--wheel-size)' 
          }}
        >
            {/* 
               CRITICAL FIX: 
               On mobile (default), we set a CSS variable for fixed size (e.g. 280px or 300px).
               On desktop (md:), we use the dynamic `size` prop.
            */}
            <style>{`
                :root { --wheel-size: 290px; }
                @media (min-width: 768px) {
                    :root { --wheel-size: ${size}px; }
                }
            `}</style>

          <canvas 
            ref={canvasRef}
            width={CANVAS_SIZE} 
            height={CANVAS_SIZE}
            className="w-full h-full rounded-full"
          />
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-2xl z-10">
            🎯
          </div>
        </div>
      </div>

      <button 
        onClick={handleStartSpin}
        disabled={isSpinning}
        className="mt-8 px-10 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-bold rounded-full shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span>🚀</span> 开始抽奖
      </button>
    </div>
  );
};

export default WheelCanvas;
