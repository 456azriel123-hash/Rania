import { useEffect, useRef, useState } from 'react';
import { VintageLetterCard } from './components/VintageLetterCard';
import { LetterActions } from './components/LetterActions';
import { RedEnvelopeIntro } from './components/RedEnvelopeIntro';
import { MUSIC_TRACK_SRC } from './letter/audioConfig';

function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('autostart') === '1';
}

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(shouldSkipIntro);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    await startMusic();
  };

  return (
    <main className="vintage-desk-backdrop min-h-screen w-full py-6 px-3 sm:py-12 sm:px-6 flex flex-col items-center justify-center">
      <audio
        ref={audioRef}
        src={MUSIC_TRACK_SRC}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {!isOpened ? (
        <RedEnvelopeIntro
          onEnvelopeClick={() => {
            void startMusic();
          }}
          onOpenComplete={() => setIsOpened(true)}
        />
      ) : (
        <div className="w-full max-w-[660px]">
          <VintageLetterCard />
          <LetterActions isPlaying={isPlaying} onToggleMusic={() => void toggleMusic()} />
        </div>
      )}
    </main>
  );
}
