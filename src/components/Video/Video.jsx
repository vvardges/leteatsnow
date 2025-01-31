'use client';

import { useEffect, useRef } from 'react';
import { FilesetResolver, FaceDetector } from '@mediapipe/tasks-vision';
import { Camera } from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';
import { useGetDimensions } from '../../hooks/useGetDimensins';

const Video = ({ canvasRef }) => {
  const windowDimensions = useGetDimensions();
  const { width, height } = windowDimensions;
  const webcamRef = useRef(null);
  const cameraRef = useRef(null);
  const faceDetectorRef = useRef(null);

  // Handle face detection results
  const handleOnFaceDetected = ({ detections }) => {
    let newX;
    let newY;
    try {
      // Assuming the mouth is the 3rd landmark (index 3) in the face detection model.
      const { x, y } = detections[0].landmarks[3];
      newX = (1 - x) * 100;
      newY = y * 100;
    } catch (e) {
      // Fallback in case no face is detected
      newX = windowDimensions.width;
      newY = windowDimensions.height;
    }

    // Update canvas with new mouth coordinates (adjusted by window dimensions)
    canvasRef.mouthCoordinates = {
      x: (width * newX) / 100,
      y: (height * newY) / 100,
    };
  };

  useEffect(() => {
    async function initializeFaceDetection() {
      try {
        // Initialize the vision object
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm',
        );

        // Initialize the face detector with necessary options
        faceDetectorRef.current = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
          },
          runningMode: 'VIDEO',
          minDetectionConfidence: 0.5,
        });

        console.log('✅ FaceDetector initialized successfully!');

        // Set up the camera to detect faces in the video stream
        if (webcamRef.current && webcamRef.current.video) {
          cameraRef.current = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              if (faceDetectorRef.current) {
                // Detect faces for each frame in the video
                const results = await faceDetectorRef.current.detectForVideo(
                  webcamRef.current.video,
                  Date.now(),
                );

                // Call the handleOnFaceDetected function with detection results
                if (results.detections.length > 0) {
                  handleOnFaceDetected(results);
                }
              }
            },
            width,
            height,
          });

          cameraRef.current.start();
        }
      } catch (error) {
        console.error('❌ Error initializing FaceDetector:', error);
      }
    }

    initializeFaceDetection();

    // Cleanup when the component unmounts
    return () => {
      cameraRef.current?.stop();
    };
  }, [width, height]);

  return (
    <Webcam
      videoConstraints={{
        aspectRatio: 0.6666666667,
      }}
      ref={webcamRef}
      mirrored={true}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 0,
        position: 'absolute',
      }}
    />
  );
};

export default Video;
