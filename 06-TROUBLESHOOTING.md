# Settle: Troubleshooting Guide

> Common issues and how to fix them

---

## Table of Contents

- [Setup & Installation Issues](#setup--installation-issues)
- [Development Server Problems](#development-server-problems)
- [TypeScript Errors](#typescript-errors)
- [Styling & Tailwind Issues](#styling--tailwind-issues)
- [State Management Problems](#state-management-problems)
- [Mobile & Touch Issues](#mobile--touch-issues)
- [Performance Problems](#performance-problems)
- [Build & Deployment Errors](#build--deployment-errors)
- [Debug Tools & Techniques](#debug-tools--techniques)

---

## Setup & Installation Issues

### "npm install" fails or hangs

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Use `--legacy-peer-deps` flag:
   ```bash
   npm install --legacy-peer-deps
   ```

4. Verify Node version (must be 20+):
   ```bash
   node --version
   ```

---

### Tailwind not working after setup

**Symptoms:**
- No styling appears
- Tailwind classes don't work
- Plain HTML rendering

**Checklist:**
1. ✅ `tailwind.config.js` has correct `content` paths:
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ]
   ```

2. ✅ `src/index.css` imports Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. ✅ `index.css` is imported in `main.tsx`:
   ```typescript
   import './index.css'
   ```

4. ✅ Restart dev server after config changes

5. ✅ Check browser console for CSS load errors

---

### VS Code not recognizing TypeScript types

**Symptoms:**
- Red squiggles everywhere
- "Cannot find module" errors
- Autocomplete not working

**Solutions:**
1. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

2. Ensure you're in the project root:
   ```bash
   pwd  # Should show .../settle
   ```

3. Check `tsconfig.json` exists and is valid

4. Install type definitions:
   ```bash
   npm install -D @types/node @types/react @types/react-dom
   ```

5. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## Development Server Problems

### Port 5173 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5173
```

**Solutions:**

**Option 1 - Kill the process (Windows):**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

**Option 2 - Use different port:**
```bash
npm run dev -- --port 3000
```

**Option 3 - Update package.json:**
```json
"scripts": {
  "dev": "vite --port 3000"
}
```

---

### Hot reload not working

**Symptoms:**
- Changes don't appear without manual refresh
- Must reload browser after every edit

**Solutions:**
1. Check file is saved (look for dot in tab)

2. Verify file is inside `src/` folder

3. Clear browser cache (Ctrl+Shift+Delete)

4. Check Vite output for errors:
   ```
   [vite] hmr update /src/App.tsx
   ```

5. Restart dev server

6. Check if browser extensions are interfering (try incognito)

---

### "Cannot find module '@/...' " errors

**Symptoms:**
```typescript
Cannot find module '@/components/Grid' or its corresponding type declarations
```

**Solution:**
The `@` alias needs configuration in both files:

**vite.config.ts:**
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ... rest of config
});
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Then restart dev server.

---

## TypeScript Errors

### "Type 'X' is not assignable to type 'Y'"

**Common in Zustand stores:**
```typescript
// ❌ Wrong - TypeScript can't infer
const [grid, setGrid] = useState([])

// ✅ Correct - Explicit type
const [grid, setGrid] = useState<Tile[][]>([])
```

**Common in event handlers:**
```typescript
// ❌ Wrong
const handleClick = (e) => { ... }

// ✅ Correct
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

---

### "Property 'X' does not exist on type 'Y'"

**Usually means:**
1. Interface is incomplete
2. Accessing optional property without check
3. Type inference failed

**Solution:**
```typescript
// Add optional chaining
tile.card?.definitionId

// Or type guard
if (tile.card) {
  tile.card.definitionId
}

// Or update interface
interface Tile {
  card?: PlacedCard;  // Make sure this is defined
}
```

---

### "Argument of type '...' is not assignable to parameter of type 'never'"

**Common with empty arrays:**
```typescript
// ❌ Wrong - TS infers never[]
const tiles = [];
tiles.push(newTile); // Error!

// ✅ Correct - Explicit type
const tiles: Tile[] = [];
tiles.push(newTile); // Works!
```

---

## Styling & Tailwind Issues

### Tailwind classes not applying

**Debug steps:**
1. Inspect element in DevTools → Check if class exists
2. If class exists but no styles → Tailwind not loaded
3. If class doesn't exist → Purged by content config
4. If styles are crossed out → Specificity issue

**Common issues:**
```jsx
// ❌ Wrong - Dynamic classes get purged
className={`bg-${color}-500`}

// ✅ Correct - Use complete class names
className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}

// ✅ Or use safelist in tailwind.config.js
safelist: ['bg-red-500', 'bg-blue-500']
```

---

### Custom colors not working

**Make sure they're in theme.extend:**
```javascript
// tailwind.config.js
theme: {
  extend: {  // ← Important! 
    colors: {
      'cream': '#F5F0E6',
    },
  },
},
```

Then use:
```jsx
className="bg-cream"  // Not bg-cream-500
```

---

### Styles flash/flicker on load

**Cause:** CSS loading after HTML

**Solution:** Ensure CSS is in `<head>`:
```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="/src/index.css">
</head>
```

Or use inline critical CSS for PWA.

---

## State Management Problems

### Zustand state not updating in component

**Symptoms:**
- State changes in DevTools but component doesn't re-render

**Common mistake:**
```typescript
// ❌ Wrong - Mutating state directly
const grid = useGameStore(state => state.grid);
grid[0][0].state = 'revealed'; // No re-render!

// ✅ Correct - Use action
const revealTile = useGameStore(state => state.revealTile);
revealTile({ x: 0, y: 0 });
```

**Or if you must mutate, use immer:**
```typescript
set((state) => {
  const newGrid = state.grid.map(row => [...row]);
  newGrid[0][0].state = 'revealed';
  return { grid: newGrid };
});
```

---

### State resets on page refresh

**Solutions:**
1. Implement localStorage persistence:
   ```typescript
   // In store
   const savedState = localStorage.getItem('gameState');
   const initialState = savedState ? JSON.parse(savedState) : defaultState;
   
   // Subscribe to changes
   useGameStore.subscribe((state) => {
     localStorage.setItem('gameState', JSON.stringify(state));
   });
   ```

2. Debounce saves to avoid performance issues:
   ```typescript
   import { debounce } from 'lodash';
   
   const debouncedSave = debounce((state) => {
     localStorage.setItem('gameState', JSON.stringify(state));
   }, 1000);
   
   useGameStore.subscribe(debouncedSave);
   ```

---

### Infinite re-render loop

**Symptoms:**
```
Maximum update depth exceeded
```

**Common causes:**
```typescript
// ❌ Wrong - Creates new object every render
const tiles = useGameStore(state => ({ ...state.grid }));

// ✅ Correct - Direct reference
const tiles = useGameStore(state => state.grid);

// ❌ Wrong - useEffect with missing deps
useEffect(() => {
  updateState(someValue);
}); // Missing dependency array!

// ✅ Correct
useEffect(() => {
  updateState(someValue);
}, [someValue]);
```

---

## Mobile & Touch Issues

### Cards not dragging on mobile

**Symptoms:**
- Works on desktop
- Nothing happens on touch

**Solution - Add touch event handlers:**
```typescript
const Card = () => {
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    // Drag logic
  };
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}  // Add this
      onTouchMove={handleTouchMove}    // And this
      onTouchEnd={handleTouchEnd}      // And this
    >
      {/* Card content */}
    </div>
  );
};
```

---

### Touch events not firing

**Check these:**
1. ✅ `touch-action: none` in CSS:
   ```css
   .draggable {
     touch-action: none;
   }
   ```

2. ✅ No `user-select: none` blocking events:
   ```css
   /* In index.css */
   * {
     -webkit-user-select: none;
     user-select: none;
   }
   
   /* Allow on inputs */
   input, textarea {
     -webkit-user-select: auto;
     user-select: auto;
   }
   ```

3. ✅ Call `preventDefault()` on touch events:
   ```typescript
   const handleTouchStart = (e: React.TouchEvent) => {
     e.preventDefault(); // Prevents scrolling
     // ... rest of logic
   };
   ```

---

### Click delay on iOS

**Symptoms:**
- 300ms delay on tap

**Solution:**
```html
<!-- Add to index.html head -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

```css
/* Add to index.css */
* {
  touch-action: manipulation;
}
```

---

### Grid too small on mobile

**Solution - Use viewport units:**
```typescript
// Calculate tile size based on viewport
const tileSize = Math.min(
  (window.innerWidth - 32) / gridWidth,  // 32px padding
  (window.innerHeight - 200) / gridHeight  // 200px for UI
);
```

Or use CSS:
```css
.tile {
  width: min(14vw, 14vh, 64px);
  height: min(14vw, 14vh, 64px);
}
```

---

## Performance Problems

### Game running slow/laggy

**Debug steps:**
1. Open Chrome DevTools → Performance tab
2. Record while playing
3. Look for long tasks (>50ms)

**Common culprits:**

**1. Too many re-renders:**
```typescript
// ❌ Wrong - Re-renders on every state change
const state = useGameStore();

// ✅ Correct - Only subscribe to what you need
const resources = useGameStore(state => state.resources);
const population = useGameStore(state => state.population);
```

**2. Expensive calculations in render:**
```typescript
// ❌ Wrong
function Grid() {
  const production = calculateProduction(placedCards); // Every render!
  
  // ✅ Correct - Use useMemo
  const production = useMemo(
    () => calculateProduction(placedCards),
    [placedCards]
  );
}
```

**3. Not using keys in lists:**
```typescript
// ❌ Wrong
{tiles.map(tile => <Tile tile={tile} />)}

// ✅ Correct
{tiles.map(tile => <Tile key={`${tile.x}-${tile.y}`} tile={tile} />)}
```

---

### High memory usage

**Check:**
1. Memory leaks in useEffect:
   ```typescript
   useEffect(() => {
     const interval = setInterval(tick, 100);
     return () => clearInterval(interval); // ← Must clean up!
   }, []);
   ```

2. Large objects in localStorage:
   ```typescript
   // Check size
   const size = new Blob([localStorage.getItem('gameState')]).size;
   console.log('Storage size:', size / 1024, 'KB');
   
   // Clear if too large
   if (size > 1024 * 1024) { // 1MB
     localStorage.removeItem('gameState');
   }
   ```

---

### Animations stuttering

**Solutions:**
1. Use CSS transforms (GPU accelerated):
   ```css
   /* ❌ Avoid */
   .card {
     transition: left 0.3s, top 0.3s;
   }
   
   /* ✅ Use transform */
   .card {
     transition: transform 0.3s;
     transform: translate(var(--x), var(--y));
   }
   ```

2. Use `will-change` sparingly:
   ```css
   .dragging {
     will-change: transform;
   }
   ```

3. Reduce animation complexity on mobile:
   ```typescript
   const shouldAnimate = !isMobile || fpsAboveThreshold;
   ```

---

## Build & Deployment Errors

### "npm run build" fails

**Common errors:**

**1. TypeScript errors:**
```bash
# Build shows all TS errors
npm run build

# Fix them or temporarily:
# tsconfig.json
{
  "compilerOptions": {
    "noEmit": false  // Not recommended for production
  }
}
```

**2. Missing environment variables:**
```bash
# Create .env for local, .env.production for build
VITE_API_URL=https://api.example.com
```

**3. Import path issues:**
```typescript
// ❌ Wrong - Won't work in build
import Card from '../components/Card';

// ✅ Correct - Absolute imports
import Card from '@/components/game/Card';
```

---

### Build succeeds but app broken in production

**Common issues:**

**1. Assets not loading:**
```typescript
// ❌ Wrong
<img src="/assets/logo.png">

// ✅ Correct - Import or use public folder
import logo from '@/assets/logo.png';
<img src={logo}>

// Or put in public/
<img src="/logo.png">  // public/logo.png
```

**2. Router issues (if using React Router):**
```javascript
// vite.config.ts
export default defineConfig({
  base: '/',  // Or '/settle/' if subdirectory
});
```

**3. Service Worker caching old version:**
```typescript
// Clear cache in dev
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
  });
}
```

---

### Vercel deployment fails

**Check:**
1. ✅ Build command: `npm run build`
2. ✅ Output directory: `dist`
3. ✅ Node version in `package.json`:
   ```json
   "engines": {
     "node": ">=20.0.0"
   }
   ```

4. ✅ All dependencies in `package.json` (not just devDependencies)

5. ✅ No `console.log` output blocking build:
   ```bash
   # Check build logs in Vercel dashboard
   ```

---

## Debug Tools & Techniques

### React DevTools

**Install:** [Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

**Usage:**
1. Open DevTools → Components tab
2. Select component
3. See props, state, hooks
4. Edit values live
5. Trace re-renders with Profiler

---

### Zustand DevTools

**Setup:**
```typescript
import { devtools } from 'zustand/middleware';

export const useGameStore = create<GameState>()(
  devtools(
    (set, get) => ({
      // ... state
    }),
    { name: 'GameStore' }
  )
);
```

**Usage:**
- Open Redux DevTools extension
- See all state changes
- Time-travel debug

---

### Console debugging helpers

```typescript
// Add to gameStore.ts for debugging
if (import.meta.env.DEV) {
  (window as any).gameStore = useGameStore;
  
  // Now in console:
  // gameStore.getState()
  // gameStore.setState({ population: 100 })
}
```

---

### Network debugging (PWA/offline)

**Chrome DevTools:**
1. Application tab → Service Workers
2. Check "Offline" to simulate
3. "Update on reload" during dev
4. "Unregister" to reset

**Check what's cached:**
1. Application → Cache Storage
2. Expand cache entries
3. Right-click → Delete to clear

---

### Performance monitoring

**Add to your app:**
```typescript
// src/utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const duration = performance.now() - start;
  
  if (duration > 16) { // > 1 frame at 60fps
    console.warn(`${name} took ${duration.toFixed(2)}ms`);
  }
};

// Use it:
measurePerformance('calculateProduction', () => {
  calculateProduction(state);
});
```

---

### Mobile debugging

**Android (Chrome):**
1. Connect phone via USB
2. Enable USB debugging on phone
3. Chrome → `chrome://inspect`
4. Click "Inspect" under your device

**iOS (Safari):**
1. Enable "Web Inspector" on iPhone (Settings → Safari → Advanced)
2. Connect via cable
3. Safari → Develop → [Your iPhone] → [Your page]

**Remote debugging alternative:**
- Use [Eruda](https://github.com/liriliri/eruda) - mobile console

```html
<!-- Add to index.html for dev -->
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

---

## Quick Reference: Error Messages

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| `Module not found` | Import path wrong | Check path, add to tsconfig paths |
| `Cannot read property of undefined` | Accessing data before loaded | Add optional chaining `?.` |
| `Maximum update depth` | Infinite loop | Check useEffect dependencies |
| `Hydration mismatch` | SSR issue (not applicable for Vite SPA) | N/A |
| `401 Unauthorized` | API issue | Check API keys, CORS |
| `Failed to fetch` | Network/CORS | Check network tab, server CORS |
| `out of memory` | Memory leak | Check for uncleared intervals/listeners |

---

## Still Stuck?

### Before asking for help, gather:

1. **Exact error message** (screenshot or copy-paste)
2. **What you tried** (list steps)
3. **Minimal reproduction** (isolate the problem)
4. **Environment info:**
   ```bash
   node --version
   npm --version
   # OS, browser
   ```

### Where to ask:
- [Stack Overflow](https://stackoverflow.com/) (React, TypeScript, Vite tags)
- [Reactiflux Discord](https://discord.gg/reactiflux)
- [Vite Discord](https://chat.vitejs.dev/)

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Purpose:** Quick problem solving reference
