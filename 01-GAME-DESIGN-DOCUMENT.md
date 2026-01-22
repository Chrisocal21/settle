# Settle: Game Design Document

> A card-based civilization builder. From hands to empires.

---

## 1. Concept Overview

**Title:** Settle (working title)

**Tagline:** "Build civilization one card at a time"

**Genre:** Card-based resource management / civilization builder

**Platform:** Browser (PWA), mobile-first, offline-capable

**Target Audience:** Casual to mid-core players, ages 13+, including people who "don't play games"

**Session Length:** 5-20 minutes per game

**Monetization:** Free (potential future: cosmetics, ad-supported, or premium unlock)

---

## 2. Core Fantasy

You start with nothing but your hands and an unexplored landscape. Through gathering, building, and planning, you transform raw wilderness into a thriving civilization. Every card you place is a decision. Every connection you make builds momentum. Watch your creation come alive.

---

## 3. Core Loop

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   DISCOVER → GATHER → BUILD → CONNECT → GROW       │
│       ↑                                   │        │
│       └───────────────────────────────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 1: Discovery (Manual)
- Tap/click to reveal tiles on the grid
- Find natural resources: water, forests, ore deposits, fertile land
- Limited actions per turn forces strategic exploration

### Phase 2: Gathering (Manual → Automated)
- Initially: tap resources to gather them manually
- Unlock cards that automate gathering
- Transition from clicking to managing

### Phase 3: Building (Card Placement)
- Draw cards from deck
- Place cards on grid tiles
- Each card has input/output requirements

### Phase 4: Connecting (Systems)
- Link outputs to inputs (visual pipes/lines)
- Power flows from generators to machines
- Water flows from sources to farms
- Resources flow from extractors to processors

### Phase 5: Growing (Victory)
- Build population (houses, food, water)
- Unlock civilization milestones
- Achieve victory conditions based on game mode

---

## 4. Game Modes

### 🏕️ Survival Mode
**Goal:** Keep your population alive as long as possible

**Mechanics:**
- Resources deplete over time
- Seasons change (winter = less food)
- Random events (drought, storms, disease)
- Population has needs: food, water, shelter, power
- Fail state: population reaches zero

**Progression:**
- Endless with escalating difficulty
- High score leaderboard
- Unlocks based on survival milestones

**Appeal:** Challenge seekers, roguelike fans, "one more run" addiction

---

### 🏗️ Builder Mode (Sandbox)
**Goal:** Create your ideal civilization

**Mechanics:**
- No fail state
- Slow passive resource income OR unlimited resources toggle
- All cards available (or gradual unlock)
- Focus on aesthetics and efficiency
- Save/load settlements

**Progression:**
- Unlock cosmetic variants
- Achievement-based unlocks
- Share settlements (export codes)

**Appeal:** Casual players, creative types, relaxation seekers

---

### 🧩 Puzzle Mode
**Goal:** Solve production challenges with limited resources

**Mechanics:**
- Pre-set grid layouts
- Limited card selection
- Specific output targets ("Produce 50 steel")
- Constraints ("No coal allowed", "Only 8 cards")
- Star rating (1-3) based on efficiency

**Progression:**
- 50-100 handcrafted levels
- Grouped into chapters/worlds
- Stars unlock later chapters
- Daily challenge with shared seed

**Appeal:** Puzzle gamers, optimization nerds, bite-sized sessions

---

### 🏆 Campaign Mode
**Goal:** Guide your people through history

**Mechanics:**
- Narrative scenarios with story beats
- Branching choices with consequences
- Unlockable lore and world-building
- Boss challenges (survive the flood, defeat the rival tribe)
- Permanent unlocks carry forward

**Progression:**
- 5 acts, 5-7 scenarios each
- Estimated 10-15 hours of content
- New card types unlocked via story
- Multiple endings based on choices

**Appeal:** Story lovers, completionists, progression junkies

---

## 5. Card System

### Card Categories

