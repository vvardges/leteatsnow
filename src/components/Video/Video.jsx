import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection } from '@mediapipe/face_detection';
import Webcam from 'react-webcam';

import useFaceDetection from './hooks/useFaceDetection';
import {useAppContext} from "../../Context";
import {useGetDimensions} from "../../hooks/useGetDimensins";

const Video = () => {
    const {setMouthCoordinates} = useAppContext();
    const windowDimensions = useGetDimensions();
    const {width, height} = windowDimensions;

    const handleOnFaceDetected = ({
                                      detections
                                  }) => {
        let newX;
        let newY;
        try{
            const {x, y} = detections[0].landmarks[3];
            newX = (1-x)*100;
            newY = y*100;
        } catch (e) {
            newX = windowDimensions.width;
            newY = windowDimensions.height;
        }
        //console.log(camWidth*newX/100)
        setMouthCoordinates({x:width*newX/100, y:height*newY/100});
    };

    const { webcamRef } = useFaceDetection( {
        handleOnFaceDetected,
        faceDetectionOptions: {
            model: 'short',
        },
        faceDetection: new FaceDetection( {
            locateFile: ( file ) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${ file }`;
            }
        } ),
        camera: ({
              mediaSrc,
              onFrame
          }) => new Camera( mediaSrc, {
            onFrame,
            width: width,
            height: height
        } )
    } );

    return (
        <Webcam
            videoConstraints={{
                aspectRatio: 0.6666666667
            }}
            ref={ webcamRef }
            mirrored={true}
            style={ {
                width: `${width}px`,
                height: `${height}px`,
                zIndex: 0,
                position: 'absolute',
            } }
        />
    );
};

export default Video;