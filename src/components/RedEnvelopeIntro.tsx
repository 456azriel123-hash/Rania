import { useEffect, useRef, useState } from 'react';

interface RedEnvelopeIntroProps {
  onEnvelopeClick?: () => void;
  onOpenComplete: () => void;
}

export function RedEnvelopeIntro({ onEnvelopeClick, onOpenComplete }: RedEnvelopeIntroProps) {
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'leaving'>('sealed');
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      for (const id of timersRef.current) {
        window.clearTimeout(id);
      }
    };
  }, []);

  const handleOpen = () => {
    if (phase !== 'sealed') return;

    onEnvelopeClick?.();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onOpenComplete();
      return;
    }

    setPhase('opening');
    const t1 = window.setTimeout(() => {
      setPhase('leaving');
    }, 620);
    const t2 = window.setTimeout(() => {
      onOpenComplete();
    }, 1020);
    timersRef.current.push(t1, t2);
  };

  const isOpen = phase === 'opening' || phase === 'leaving';

  return (
    <section
      aria-label="Amplop surat"
      className={`envelope-wrapper w-full max-w-[520px] mx-auto px-3 flex flex-col items-center ${
        phase === 'leaving' ? 'is-leaving' : ''
      }`}
    >
      {/* Exact requested text above the red envelope */}
      <div className="text-center mb-7 sm:mb-9 select-none">
        <h1
          style={{ textWrap: 'balance' }}
          className="font-[var(--font-display)] text-[26px] sm:text-[34px] font-semibold italic leading-[1.2] text-[#F4E7CF] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
        >
          A Letter to My Beautiful Virtual Friend
        </h1>
        <p className="mt-2 font-[var(--font-display)] text-[20px] sm:text-[24px] italic text-[#E5C9A8] tracking-wide">
          From Dew
        </p>
      </div>

      {/* Interactive burgundy-red velvet envelope matching the collage palette */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Buka amplop surat A Letter to My Beautiful Virtual Friend From Dew"
        className="envelope-scene group relative w-full aspect-[1.48/1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EEDFC0]/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1c0507] rounded-md"
      >
        <div className="relative w-full h-full rounded-md shadow-[0_28px_70px_rgba(0,0,0,0.85)] transition-transform duration-200 ease-out group-hover:-translate-y-1">
          {/* Inner dark burgundy pocket background */}
          <div className="absolute inset-0 rounded-md bg-[#3D080F] border border-[#8E2434]/45 overflow-hidden" />

          {/* Cream parchment letter card peeking up as flap opens */}
          <div
            aria-hidden="true"
            className={`envelope-peek absolute inset-x-[6%] top-[10%] bottom-[14%] rounded-sm bg-[#EEDFC0] border border-[#D4BF97] shadow-md flex items-center justify-center ${
              isOpen ? 'is-open' : ''
            }`}
          >
            <div className="w-[82%] h-[74%] border border-[#5B0E1B]/20 flex items-center justify-center">
              <span className="font-[var(--font-display)] text-lg sm:text-xl italic text-[#5B0E1B]/80">
                Kaka Rania
              </span>
            </div>
          </div>

          {/* Front envelope lower & side folds (rich crimson/burgundy) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 520 350"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full rounded-md pointer-events-none"
          >
            <defs>
              <linearGradient id="envLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6D1220" />
                <stop offset="100%" stopColor="#4D0A14" />
              </linearGradient>
              <linearGradient id="envRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#67101E" />
                <stop offset="100%" stopColor="#490913" />
              </linearGradient>
              <linearGradient id="envBottomGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5B0D19" />
                <stop offset="100%" stopColor="#771626" />
              </linearGradient>
            </defs>

            {/* Left triangle fold */}
            <polygon points="0,0 272,188 0,350" fill="url(#envLeftGrad)" />
            {/* Right triangle fold */}
            <polygon points="520,0 248,188 520,350" fill="url(#envRightGrad)" />
            {/* Bottom center triangle fold */}
            <polygon
              points="0,350 260,152 520,350"
              fill="url(#envBottomGrad)"
              stroke="rgba(238, 223, 192, 0.22)"
              strokeWidth="1.2"
            />
            {/* Delicate stitched cream-gold trim inside bottom fold */}
            <polyline
              points="18,342 260,164 502,342"
              fill="none"
              stroke="rgba(238, 223, 192, 0.28)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Hinged Top Triangular Flap + Wax Seal */}
          <div
            aria-hidden="true"
            className={`envelope-flap absolute inset-x-0 top-0 h-[62%] pointer-events-none ${
              isOpen ? 'is-open z-0' : 'z-20'
            }`}
          >
            <svg
              viewBox="0 0 520 218"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
            >
              <defs>
                <linearGradient id="envTopFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#821829" />
                  <stop offset="100%" stopColor="#590D19" />
                </linearGradient>
              </defs>
              <polygon
                points="0,0 520,0 260,210"
                fill="url(#envTopFlap)"
                stroke="rgba(238, 223, 192, 0.26)"
                strokeWidth="1.2"
              />
              <polyline
                points="14,8 260,198 506,8"
                fill="none"
                stroke="rgba(238, 223, 192, 0.28)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Embossed deep-red wax seal on flap tip */}
            <div
              className={`absolute left-1/2 bottom-[2%] -translate-x-1/2 translate-y-1/4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#9C1C30] via-[#741120] to-[#460710] border-2 border-[#EEDFC0]/35 shadow-[0_6px_16px_rgba(0,0,0,0.55)] flex items-center justify-center transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#EEDFC0]/30 flex items-center justify-center">
                <span className="font-[var(--font-display)] text-lg sm:text-xl font-semibold italic text-[#F4E7CF]">
                  D
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </section>
  );
}
