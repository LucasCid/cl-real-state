// import { delay } from "framer-motion"

import { delay } from "framer-motion"

export const fadeIn = () => {
    return {
        hidden: {
            opacity: 0,
            y: 10,
            x:0,
            transition:{
                type: "tween",
                duration: 0.8,
                delay: 0.8,
                ease: [0.25],
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.7,
                type: "tween",
                delay: 0.7,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };
};