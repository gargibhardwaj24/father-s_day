# Father's Day 🎉

An animated Father's Day greeting card built with **React + Vite**.

On load it shows a popup — *"Happy Father's Day Papa ❤️"* — with a **Thank you** button.
Dismissing it bursts hearts across the screen. The main card cycles loving messages.

## Run it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Build

```bash
npm run build
npm run preview
```

## Files

- `index.html` — Vite entry, mounts `#root`
- `src/main.jsx` — React entry point
- `src/App.jsx` — popup, greeting card, and hearts logic
- `src/index.css` — warm color-scheme styling and animations

## Customize

- Edit the `messages` array in `src/App.jsx` to change the greetings.
- Tweak the palette variables at the top of `src/index.css`
  (`--pearl-beige`, `--golden-apricot`, `--cotton-candy`, `--brown-red`, `--black-cherry`).
