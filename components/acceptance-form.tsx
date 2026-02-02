"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FloatingHearts } from "./floating-hearts"
import { submitProposalForm } from "@/app/actions"

export function AcceptanceForm() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "Khushi Arora",
    nickname: "Kushu",
    message: "",
    dateIdea: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate confetti
    const newConfetti = []
    const colors = ["#ec4899", "#f472b6", "#fb7185", "#fda4af", "#fecdd3"]
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setConfetti(newConfetti)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await submitProposalForm(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-background">
        <FloatingHearts />
        
        {/* Confetti */}
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              color: c.color,
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
        
        <div className={`relative z-10 text-center max-w-xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="mb-8">
            <div className="relative inline-block">
              <svg
                className="w-24 h-24 md:w-32 md:h-32 text-primary animate-heartbeat"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground text-4xl animate-pulse">
                {"✓"}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-4">
            {"You Said Yes!"}
          </h1>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-6">
            {"We're Official!"}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground font-sans mb-8 leading-relaxed max-w-md mx-auto">
            {"Thank you, Kushu! You've made me the happiest person in the world. I promise to make every day special for you."}
          </p>
          
          <div className="flex justify-center gap-2">
            {[...Array(7)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-primary animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground/60 mt-12 font-sans italic">
            {"Forever and always, your Valentine ❤️"}
          </p>
        </div>

        <style jsx>{`
          @keyframes heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            25% {
              transform: scale(1.1);
            }
            50% {
              transform: scale(1);
            }
            75% {
              transform: scale(1.15);
            }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }
          @keyframes confetti {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti 4s ease-out infinite;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-background">
      <FloatingHearts />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className={`relative z-10 w-full max-w-md mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 animate-bounce">
            <svg
              className="w-16 h-16 mx-auto text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-primary mb-2">
            {"Yay! You Said Yes!"}
          </h1>
          <p className="text-muted-foreground font-sans">
            {"Now let's make it official, Kushu!"}
          </p>
        </div>
        
        {/* Form Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-sans font-medium">
                Your Beautiful Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border-border bg-background font-sans"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-foreground font-sans font-medium">
                What Should I Call You?
              </Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                placeholder="Kushu, Baby, Love..."
                className="rounded-xl border-border bg-background font-sans"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground font-sans font-medium">
                {"A Sweet Message for Me?"}
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write something romantic..."
                className="rounded-xl border-border bg-background font-sans min-h-[100px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateIdea" className="text-foreground font-sans font-medium">
                {"Dream Date Idea?"}
              </Label>
              <Input
                id="dateIdea"
                value={formData.dateIdea}
                onChange={(e) => setFormData({ ...formData, dateIdea: e.target.value })}
                placeholder="Candlelight dinner, movie night..."
                className="rounded-xl border-border bg-background font-sans"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-sans font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending Love...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {"Seal It With Love"}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              )}
            </Button>
          </form>
        </div>
        
        {/* Bottom hearts */}
        <div className="flex justify-center gap-3 mt-8">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-primary/50 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}
