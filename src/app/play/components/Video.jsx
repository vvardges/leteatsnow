'use client';

import Webcam from 'react-webcam';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/app/store/useAppStore';

export default function Video({ onFaceDetected }) {
  const webcamRef = useRef(null);
  const size = useAppStore(s => s.size);
  // -------------------------------------------------------
  // Setup FaceDetection + Camera dynamically (Next.js safe)
  // -------------------------------------------------------
  useEffect(() => {
    let camera;
    let faceDetection;
    let isActive = true;

    async function loadMediapipe() {
      const { Camera } = await import('@mediapipe/camera_utils');
      const { FaceDetection } = await import('@mediapipe/face_detection');

      if (!isActive || !webcamRef.current || !webcamRef.current.video) return;

      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      faceDetection.setOptions({ model: 'short' });

      console.log(size);
      camera = new Camera(webcamRef.current.video, {
        width: size,
        height: size,
        async onFrame() {
          // Guard against unmount / missing video
          if (!isActive || !webcamRef.current || !webcamRef.current.video) {
            return;
          }

          await faceDetection.send({ image: webcamRef.current.video });
        },
      });

      faceDetection.onResults((res) => {
        if (!isActive) return;
        onFaceDetected(res);
      });

      await camera.start();
    }

    loadMediapipe();

    return () => {
      isActive = false;
      camera?.stop?.();
      // Optional: free FaceDetection resources
      faceDetection?.close?.();
    };
  }, [onFaceDetected]);

  return (
    <Webcam
      ref={webcamRef}
      audio={false}
      mirrored
      videoConstraints={{ aspectRatio: 1 }}
    />
  );
}
