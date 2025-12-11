'use client';

import Webcam from 'react-webcam';
import { useEffect, useRef } from 'react';
import { useGetDimensions } from '../../hooks/useGetDimensins';

export default function Video({ canvasRef }) {
  const windowDimensions = useGetDimensions();
  const { width, height } = windowDimensions;

  const webcamRef = useRef(null);

  // ----------------------------
  // Handle detected face output
  // ----------------------------
  const handleOnFaceDetected = ({ detections }) => {
    let newX, newY;

    try {
      const { x, y } = detections[0].landmarks[3];
      newX = (1 - x) * 100;
      newY = y * 100;
    } catch (e) {
      newX = width;
      newY = height;
    }

    canvasRef.mouthCoordinates = {
      x: (width * newX) / 100,
      y: (height * newY) / 100,
    };
  };

  // -------------------------------------------------------
  // Setup FaceDetection + Camera dynamically (Next.js safe)
  // -------------------------------------------------------
  useEffect(() => {
    let camera;
    let faceDetection;

    async function loadMediapipe() {
      // Load dynamic ESM modules — REQUIRED for Next.js
      const { Camera } = await import('@mediapipe/camera_utils');
      const { FaceDetection } = await import('@mediapipe/face_detection');

      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      faceDetection.setOptions({ model: 'short' });

      // Setup MediaPipe Camera wrapper
      camera = new Camera(webcamRef.current.video, {
        width,
        height,
        async onFrame() {
          await faceDetection.send({ image: webcamRef.current.video });
        },
      });

      faceDetection.onResults((res) => {
        handleOnFaceDetected(res);
      });

      camera.start();
    }

    loadMediapipe();

    return () => {
      camera?.stop?.();
    };
  }, [width, height]);

  return (
    <Webcam
      ref={webcamRef}
      mirrored
      videoConstraints={{
        aspectRatio: 0.6666666667,
      }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        zIndex: 0,
      }}
    />
  );
}
