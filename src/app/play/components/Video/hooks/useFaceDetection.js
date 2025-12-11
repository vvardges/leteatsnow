import { useEffect, useRef, useState, useCallback } from 'react';
/**
 * Face detection hook component
 *
 * @param {ComponentType} props component props
 * @return {ReturnType} Detection results
 */
function useFaceDetection({
  handleOnFaceDetected,
  faceDetectionOptions: options,
  faceDetection: faceDetectionInitializer,
  camera,
}) {
  const [cameraManager, setCameraManager] = useState();

  const webcamRef = useRef(null);
  const faceDetection = useRef(faceDetectionInitializer).current;

  /**
   * Handles face detection
   *
   * @param {HTMLVideoElement} mediaSrc Current media source
   */
  const handleFaceDetection = useCallback(() => {
    faceDetection.setOptions({
      ...options,
    });
    faceDetection.onResults(handleOnFaceDetected);
  }, [handleOnFaceDetected]);

  useEffect(() => {
    if (!webcamRef.current || !webcamRef.current.video || !camera) return;

    const mediaSrc = webcamRef.current.video;
    setCameraManager(() =>
      camera({
        mediaSrc,
        width: mediaSrc.videoWidth,
        height: mediaSrc.videoHeight,
        onFrame: async () => {
          await faceDetection.send({
            image: mediaSrc,
          });
        },
      }),
    );
  }, []);

  useEffect(() => {
    handleFaceDetection();
  }, [handleFaceDetection, handleOnFaceDetected]);

  useEffect(() => {
    cameraManager?.start();

    // stops camera detection when component unmounts
    return () => {
      cameraManager?.stop();
    };
  }, [cameraManager]);

  return { webcamRef };
}

export default useFaceDetection;
