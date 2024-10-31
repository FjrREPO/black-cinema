"use client"

import { motion } from "framer-motion"
import ParallaxText from "./ParallaxText"
import DigitalGlobe from "@/components/DigitalGlobe"
import ParallaxHero from "./ParallaxHero"
export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center"
      initial="initial"
      animate="animate"
    >
      <ParallaxHero /> 
      <div className="mt-10 w-full overflow-hidden">
        <ParallaxText direction={500} baseVelocity={-1}>
          Black Cinema
        </ParallaxText>
        <ParallaxText direction={-500} baseVelocity={1}>
          Booking Ruang Cinema
        </ParallaxText>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute z-50 left-0 top-[50%] hidden h-[121px] w-[350px] flex-col items-start justify-center rounded-br-full rounded-tr-full bg-zinc-800 px-5 dark:bg-zinc-100 lg:flex"
      >
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
          Lokasi
        </p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
          Sleman
        </p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
          Daerah Istimewa Yogyakarta
        </p>
        <DigitalGlobe className="absolute right-3 top-[10%]" />
      </motion.div>
    </motion.section>
  )
}
