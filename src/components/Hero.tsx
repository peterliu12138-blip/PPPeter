import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.ts';

const TYPEWRITER_TEXT = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const ACTIONS = ['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'];
const EMAIL = 'hello@mainframe.co';

const PILL_BASE =
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors duration-200';

const textStyle = {
  fontSize: 'clamp(18px, 4vw, 26px)',
  fontWeight: 400,
  color: '#fff',
} as const;

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <rect x="2" y="2" width="13" height="13" rx="2" />
    </svg>
  );
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [actionsVisible, setActionsVisible] = useState(false);

  // The actions fade in shortly after load, independent of the typewriter.
  useEffect(() => {
    const timeout = setTimeout(() => setActionsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <div
          className="pointer-events-none mb-5 select-none sm:mb-6"
          style={{ ...textStyle, lineHeight: 1.3, filter: 'blur(4px)' }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </div>

        <p className="mb-5 text-white sm:mb-6" style={{ ...textStyle, lineHeight: 1.35, minHeight: 54 }}>
          <span className="sr-only">{TYPEWRITER_TEXT}</span>
          <span aria-hidden="true">
            {displayed}
            {!done && (
              <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-blink bg-white align-middle" />
            )}
          </span>
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: actionsVisible ? 1 : 0,
            transform: actionsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${PILL_BASE} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={copyEmail}
            title="Copy email to clipboard"
            className={`${PILL_BASE} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
