'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useUIStore } from '@/lib/store/useUIStore';

export default function AnimatedCursor() {
  const { cursorType, cursorText } = useUIStore();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is touch or mobile
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      if (!mobile) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isMobile || hidden) return null;

  const isHovered = cursorType === 'hover' || cursorType === 'pointer';
  const isDrag = cursorType === 'drag';

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            clicked ? 0.8 : isHovered ? 1.8 : isDrag ? 2.2 : 1
          })`,
          width: isDrag ? '80px' : '40px',
          height: isDrag ? '80px' : '40px',
          backgroundColor: isDrag
            ? 'rgba(6, 182, 212, 0.1)'
            : isHovered
            ? 'rgba(99, 102, 241, 0.1)'
            : 'transparent',
          borderColor: isDrag
            ? 'rgba(6, 182, 212, 0.8)'
            : isHovered
            ? 'rgba(99, 102, 241, 0.8)'
            : 'rgba(255, 255, 255, 0.4)',
        }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center font-display text-[9px] font-bold tracking-widest text-accent uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Pinpoint Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            clicked ? 1.5 : isHovered ? 0.5 : 1
          })`,
          width: '6px',
          height: '6px',
        }}
      />
    </>
  );
}