| Category | Color | Function | Examples |
|----------|-------|----------|----------|
| **Nature** | Green | Starting resources, cannot be moved | River, Forest, Mountain, Fertile Land, Ore Vein |
| **Survival** | Yellow | Basic needs production | Well, Farm, Fishing Hut, Granary, Campfire |
| **Power** | Blue | Energy generation/distribution | Windmill, Waterwheel, Coal Plant, Solar Panel |
| **Extraction** | Orange | Raw resource gathering | Quarry, Mine, Lumber Mill, Oil Derrick |
| **Processing** | Red | Transform raw → refined | Smelter, Sawmill, Refinery, Workshop |
| **Civilization** | Purple | Population/victory | House, Market, School, Hospital, Monument |
| **Utility** | Gray | Logistics/boosters | Splitter, Storage, Road, Conveyor |

### Card Anatomy

```
┌────────────────────────┐
│ ⚡ SMELTER         [3] │  ← Name + Cost
├────────────────────────┤
│                        │
│      [ICON/ART]        │  ← Visual
│                        │
├────────────────────────┤
│ IN:  🪨 Iron Ore ×2    │  ← Inputs required
│      ⚡ Power ×1       │
├────────────────────────┤
│ OUT: 🔩 Iron Bar ×1    │  ← Outputs produced
├────────────────────────┤
│ "Transforms raw ore    │  ← Flavor text
│  into usable metal"    │
└────────────────────────┘
```

### Connection Rules

1. **Adjacency:** Cards can only connect to adjacent tiles (4-directional)
2. **Type Matching:** Output types must match input types
3. **Capacity:** Each connection has throughput limits
4. **Distance:** Some resources can flow further with roads/conveyors

### Resource Types

**Basic:**
- 💧 Water
- 🌾 Food
- 🪵 Wood
- 🪨 Stone
- ⛏️ Iron Ore
- ⚫ Coal

**Processed:**
- 🔩 Iron Bars
- 🧱 Bricks
- 📦 Lumber
- ⚡ Power

**Advanced:**
- ⚙️ Gears
- 🔧 Tools
- 🏗️ Construction Materials
- 💡 Advanced Power

---

## 6. Grid System

### Grid Specifications

- **Default Size:** 8×8 (adjustable per mode)
- **Tile States:** Hidden → Revealed → Occupied
- **Visual Style:** Isometric or top-down (TBD based on testing)

### Terrain Types

| Terrain | Resources | Buildable | Notes |
|---------|-----------|-----------|-------|
| Plains | None | Yes | Default buildable |
| Forest | Wood | After clearing | Must harvest first |
| Mountain | Stone, Ore | Edge only | Cannot build on top |
| Water | Fish, Water | Adjacent | Water source |
| Fertile | Food bonus | Yes | +50% farm output |

### Grid Visualization

```
┌───┬───┬───┬───┬───┬───┬───┬───┐
│🌲│🌲│💧│💧│🏔️│🏔️│ ? │ ? │
├───┼───┼───┼───┼───┼───┼───┼───┤
│🌲│🌾│💧│🏔️│🏔️│ ? │ ? │ ? │
├───┼───┼───┼───┼───┼───┼───┼───┤
│🌾│🏠│🚰│⛏️│ ? │ ? │ ? │ ? │
├───┼───┼───┼───┼───┼───┼───┼───┤
│🌾│🌾│🏭│⚡│ ? │ ? │ ? │ ? │
├───┼───┼───┼───┼───┼───┼───┼───┤
│ ? │ ? │ ? │ ? │ ? │ ? │ ? │ ? │
└───┴───┴───┴───┴───┴───┴───┴───┘

Legend:
🌲 Forest    💧 Water     🏔️ Mountain
🌾 Fertile   🏠 House     🚰 Well
⛏️ Mine      🏭 Smelter   ⚡ Windmill
?  Unexplored
```

---

## 7. Progression Systems

### Within a Game
1. **Tech Tiers:** Cards unlock as you build prerequisites
2. **Population Milestones:** More people = more workers = more buildings
3. **Resource Unlocks:** Discover new resource types as you explore

### Across Games (Meta-Progression)
1. **Card Collection:** Unlock new cards permanently
2. **Cosmetics:** Card skins, grid themes, effects
3. **Achievements:** Challenge-based unlocks
4. **Profile Level:** XP from playing any mode

### Unlock Tree (Simplified)

