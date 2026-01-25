# SETTLE — Visual Design & Audio

## Visual Style

**Base aesthetic: Clean React Flow meets cozy illustration.**

| Element | How it looks |
|---------|--------------|
| Nodes/edges | Clean, functional, readable |
| Icons/buildings | Illustrated, warm, some personality |
| Overall vibe | Not cold and sterile, not cartoonish — somewhere in between |

---

## React Flow Foundation

The game board is built on React Flow. This defines the core visual language:

| Element | Style |
|---------|-------|
| Nodes | Rounded rectangles with icons |
| Edges | Smooth curves with animated flow |
| Canvas | Grid background (subtle) |
| Minimap | Corner overview for large boards |

---

## Color Palette

### Node Categories

| Category | Color | Hex suggestion |
|----------|-------|----------------|
| Extractors | Brown/Orange | #8B4513, #D2691E |
| Processors | Blue | #4682B4, #5F9EA0 |
| Housing/Civilian | Green | #2E8B57, #3CB371 |
| Advanced/Wonders | Gold | #DAA520, #FFD700 |
| Hazards/Damage | Red | #CD5C5C, #DC143C |
| Energy | Yellow/Amber | #FFA500, #FFB347 |
| Storage | Gray | #708090, #778899 |

### UI Colors

| Element | Color type |
|---------|------------|
| Background | Dark (primary), light (toggle) |
| Text | High contrast for readability |
| Borders | Subtle, not harsh |
| Highlights | Accent color for selection |

---

## Dark/Light Theme

Both themes available. Dark is primary.

### Dark Theme
| Element | Color |
|---------|-------|
| Background | Deep charcoal (#1a1a2e) |
| Cards | Slightly lighter (#16213e) |
| Text | Off-white (#e8e8e8) |
| Accents | Warm gold (#ffd700) |

### Light Theme
| Element | Color |
|---------|-------|
| Background | Warm cream (#f5f5dc) |
| Cards | White (#ffffff) |
| Text | Dark gray (#333333) |
| Accents | Deep blue (#4a6fa5) |

---

## Purchasable Themes

Same game, totally different visual feel:

| Theme | Vibe | Visual style |
|-------|------|--------------|
| Default | Clean + cozy | Baseline |
| Dark Industrial | Gritty, steampunk | Metal textures, smoke, gears |
| Bright Pastoral | Soft, cheerful | Watercolor, Stardew-ish |
| Neon Future | Sci-fi | Glowing edges, holographic |
| Hand-Drawn Sketch | Notebook | Pencil lines, paper texture |

---

## Animation Guidelines

### Resource Flow (Edges)

| Animation | What it shows |
|-----------|---------------|
| Moving dots/particles | Resources flowing between nodes |
| Color matches resource | Iron = rust red, wood = brown |
| Speed indicates rate | Faster = more production |
| Pulse on delivery | Brief glow when resources arrive |

### Node States

| State | Visual indicator |
|-------|------------------|
| Idle | Dim, static |
| Producing | Active, subtle animation |
| Damaged | Red tint, cracks |
| Upgraded | Glow, enhanced icon |

### Card Flips

| Animation | Effect |
|-----------|--------|
| Flip | Smooth 3D rotation |
| Reveal | Brief glow based on card type |
| Hazard reveal | Red flash, shake |
| Win reveal | Gold burst |

---

## Icon Design

### Building Icons

| Requirement | Why |
|-------------|-----|
| Clear silhouette | Readable at small sizes |
| Consistent style | All feel part of same world |
| Color-coded category | Quick visual parsing |
| Simple detail | Not cluttered |

### Resource Icons

| Resource | Icon suggestion |
|----------|-----------------|
| Ore | Rock chunks |
| Wood | Logs/lumber stack |
| Food | Wheat/grain |
| Water | Droplet/waves |
| Stone | Cut blocks |
| Metal | Ingot bars |
| Energy | Flame/lightning |

---

## Card Design

See **10-CARD-ART-PROMPTS.md** for detailed card visual specifications.

General card design:

| Element | Design |
|---------|--------|
| Border | Deck-specific color/style |
| Illustration | Center, 60% of card |
| Title | Bottom, clear font |
| Stats/effect | Below title, smaller |
| Rarity indicator | Corner gem or border glow |

---

## UI Layout

### Map Screen (3-Panel)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Turn Info | Player | Resources Summary | Settings  │
├───────────────┬─────────────────────────────┬───────────────┤
│               │                             │               │
│   LEFT PANEL  │       MAIN MAP              │  RIGHT PANEL  │
│               │                             │               │
│  • Card Decks │   Territory View            │  • Selected   │
│  • Draw Piles │   (Your Empire)             │    Tile Info  │
│  • Hand       │                             │  • Worker     │
│  • Discard    │   Terrain, buildings,       │    Panel      │
│               │   other players             │  • Actions    │
│               │                             │               │
├───────────────┴─────────────────────────────┴───────────────┤
│  FOOTER: Action Log | Trade | Chat | Help                   │
└─────────────────────────────────────────────────────────────┘
```

### Factory Screen (React Flow)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Resources | Energy | Production Stats | Settings   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    REACT FLOW CANVAS                        │
│                                                             │
│    ┌───┐      ┌───┐      ┌───┐                             │
│    │ A │─────▶│ B │─────▶│ C │                             │
│    └───┘      └───┘      └───┘                             │
│       │          │                                          │
│       ▼          ▼                                          │
│    ┌───┐      ┌───┐                                        │
│    │ D │─────▶│ E │                                        │
│    └───┘      └───┘                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Building Palette | Connections | Minimap           │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen Toggle

| Element | Design |
|---------|--------|
| Toggle button | Clear, always visible |
| Position | Corner or header |
| Animation | Smooth transition between screens |
| Indicator | Show which screen you're on |

---

## Responsive Design

| Platform | Support |
|----------|---------|
| Desktop | Primary experience |
| Tablet | Supported, touch-friendly |
| Mobile | Limited — desktop recommended |

---

## Audio Design

### Music

| Element | Style |
|---------|-------|
| Vibe | Lo-fi, calm, ambient |
| Tempo | Slow, relaxed |
| Mood | Peaceful even when things are tense |
| Loop | Seamless background |

### Sound Effects

| Event | Sound type |
|-------|------------|
| Card flip | Satisfying paper/swoosh |
| Resource ding | Gentle chime on collection |
| Building placed | Solid click/thunk |
| Hazard hit | Subtle alarm, not jarring |
| Worker dialogue | Text appears (no voice) |
| Trade complete | Confirmation tone |
| Turn notification | Gentle alert |

### Audio Settings

| Option | What it controls |
|--------|------------------|
| Music volume | Background music level |
| SFX volume | Sound effects level |
| Notifications | Turn alerts, trade requests |
| Mute all | Quick silence |

---

## Accessibility Considerations

| Feature | Purpose |
|---------|---------|
| Color blind modes | Alternative color schemes |
| High contrast option | For visibility |
| Text size options | Readability |
| Reduced motion | For motion sensitivity |
| Screen reader support | For visually impaired (future) |
