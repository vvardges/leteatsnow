import { useEffect, useRef } from 'react';
import { Application, Sprite, Assets } from 'pixi.js';
import { useAppStore } from '@/app/store/useAppStore';

export default function Snowfall({mouthRef}) {
  const addScore = useAppStore((s) => s.addScore);
  const size = useAppStore(s => s.size);

  const containerRef = useRef(null);
  const flakesRef = useRef([]);
  const appRef = useRef(null);

  const resetFlake = (flake, maxW, maxH) => {
    flake.x = Math.random() * maxW;
    flake.y = Math.random() * maxH;
    flake.alpha = 0.7 + Math.random() * 0.3;
    flake.speed = 1 + Math.random() * 2;
    //flake.scale.set(0.3 + Math.random() * 0.9);
  };

  useEffect(() => {
    let destroyed = false;

    (async () => {
      if (!containerRef.current) return;

      const app = new Application();
      await app.init({
        width: size,
        height: size,
        backgroundAlpha: 0,
        antialias: false,
        powerPreference: 'high-performance',
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio, 2),
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      const svgTexture = await Assets.load('/snow.svg');

      const width = app.renderer.width;
      const height = app.renderer.height;

      for (let i = 0; i < 20; i++) {
        const flake = new Sprite(svgTexture);
        flake.width = 100;   // e.g. 20
        flake.height = 100;  // keep square
        resetFlake(flake, width, height);
        flakesRef.current.push(flake);
        app.stage.addChild(flake);
      }

      app.ticker.add(() => {
        const h = app.renderer.height; // in case of resize
        flakesRef.current.forEach((flake) => {
          flake.y += flake.speed;
          flake.x += Math.sin(flake.y * 0.01) * 0.8;

          const mouth = mouthRef.current;
          if (flake.y > h) {
            resetFlake(flake, app.renderer.width, 0);
          } else if (mouth && flake.x > mouth.x - 50 && flake.x < mouth.x + 50 && flake.y < mouth.y + 50 && flake.y > mouth.y - 50) {
            resetFlake(flake, app.renderer.width, 0);
            addScore();
          }
        });
      });
    })();

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
      flakesRef.current = [];
    };
  }, [mouthRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        pointerEvents: 'none', // so touches go to the video
        zIndex: 2, // make sure it's above the video
      }}
    />
  );
}
