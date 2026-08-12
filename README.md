# The Hidden Retreat — Combined Reference Edition

This version combines the strongest ideas from both uploaded website videos while keeping the same forest-retreat story and the consistent two-floor house assets.

## Reference A retained

- Minimal floating navigation
- White editorial sections with strong negative space
- Bright blue architectural chapters
- Small visual window → large/fullscreen reveal
- Asymmetric image grids
- Quiet metrics and feature sections
- Restrained typography and clean transitions

## Reference B added

- Continuous camera-style hero walkthrough
- Sequential full-screen image chapters driven by scroll
- Oversized kinetic typography over photography
- Bottom progress rail + TAKE / chapter HUD
- Object/lens-style centered reveal
- Split-image transition into the private suite
- Layered/exploded image composition for the interior chapter
- Dark cinematic section rhythm between light editorial chapters

## Final story flow

1. Tiny white portal
2. Continuous forest walkthrough — mystery → path → first glimpse → entrance → full house
3. White editorial property overview
4. Minimal metrics strip
5. Pinned blue architecture manifesto
6. Circular courtyard object reveal → split into private suite
7. Quiet feature grid
8. Layered/exploded interior rooms
9. Small image → fullscreen sunset reveal
10. Blue/night private-viewing close

## Stack

- Next.js App Router
- React + TypeScript
- GSAP / ScrollTrigger / @gsap/react
- Lenis smooth scrolling
- next/image

## Reusable components

- `CinematicWalkthroughHero`
- `ResidenceOverview`
- `MetricsStrip`
- `BlueManifesto`
- `CircularSplitReveal`
- `FeatureGrid`
- `LayeredInteriorStory`
- `InterludeReveal`
- `ClosingInvitation`
- `CompactAction`
- `SmoothScrollProvider`
- `ScrollProgress`

## Run

```bash
pnpm install
pnpm dev
```

or

```bash
npm install
npm run dev
```

## Asset consistency

The tower/high-rise generations remain intentionally excluded. Only the low-rise forest-retreat visual system is used throughout the active page.

## Validation

All `.ts` / `.tsx` source files were syntax-transpiled successfully. Package installation could not be completed in the build environment because the dependency download timed out, so run `pnpm install` or `npm install` locally before starting the app.