```
START
  │
  ├── Well, Farm, Campfire (Survival basics)
  │
  ├── Mine, Quarry, Lumber Mill (Extraction)
  │     │
  │     └── Smelter, Sawmill (Processing)
  │           │
  │           └── Workshop, Factory (Advanced)
  │
  ├── Windmill, Waterwheel (Basic power)
  │     │
  │     └── Coal Plant, Solar (Advanced power)
  │
  └── House, Market (Civilization)
        │
        └── School, Hospital, Monument (Victory)
```

---

## 8. Economy Balance

### Resource Flow Ratios

| Chain | Input | Output | Time |
|-------|-------|--------|------|
| Manual gather | 1 click | 1 resource | Instant |
| Basic farm | 1 water | 2 food | 5 sec |
| Mine | 1 power | 3 ore | 8 sec |
| Smelter | 2 ore + 1 power | 1 bar | 10 sec |
| House | 2 food + 1 water | +1 pop | Continuous |

### Population Needs (Survival Mode)

| Population | Food/sec | Water/sec | Power/sec |
|------------|----------|-----------|-----------|
| 1-10 | 0.5 | 0.3 | 0 |
| 11-25 | 1.5 | 1.0 | 0.5 |
| 26-50 | 4.0 | 2.5 | 2.0 |
| 51-100 | 10.0 | 6.0 | 5.0 |

---

## 9. Visual & Audio Direction

### Visual Style
- **Clean and readable:** Clear icons, distinct colors
- **Tactile:** Cards feel like physical objects
- **Alive:** Subtle animations (smoke, water flow, lights)
- **Not cutesy:** Professional, "boring" in a good way
- **Inspirations:** Mini Metro, Islanders, Townscaper

### Color Palette
- Background: Warm neutrals (#F5F0E6, #E8E0D0)
- Cards: Distinct category colors (see Card System)
- Accents: Gold for achievements, red for warnings
- Dark mode: Deep blues and grays

### Audio Direction
- **Music:** Ambient, generative, non-intrusive
- **SFX:** Satisfying placement sounds, subtle production hums
- **Feedback:** Clear audio cues for success/failure/milestones

---

## 10. Monetization (Future Consideration)

### Option A: Completely Free
- Open source, community-driven
- Portfolio piece / passion project

### Option B: Cosmetics Only
- Free core game
- Paid card skins, themes, effects
- No gameplay advantages

### Option C: Premium Unlock
- Free demo (Survival + 10 Puzzle levels)
- One-time purchase for full game ($3-5)

### Option D: Ad-Supported
- Free with optional ads for bonuses
- Premium removes ads

**Recommendation:** Start with Option A, consider B or C if traction builds.

---

## 11. Success Metrics

### Engagement
- Session length: Target 8-12 minutes average
- Sessions per day: Target 2-3 for engaged users
- Day 1 retention: Target 40%+
- Day 7 retention: Target 20%+

### Quality
- Tutorial completion: Target 80%+
- First win rate: Target 60%+ (Puzzle level 1)
- Mode distribution: Healthy split across all 4 modes

### Growth
- Organic sharing via settlement export
- Word of mouth in casual gaming communities
- Potential for content creators (puzzle solutions, speedruns)

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Too complex for casuals | Medium | High | Extensive tutorial, Builder mode as safe entry |
| Too simple for strategy fans | Medium | Medium | Puzzle mode depth, Survival difficulty |
| Scope creep | High | High | MVP first, strict phase gates |
| Performance on mobile | Medium | High | Simple graphics, efficient code |
| Balance issues | High | Medium | Analytics, player feedback loops |

---

## 13. MVP Definition

**Minimum Viable Product includes:**

1. ✅ 6×6 grid with basic terrain
2. ✅ Manual gathering mechanic
3. ✅ 10 core cards (2 per category)
4. ✅ Basic connection system
5. ✅ One complete game mode (Survival)
6. ✅ Win/lose conditions
7. ✅ Mobile-responsive UI
8. ✅ Offline functionality
9. ✅ Local high score

**NOT in MVP:**
- Campaign mode
- Full card collection
- Meta-progression
- Cloud save
- Multiplayer/sharing

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Status:** Draft - Ready for Development
