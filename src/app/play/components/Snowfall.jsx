import { useEffect, useRef } from 'react';
import { Application, Sprite, Assets } from 'pixi.js';
import { useAppStore } from '@/app/store/useAppStore';
import { track } from '@/app/services';

export default function Snowfall({ mouthRef }) {
  const addScore = useAppStore((s) => s.addScore);
  const subtractLive = useAppStore((s) => s.subtractLive);
  const size = useAppStore((s) => s.size);
  const spriteSize = size / 6;

  const containerRef = useRef(null);
  const flakesRef = useRef([]);
  const iceRef = useRef([]);
  const appRef = useRef(null);

  const resetFallingSprite = (sprite, maxW, startY) => {
    sprite.x = Math.random() * maxW;
    sprite.y = startY;
    sprite.alpha = 0.7 + Math.random() * 0.3;
    sprite.speed = 0.5 + Math.random();
  };

  const resetIce = (ice, maxW) => {
    ice.x = Math.random() * maxW;
    ice.y = 0;
    ice.alpha = 1;
    ice.speed = 1 + Math.random() * 2;
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
        resolution: window.devicePixelRatio,
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      const snowTexture = await Assets.load('/snow.svg');
      const iceTexture = await Assets.load('/ice.svg');

      const width = app.renderer.width;
      const height = app.renderer.height;

      // --- Snow (score)
      for (let i = 0; i < 20; i++) {
        const flake = new Sprite(snowTexture);
        flake.width = spriteSize;
        flake.height = spriteSize;
        resetFallingSprite(flake, width, Math.random() * height);
        flakesRef.current.push(flake);
        app.stage.addChild(flake);
      }

      // --- Ice (subtract life) - count = 3
      for (let i = 0; i < 3; i++) {
        const ice = new Sprite(iceTexture);
        ice.width = spriteSize;
        ice.height = spriteSize;
        resetIce(ice, width, Math.random() * height);
        iceRef.current.push(ice);
        app.stage.addChild(ice);
      }

      const isMouthHit = (sprite, mouth) => {
        return (
          mouth &&
          sprite.x + spriteSize / 2 > mouth.x - 25 &&
          sprite.x + spriteSize / 2 < mouth.x + 25 &&
          sprite.y + spriteSize < mouth.y + 25 &&
          sprite.y + spriteSize > mouth.y + 5
        );
      };

      app.ticker.add(() => {
        if (mouthRef?.current?.paused) return;

        const h = app.renderer.height;
        const mouth = mouthRef.current;

        flakesRef.current.forEach((flake) => {
          flake.y += flake.speed;
          flake.x += Math.sin(flake.y * 0.01) * 0.8;

          if (flake.y > h) {
            resetFallingSprite(flake, app.renderer.width, 0);
          } else if (isMouthHit(flake, mouth)) {
            resetFallingSprite(flake, app.renderer.width, 0);
            addScore();
            track('snowflake_eaten');
          }
        });

        if(mouthRef.current){
          iceRef.current.forEach((ice) => {
            ice.y += ice.speed;

            if (ice.y > h) {
              resetIce(ice, app.renderer.width);
            } else if (isMouthHit(ice, mouth)) {
              resetIce(ice, app.renderer.width);
              subtractLive();
              track('ice_eaten');
            }
          });
        }

      });
    })();

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
      flakesRef.current = [];
      iceRef.current = [];
    };
  });

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
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
