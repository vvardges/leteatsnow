import React, { useEffect, useRef } from "react";
import {useAppContext} from "../../Context";

import snowImg from "./snow.png";
import bombImg from "./bomb.png";
import {useGetDimensions} from "../../hooks/useGetDimensins";

// load bubbleImg
const SnowImgObj = new Image(100, 100);
SnowImgObj.src = snowImg;

const BombImgObj = new Image(100, 100);
BombImgObj.src = bombImg;

const SnowfallCanvas = () => {
    const canvasRef = useRef(null);
    const {mouthCoordinates, onParticleDelete} = useAppContext();

    useEffect(() => {
        //console.log(mouthCoordinates);
        canvasRef.mouthCoordinates = mouthCoordinates;
    }, [mouthCoordinates]);

    const windowDimensions = useGetDimensions();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
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
                type: particles.length % 7 === 0 ?  "loss" : "point"
            })
        }

        // Create particles
        for (let i = 0; i < mp; i++) {
            createParticle();
        }

        let angle = 0;

        // Update and draw particles
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();

            particles.forEach((p) => {
                ctx.moveTo(p.x, p.y);
                ctx.drawImage(p.type === "point" ? SnowImgObj : BombImgObj, p.x, p.y, p.r, p.r);
            });

            ctx.fill();
            updateParticles(particles, W, H, angle);
            angle += 0.01;
        };

        // Function to update particle positions
        const updateParticles = (particles, W, H, angle) => {
            particles.forEach((p, i) => {
                // Updating X and Y coordinates
                p.y += Math.cos(angle + p.d) + 1 + p.r / 10;
                p.x += Math.sin(angle) * 2;

                const {x, y} = canvasRef.mouthCoordinates;
                if (p.y > y-50 && p.y < y+50 && p.x > x-50 && p.x < x+50) {
                    onParticleDelete(p.type);
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

        // Initial call to draw
        const intervalId = setInterval(draw, 50);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [windowDimensions]);

    return <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 1 }}></canvas>;
};

export default SnowfallCanvas;
