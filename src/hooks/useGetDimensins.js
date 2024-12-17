import {useEffect, useState} from "react";

export const useGetDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 375,
        height: 667
    });

    useEffect(() => {
        // Handle resizing of window
        const handleResize = () => {
            setWindowDimensions({
                width: 375,
                height: 667
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowDimensions;
}