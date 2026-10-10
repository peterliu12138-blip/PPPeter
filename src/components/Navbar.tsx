import { useEffect, useState } from 'react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a href="#" className="flex items-center gap-3 text-white" aria-label="Mainframe home">
          <span
            className="text-[21px] tracking-tight sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="select-none text-[25px] sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        <div className="hidden text-[23px] text-white md:flex">
          {NAV_LINKS.map((link, index) => (
            <span key={link} className="flex">
              <a href="#" className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {index < NAV_LINKS.length - 1 && <span className="whitespace-pre">, </span>}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="flex cursor-pointer flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className="fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        inert={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={closeMenu}
            className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-60"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
