# Settle: External Resources & Tools

> Everything you need outside the codebase

---

## 1. Development Tools

### Required (Install These)

| Tool | Download | Purpose |
|------|----------|---------|
| **Node.js 20+** | [nodejs.org](https://nodejs.org/) | JavaScript runtime |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com/) | Code editor |
| **Git** | [git-scm.com](https://git-scm.com/) | Version control |
| **GitHub Desktop** (optional) | [desktop.github.com](https://desktop.github.com/) | Git GUI |

### VS Code Extensions

Install these from the Extensions panel (Ctrl+Shift+X):

| Extension | ID | Purpose |
|-----------|-----|---------|
| **GitHub Copilot** | `github.copilot` | AI code completion |
| **ESLint** | `dbaeumer.vscode-eslint` | Code linting |
| **Prettier** | `esbenp.prettier-vscode` | Code formatting |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Tailwind autocomplete |
| **ES7+ React Snippets** | `dsznajder.es7-react-js-snippets` | React snippets |
| **Auto Rename Tag** | `formulahendry.auto-rename-tag` | HTML/JSX tag renaming |
| **Error Lens** | `usernamehw.errorlens` | Inline error display |

### Browser Extensions

| Extension | Browser | Purpose |
|-----------|---------|---------|
| **React Developer Tools** | Chrome/Firefox | Component debugging |
| **Lighthouse** | Chrome (built-in) | Performance audits |

---

## 2. Hosting & Deployment

### Vercel (Recommended)

**URL:** [vercel.com](https://vercel.com/)

**Why Vercel:**
- Zero-config React/Vite deployment
- Free tier is generous
- Automatic HTTPS
- Preview deployments on PRs
- Edge CDN worldwide

**Setup:**
1. Sign up with GitHub
2. Import your repository
3. It auto-detects Vite
4. Deploy with one click

**Docs:** [vercel.com/docs](https://vercel.com/docs)

---

### Cloudflare Pages (Alternative)

**URL:** [pages.cloudflare.com](https://pages.cloudflare.com/)

**Why Cloudflare:**
- Fastest global CDN
- Unlimited bandwidth on free tier
- Web analytics included
- More control over caching

**Setup:**
1. Sign up at Cloudflare
2. Go to Pages → Create Project
3. Connect GitHub
4. Build command: `npm run build`
5. Output directory: `dist`

**Docs:** [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)

---

## 3. Design Resources

### Icons & Graphics

| Resource | URL | Notes |
|----------|-----|-------|
| **Lucide Icons** | [lucide.dev](https://lucide.dev/) | Clean SVG icons, React components |
| **Heroicons** | [heroicons.com](https://heroicons.com/) | By Tailwind team |
| **Game-icons.net** | [game-icons.net](https://game-icons.net/) | Free game icons (CC BY 3.0) |
| **OpenMoji** | [openmoji.org](https://openmoji.org/) | Open source emoji |
| **SVG Repo** | [svgrepo.com](https://www.svgrepo.com/) | Searchable SVG library |

### Fonts

| Font | URL | Style |
|------|-----|-------|
| **Inter** | [rsms.me/inter](https://rsms.me/inter/) | Clean UI font |
| **Space Grotesk** | [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) | Modern, techy |
| **Nunito** | [Google Fonts](https://fonts.google.com/specimen/Nunito) | Friendly, rounded |

### Color Palette Tools

| Tool | URL | Purpose |
|------|-----|---------|
| **Coolors** | [coolors.co](https://coolors.co/) | Palette generator |
| **Tailwind Colors** | [tailwindcss.com/docs/colors](https://tailwindcss.com/docs/customizing-colors) | Built-in palette |
| **Realtime Colors** | [realtimecolors.com](https://www.realtimecolors.com/) | Preview colors on UI |

### Suggested Palette

```css
/* Settle Color System */
--bg-primary: #F5F0E6;      /* Warm cream */
--bg-secondary: #E8E0D0;    /* Darker cream */
--text-primary: #2D3436;    /* Almost black */
--text-secondary: #636E72;  /* Gray */

/* Card Categories */
--nature: #27AE60;          /* Green */
--survival: #F39C12;        /* Yellow/Orange */
--power: #3498DB;           /* Blue */
--extraction: #E67E22;      /* Orange */
--processing: #E74C3C;      /* Red */
--civilization: #9B59B6;    /* Purple */
--utility: #95A5A6;         /* Gray */

/* Resources */
--water: #74B9FF;
--food: #FDCB6E;
--wood: #A0522D;
--stone: #636E72;
--power: #F9CA24;
--iron: #2C3E50;
```

---

## 4. Audio Resources

### Sound Effect Libraries (Free)

| Resource | URL | License |
|----------|-----|---------|
| **Freesound** | [freesound.org](https://freesound.org/) | CC licenses (check each) |
| **Kenney** | [kenney.nl/assets](https://kenney.nl/assets?q=audio) | CC0 (public domain) |
| **OpenGameArt** | [opengameart.org](https://opengameart.org/) | Various CC licenses |
| **Mixkit** | [mixkit.co/free-sound-effects](https://mixkit.co/free-sound-effects/) | Free license |

### Suggested Sounds

| Action | Sound Type | Search Terms |
|--------|------------|--------------|
| Card place | Soft thud | "card place", "soft drop" |
| Card pickup | Whoosh | "card pickup", "swoosh" |
| Resource gain | Coin/chime | "collect coin", "pickup" |
| Production tick | Mechanical | "factory", "machine hum" |
| Error/invalid | Buzz | "error buzz", "wrong" |
| Achievement | Fanfare | "achievement", "level up" |
| Game over | Sad tone | "game over", "lose" |

### Music (Ambient/Background)

| Resource | URL | Notes |
|----------|-----|-------|
| **Free Music Archive** | [freemusicarchive.org](https://freemusicarchive.org/) | Check licenses |
| **Incompetech** | [incompetech.com](https://incompetech.com/music/) | Kevin MacLeod, CC BY |
| **Epidemic Sound** | [epidemicsound.com](https://www.epidemicsound.com/) | Paid, high quality |

---

## 5. Learning Resources

### React & TypeScript

| Resource | URL | Level |
|----------|-----|-------|
| **React Docs** | [react.dev](https://react.dev/) | Official, excellent |
| **TypeScript Handbook** | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) | Official reference |
| **Total TypeScript** | [totaltypescript.com](https://www.totaltypescript.com/) | Advanced patterns |

### Game Development Concepts

| Resource | URL | Topics |
|----------|-----|--------|
| **Game Programming Patterns** | [gameprogrammingpatterns.com](https://gameprogrammingpatterns.com/) | Free book, essential |
| **Red Blob Games** | [redblobgames.com](https://www.redblobgames.com/) | Grids, pathfinding, procedural |
| **Game Dev Beginner** | [gamedevbeginner.com](https://gamedevbeginner.com/) | Unity focus, concepts transfer |

### Zustand (State Management)

| Resource | URL |
|----------|-----|
| **Zustand Docs** | [docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) |
| **Zustand GitHub** | [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand) |

### Tailwind CSS

| Resource | URL |
|----------|-----|
| **Tailwind Docs** | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **Tailwind UI** | [tailwindui.com](https://tailwindui.com/) | Paid components |
| **Headless UI** | [headlessui.com](https://headlessui.com/) | Free accessible components |

---

## 6. Inspiration & Reference

### Similar Games to Study

| Game | Platform | What to Learn |
|------|----------|---------------|
| **Factory Planner: First Sparks** | Steam | Direct inspiration, card-based factory |
| **Stacklands** | Steam | Card-based village builder |
| **Islanders** | Steam | Minimalist city builder |
| **Mini Metro** | All | Clean UI, simple mechanics |
| **Townscaper** | All | Satisfying building, no fail state |
| **Luck be a Landlord** | Steam | Roguelike + slot machine, addictive loop |
| **Slay the Spire** | All | Deckbuilding, progression |

### Design Inspiration

| Site | URL | Purpose |
|------|-----|---------|
| **Mobbin** | [mobbin.com](https://mobbin.com/) | Mobile app patterns |
| **Dribbble** | [dribbble.com](https://dribbble.com/search/game-ui) | Game UI designs |
| **Interface in Game** | [interfaceingame.com](https://interfaceingame.com/) | Game UI screenshots |

---

## 7. Testing & Quality

### Testing Libraries

| Library | Install | Purpose |
|---------|---------|---------|
| **Vitest** | `npm i -D vitest` | Unit testing |
| **Testing Library** | `npm i -D @testing-library/react` | Component testing |
| **Playwright** | `npm i -D @playwright/test` | E2E testing |

### Performance Tools

| Tool | Access | Purpose |
|------|--------|---------|
| **Lighthouse** | Chrome DevTools | Overall audit |
| **WebPageTest** | [webpagetest.org](https://www.webpagetest.org/) | Detailed loading analysis |
| **Bundle Analyzer** | `npm i -D rollup-plugin-visualizer` | Bundle size |

### PWA Testing

| Tool | Access | Purpose |
|------|--------|---------|
| **PWA Builder** | [pwabuilder.com](https://www.pwabuilder.com/) | PWA audit |
| **Lighthouse PWA** | Chrome DevTools | PWA checklist |

---

## 8. Community & Support

### Ask Questions

| Platform | URL | Best For |
|----------|-----|----------|
| **Stack Overflow** | [stackoverflow.com](https://stackoverflow.com/) | Specific code questions |
| **Reddit r/webdev** | [reddit.com/r/webdev](https://www.reddit.com/r/webdev/) | General web dev |
| **Reddit r/reactjs** | [reddit.com/r/reactjs](https://www.reddit.com/r/reactjs/) | React specific |
| **Discord (Reactiflux)** | [discord.gg/reactiflux](https://discord.gg/reactiflux) | Real-time help |

### Show Your Work

| Platform | URL | Audience |
|----------|-----|----------|
| **Reddit r/IndieGaming** | [reddit.com/r/IndieGaming](https://www.reddit.com/r/IndieGaming/) | Game players |
| **Reddit r/WebGames** | [reddit.com/r/WebGames](https://www.reddit.com/r/WebGames/) | Browser game fans |
| **Hacker News** | [news.ycombinator.com](https://news.ycombinator.com/) | Tech audience |
| **Product Hunt** | [producthunt.com](https://www.producthunt.com/) | Launch platform |
| **itch.io** | [itch.io](https://itch.io/) | Indie game platform |

---

## 9. Legal & Licensing

### Your Code

**Recommended:** MIT License (permissive, simple)

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

### Using Others' Assets

| License | Can Use? | Attribution? | Commercial? |
|---------|----------|--------------|-------------|
| **CC0** | ✅ Yes | ❌ No | ✅ Yes |
| **CC BY** | ✅ Yes | ✅ Required | ✅ Yes |
| **CC BY-SA** | ✅ Yes | ✅ Required | ✅ Yes (share alike) |
| **CC BY-NC** | ⚠️ Non-commercial only | ✅ Required | ❌ No |
| **MIT** | ✅ Yes | ✅ Include license | ✅ Yes |

**Always check** the specific license of any asset you use.

---

## 10. Quick Reference Commands

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

### Git

```bash
# Create feature branch
git checkout -b feature/card-system

# Stage and commit
git add .
git commit -m "Add card component"

# Push to GitHub
git push origin feature/card-system

# Merge to main (after PR)
git checkout main
git pull
git merge feature/card-system
```

### Deployment

```bash
# Vercel (automatic on push to main)
git push origin main

# Manual Vercel deploy
vercel --prod

# Cloudflare Pages (automatic on push)
git push origin main
```

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Status:** Reference Document
