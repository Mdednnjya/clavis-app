"use client"

export function AuroraOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60" aria-hidden="true">
      <div className="absolute inset-0 blur-3xl">
        <div className="absolute inset-0 aurora-bg" />
      </div>

      <style jsx>{`
        .aurora-bg {
          background: radial-gradient(
              40% 35% at 20% 20%,
              oklch(0.72 0.19 40 / 0.5),
              transparent 60%
            ),
            radial-gradient(
              45% 40% at 80% 30%,
              oklch(0.67 0.14 230 / 0.45),
              transparent 60%
            ),
            radial-gradient(
              55% 45% at 50% 80%,
              oklch(0.63 0.21 320 / 0.4),
              transparent 60%
            );
          background-repeat: no-repeat;
          background-size: 140% 140%, 120% 120%, 160% 160%;
          animation: aurora-shift 8s ease-in-out infinite alternate;
          filter: saturate(1.1);
        }

        @keyframes aurora-shift {
          0% {
            background-position: 0% 0%, 100% 10%, 50% 90%;
            transform: translateY(0px) scale(1);
          }
          50% {
            background-position: 20% 10%, 80% 20%, 40% 80%;
            transform: translateY(-6px) scale(1.02);
          }
          100% {
            background-position: 40% 20%, 60% 30%, 30% 70%;
            transform: translateY(-12px) scale(1.04);
          }
        }
      `}</style>
    </div>
  )
}
