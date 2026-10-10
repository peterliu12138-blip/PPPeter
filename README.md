# PPPeter

Personal webpage — currently a full-screen hero landing page for **Mainframe®**, a creative agency.

Built with React, TypeScript, Vite and Tailwind CSS.

## Features

- Background video that scrubs forward/backward as the mouse moves horizontally
- Fixed navbar with an animated hamburger and full-screen mobile menu
- Typewriter intro from A.R.I.A. with a blinking cursor
- Action pills that fade in on load, including a copy-to-clipboard email button

## Development

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check and build for production
npm run preview    # serve the production build
```

## Structure

```
src/
  components/
    BackgroundVideo.tsx  # fixed, mouse-scrubbed background video
    Navbar.tsx           # logo, links, CTA, mobile menu
    Hero.tsx             # intro label, typewriter, action pills
  hooks/
    useTypewriter.ts     # character-by-character text reveal
  App.tsx
  index.css              # Tailwind import, font variables, blink keyframes
```
