"use client"

import * as React from "react"

export function TypewriterWords({ text }: { text: string }) {
  const words = React.useMemo(() => text.trim().split(/\s+/), [text])

  return (
    <div className="leading-relaxed text-pretty text-sm md:text-base">
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block opacity-0 will-change-transform"
          style={{
            animation: "tw-word-in 190ms ease-out forwards",
            animationDelay: `${i * 25}ms`,
            marginRight: "0.375rem",
          }}
        >
          {w}
        </span>
      ))}

      <style jsx>{`
        @keyframes tw-word-in {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
