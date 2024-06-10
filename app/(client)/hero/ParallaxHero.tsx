"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function ParallaxHero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "600%"]);

    return (
        <div
            ref={ref}
            className="w-full h-screen overflow-hidden relative"
        >
            <motion.h1
                style={{ y: textY }}
                className="font-bold text-white text-5xl md:text-7xl z-10 relative top-[35vh] right-10 justify-end text-end"
            >
                Tentang Kami
            </motion.h1>

            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dutlw7bko/image/upload/v1716746109/Cinema/kungfupanda3_Arthur_Fong_1_jbxfua.jpg)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    y: backgroundY,
                }}
            />
            <div
                className="absolute inset-0 z-20"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dutlw7bko/image/upload/v1716747732/Cinema/kungpan_ofgx4x.png)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                }}
            />
        </div>
    );
}
