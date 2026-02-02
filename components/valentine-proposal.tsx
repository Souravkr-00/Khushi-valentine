"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "./floating-hearts"
import { AcceptanceForm } from "./acceptance-form"

export function ValentineProposal() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showPulse, setShowPulse] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setShowPulse(true)
      setTimeout(() => setShowPulse(false), 1000)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const moveNoButton = () => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width - 120
    const maxY = container.height - 60
    
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2
    
    setNoButtonPosition({ x: newX, y: newY })
  }

  if (accepted) {
    return <AcceptanceForm />
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-background"
    >
      <FloatingHearts />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      {/* Main content */}
      <div className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Header */}
        <div className="mb-6 animate-bounce-slow">
          <svg
            className="w-16 h-16 md:w-24 md:h-24 mx-auto text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl text-muted-foreground font-sans mb-2 tracking-wide">
          Dear
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-4 tracking-tight">
          Kushu
        </h1>
        <p className="text-sm text-muted-foreground font-sans mb-8">
          (Khushi Arora)
        </p>

        {/* Main Question */}
        <div className={`relative mb-12 ${showPulse ? "animate-pulse" : ""}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Will You Be My
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary mt-2">
            Valentine?
          </h2>
        </div>

        {/* Love message */}
        <p className="text-muted-foreground font-sans text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed">
          {"Every moment with you feels like a beautiful dream. You make my heart skip a beat, and I can't imagine my life without you."}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          <Button
            onClick={() => setAccepted(true)}
            className="px-12 py-6 text-xl font-sans font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {"Yes! "}
            <svg className="w-6 h-6 ml-2 inline" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </Button>
          
          <Button
            variant="outline"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="px-10 py-6 text-lg font-sans border-2 border-primary/30 text-primary hover:border-primary/50 rounded-full transition-all duration-300 bg-transparent"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {"No"}
          </Button>
        </div>

        {/* Hint text */}
        <p className="text-xs text-muted-foreground/60 mt-8 font-sans italic">
          {"(Hint: There's only one right answer here...)"}
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-primary/40 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
