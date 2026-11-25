import { LETTER_BLOCKS } from '../letter/letterContent';

export function VintageLetterCard() {
  return (
    <article
      aria-label="Surat ucapan ulang tahun untuk Kaka Rania"
      className="letter-enter relative w-full max-w-[660px] mx-auto bg-[#EEDFC0] shadow-[0_28px_80px_rgba(0,0,0,0.82)] overflow-hidden"
    >
      {/* Seamless 3-part frame matching the exact vintage collage reference */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col pointer-events-none select-none"
      >
        <img
          src="/assets/frame/top-cap.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-auto block shrink-0"
        />

        <div className="flex-1 flex min-h-0">
          <div
            className="w-[20.11%] shrink-0 h-full"
            style={{
              backgroundImage: "url('/assets/frame/mid-left.png')",
              backgroundSize: '100% auto',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'top left',
            }}
          />
          <div className="flex-1 bg-[#EEDFC0] parchment-grain" />
          <div
            className="w-[19.57%] shrink-0 h-full"
            style={{
              backgroundImage: "url('/assets/frame/mid-right.png')",
              backgroundSize: '100% auto',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'top right',
            }}
          />
        </div>

        <img
          src="/assets/frame/bottom-cap.png"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-auto block shrink-0"
        />
      </div>

      {/* Verbatim letter body in natural document flow inside the lace frame */}
      <div
        data-testid="letter-content"
        className="relative z-10 px-[22%] sm:px-[22.5%] pt-[64%] pb-[39%]"
      >
        <div className="space-y-3.5 sm:space-y-4 text-[#2B1516] font-[var(--font-serif-body)] text-[13.5px] sm:text-[15.25px] leading-[1.7] sm:leading-[1.75]">
          {LETTER_BLOCKS.map((block) => {
            if (block.kind === 'greeting') {
              return (
                <h1
                  key={block.id}
                  style={{ textWrap: 'balance' }}
                  className="font-[var(--font-display)] text-[22px] sm:text-[29px] font-semibold italic leading-[1.25] text-[#5B0E1B] pb-1 border-b border-[#5B0E1B]/15"
                >
                  {block.lines[0]}
                </h1>
              );
            }

            if (block.kind === 'signature') {
              return (
                <p
                  key={block.id}
                  className="pt-2 font-[var(--font-display)] text-[22px] sm:text-[26px] font-semibold italic text-[#5B0E1B]"
                >
                  {block.lines[0]}
                </p>
              );
            }

            if (block.kind === 'stanza') {
              return (
                <p key={block.id} className="whitespace-pre-line">
                  {block.lines.join('\n')}
                </p>
              );
            }

            return <p key={block.id}>{block.lines[0]}</p>;
          })}
        </div>
      </div>
    </article>
  );
}
