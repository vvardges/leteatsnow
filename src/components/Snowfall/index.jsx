'use client';

import { memo, useEffect } from 'react';
import { useAppContext } from '../../Context';

import { useGetDimensions } from '../../hooks/useGetDimensins';

const SnowImgObj = new Image(100, 100);
SnowImgObj.src = './snow.svg';

const LoseImgObj = new Image(100, 100);
LoseImgObj.src = './ice.svg';

const MouthImgObj = new Image(100, 100);
MouthImgObj.src = './mouth.png';

const Snowfall = ({ canvasRef }) => {
  const { onParticleDelete, score, onPauseGame, paused } = useAppContext();

  let timeoutId;
  const handleParticleDelete = (type) => {
    if (canvasRef.mouthIsLocked) return;

    if (type === 'loss') canvasRef.mouthIsLocked = true;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      canvasRef.mouthIsLocked = false;
    }, 4000);

    onParticleDelete(type);
  };

  const handlePause = () => {
    onPauseGame();
  };

  useEffect(() => {
    canvasRef.paused = paused;
  }, [paused]);

  useEffect(() => {
    canvasRef.score = score;
  }, [score]);

  const windowDimensions = useGetDimensions();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = windowDimensions.width;
    const H = windowDimensions.height;
    canvas.width = W;
    canvas.height = H;

    const mp = 20; // max particles
    const particles = [];

    const createParticle = () => {
      particles.push({
        x: Math.random() * W, // x-coordinate
        y: particles.length >= mp ? 0 : Math.random() * H, // y-coordinate
        r: 50, // radius
        d: Math.random() * mp, // density
        type: particles.length % 7 === 0 ? 'loss' : 'point',
      });
    };

    // Create particles
    for (let i = 0; i < mp; i++) {
      createParticle();
    }

    let angle = 0;

    // Update and draw particles
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();

      particles.forEach((p) => {
        ctx.drawImage(
          p.type === 'point' ? SnowImgObj : LoseImgObj,
          p.x,
          p.y,
          p.r,
          p.r,
        );
      });

      if (canvasRef.mouthIsLocked) {
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(
          MouthImgObj,
          canvasRef.mouthCoordinates.x - 50,
          canvasRef.mouthCoordinates.y - 50,
          100,
          100,
        );
      }

      ctx.fill();
      updateParticles(particles, W, H, angle);
      angle += 0.01;
    };

    // Function to update particle positions
    const updateParticles = (particles, W, H, angle) => {
      if (canvasRef.paused) {
        return;
      }
      particles.forEach((p, i) => {
        // Updating X and Y coordinates
        const speed = Math.ceil(canvasRef.score / 100) * 0.01 + 0.5; // Control the overall speed
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 10) * speed;
        p.x += Math.sin(angle) * speed;

        if (!canvasRef.mouthCoordinates) return;

        const { x, y } = canvasRef.mouthCoordinates;
        if (
          !canvasRef.mouthIsLocked &&
          p.y > y - 50 &&
          p.y < y + 50 &&
          p.x > x - 50 &&
          p.x < x + 50
        ) {
          handleParticleDelete(p.type);
          createParticle();
          delete particles[i];
        }

        // Resetting flakes if they go off screen
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          delete particles[i];
          createParticle();
        }
      });
    };

    let animationFrameId;

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [windowDimensions]);

  return (
    <canvas
      onClick={handlePause}
      ref={canvasRef}
      style={{ position: 'absolute', zIndex: 1 }}
    />
  );
};

export default memo(Snowfall);
