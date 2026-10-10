# PPPeter

Personal webpage. It currently holds two pages:

- **Mainframe®** (`/`): a full-screen hero landing page for a creative agency, built with React, TypeScript, Vite and Tailwind CSS.
- **Frostbay** (`/frostbay/`): a WebGPU diorama of a cold harbour in a glass block on jelly, with a live water simulation, seals, a kayak and a humpback whale. It is one self-contained file, `public/frostbay/index.html`, and needs a browser with WebGPU (Safari 26+, Chrome/Edge 113+).

## Mainframe features

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

## Frostbay

- Height-field long-wave simulation (flux form, 200×140 grid, fixed 180 Hz substeps) that conserves volume and stays stable at every slider setting
- Press the sea for a soft hollow with a raised rim, drag to sweep it; drag a glass side to tilt the block on its jelly; pull the jelly edge; drag the kayak
- Raft seal that loses its balance, slips in, swims and hauls out; shore seal that basks, scratches and watches big waves; a humpback whose spine follows its own path
- Daylight, Snowfall and Aurora night modes, plus a blizzard; HDR with 4× MSAA, refraction, depth absorption, caustics, soft shadows and neutral tone mapping
- Open `public/frostbay/index.html` directly, or visit `/frostbay/` on the dev server or a deployed build

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
public/
  frostbay/index.html    # Frostbay, self-contained (copied as-is into the build)
```
