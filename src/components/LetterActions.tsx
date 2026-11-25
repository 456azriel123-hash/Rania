import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Maximize2, Minimize2, Music, Pause, Printer } from 'lucide-react';
import { formatLetterPlainText } from '../letter/letterContent';

interface LetterActionsProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export function LetterActions({ isPlaying, onToggleMusic }: LetterActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', syncFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyLetter = async () => {
    const text = formatLetterPlainText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  const buttonClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium tracking-wide text-[#F3E6CE] bg-[#2D080D]/85 border border-[#EEDFC0]/25 rounded-md hover:bg-[#490F17] hover:border-[#EEDFC0]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EEDFC0]/75 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer';

  return (
    <div
      role="toolbar"
      aria-label="Aksi surat"
      className="no-print mt-6 flex flex-wrap items-center justify-center gap-3"
    >
      <button
        type="button"
        onClick={onToggleMusic}
        aria-pressed={isPlaying}
        className={buttonClass}
      >
        {isPlaying ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Music className="w-4 h-4" aria-hidden="true" />}
        <span>{isPlaying ? 'Jeda Musik' : 'Putar Musik'}</span>
      </button>

      <button
        type="button"
        onClick={handleCopyLetter}
        className={buttonClass}
      >
        {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        <span>{copied ? 'Tersalin' : 'Salin Surat'}</span>
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className={buttonClass}
      >
        <Printer className="w-4 h-4" aria-hidden="true" />
        <span>Cetak / Simpan</span>
      </button>

      <button
        type="button"
        onClick={handleToggleFullscreen}
        aria-pressed={isFullscreen}
        className={buttonClass}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Maximize2 className="w-4 h-4" aria-hidden="true" />
        )}
        <span>{isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}</span>
      </button>
    </div>
  );
}
