'use client';

import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import Button from '@/components/Button';

export default function Video({ onFaceDetected }) {
  const size = useAppStore(s => s.size);

  const webcamRef = useRef(null);
  const cameraRef = useRef(null);
  const faceDetectionRef = useRef(null);

  const [cameraState, setCameraState] = useState('idle'); // idle | ready | denied | error

  // ----------------------------
  // Start MediaPipe AFTER webcam
  // ----------------------------
  useEffect(() => {
    if (cameraState !== 'ready') return;
    if (!webcamRef.current?.video) return;

    let isActive = true;

    (async () => {
      const { Camera } = await import('@mediapipe/camera_utils');
      const { FaceDetection } = await import('@mediapipe/face_detection');

      const faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      faceDetection.setOptions({ model: 'short' });

      faceDetection.onResults((res) => {
        if (isActive) onFaceDetected(res);
      });

      const camera = new Camera(webcamRef.current.video, {
        width: size,
        height: size,
        async onFrame() {
          if (!isActive) return;
          await faceDetection.send({ image: webcamRef?.current?.video });
        },
      });

      faceDetectionRef.current = faceDetection;
      cameraRef.current = camera;

      try {
        await camera.start();
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      isActive = false;
      cameraRef.current?.stop?.();
      faceDetectionRef.current?.close?.();
    };
  }, [cameraState, size, onFaceDetected]);

  // ----------------------------
  // Webcam callbacks
  // ----------------------------
  const handleCameraReady = () => {
    setCameraState('ready');
  };

  const handleCameraError = (err) => {
    if (err?.name === 'NotAllowedError') {
      setCameraState('denied');
    } else {
      setCameraState('error');
    }
  };

  // ----------------------------
  // Open browser permission UI
  // ----------------------------
  const openBrowserSettings = () => {
    alert(
      'Camera access was blocked.\n\n' +
      'Please enable it manually:\n' +
      'Browser address bar → 🔒 → Camera → Allow → Reload'
    );
  };

  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          videoConstraints={{ aspectRatio: 1 }}
          onUserMedia={handleCameraReady}
          onUserMediaError={handleCameraError}
        />
      </div>

      {cameraState === 'denied' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          Camera permission is required to play ❄️
          <Button onClick={openBrowserSettings}>
            How to enable camera
          </Button>
        </div>
      )}
    </>
  );
}
