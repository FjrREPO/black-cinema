"use client"

import { cn } from "@/lib/utils"
import { useIsomorphicLayoutEffect } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

interface DigitalGlobeProps {
  className?: string
}

export default function DigitalGlobe({ className }: DigitalGlobeProps) {
  const el = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.timeline({
      scrollTrigger: {
        trigger: el.current,
        start: "100% 100%",
        end: "100% 0%",
        scrub: 0,
      },
    })

    ctx.to(el.current, {
      ease: "none",
      rotate: 90,
    })
  }, [])
  return (
    <div
      className={cn(
        "max-md h-24 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      ref={el}
    >
      <Image width={100} height={100} src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWV2dzhhMGVoNzBweHYwdXNjNms2dnlzZzhtZWc0M3dtNm13M2h4YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Uqe8ViIMzyQtcqmFKs/giphy.gif" alt="Digital Globe" />
    </div>
  )
}
