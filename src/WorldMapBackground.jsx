import React, { useEffect, useRef, useState } from 'react';
import CursorGrid from './CursorGrid';
import './WorldMapBackground.css';

export default function WorldMapBackground() {
  const backgroundRef = useRef(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setInteractive(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background || !interactive) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = event => {
      if (event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        background.style.setProperty('--map-x', `${x}px`);
        background.style.setProperty('--map-y', `${y}px`);
        background.style.setProperty('--map-presence', '1');
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      background.style.setProperty('--map-presence', '0');
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', leave);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      leave();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', leave);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [interactive]);

  return <div className="world-background" ref={backgroundRef} aria-hidden="true">
    <div className="world-map-mask world-map-base" />
    {interactive && <div className="world-map-mask world-map-interactive">
      <div className="world-map-spotlight" />
      <CursorGrid
        cellSize={30}
        color="#173a5e"
        gridColor="#cd9a49"
        highlight="area"
        gridStyle="dots"
        radius={220}
        holdTime={300}
        fadeDuration={1400}
        fillOpacity={0.12}
        maxOpacity={0.2}
        gridOpacity={0.008}
        spotlight={0.12}
        edgeFade={0.06}
        intro={false}
        clickPulse={false}
        dpr={1.25}
      />
    </div>}
  </div>;
}
