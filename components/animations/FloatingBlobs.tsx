'use client';

import React from 'react';

export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Indigo Blob */}
      <div 
        className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-[120px] animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      {/* Violet Blob */}
      <div 
        className="absolute top-[40%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-[#8b5cf6]/8 blur-[150px] animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      {/* Cyan Blob */}
      <div 
        className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent/8 blur-[100px] animate-float-slow"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}
