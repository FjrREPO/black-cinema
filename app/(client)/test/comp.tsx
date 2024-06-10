'use client'

import { motion, useTransform, useScroll } from 'framer-motion';
import React from 'react';

interface ParallaxImageProps {
    imageUrl: string
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ imageUrl }) => {
    const { scrollY } = useScroll();

    const scrollProgress = useTransform(scrollY, [0, window.innerHeight], [0, 1]);

    const scale = useTransform(scrollProgress, [0, 1], [0.2, 1]);

    const translateY = useTransform(scrollProgress, [0, 1], ['0%', '0%']);

    return (
        <div style={{ height: '200vh' }}>
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <motion.img
                    src={imageUrl}
                    alt="Parallax Image"
                    style={{
                        scale,
                        y: translateY,
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </motion.div>
        </div>
    );
};

export default ParallaxImage;
