# SETTLE — Buildings

## Building Categories

Buildings are **earned through production**, not given by cards. You gather resources, then spend them to construct.

---

## Extractors

Pull raw resources from the land. Must be placed on appropriate terrain.

| Building | Extracts | Required Terrain | Notes |
|----------|----------|------------------|-------|
| Mine | Ore | Mountains | Depletes over time |
| Lumber Camp | Wood | Forest | Can clear forest for other buildings |
| Farm | Food | Plains | Affected by weather hazards |
| Well | Water | Various (rivers best) | Can dry up in drought |
| Quarry | Stone | Rocky terrain | Steady but slow |

---

## Energy Buildings

Provide power for processors.

| Building | Fuel Source | Output Quality | Notes |
|----------|-------------|----------------|-------|
| Fire Pit | Grass, wood | Low-medium | Basic, common |
| Pellet Burner | Pellets | Medium-good | More efficient |
| Coal Furnace | Coal | High | Requires rare coal |
| Water Mill | River | Constant | Location locked, no fuel needed |

---

## Processors

Transform raw resources into refined goods. Require energy to operate.

| Building | Input | Output | Notes |
|----------|-------|--------|-------|
| Smelter | Ore + Energy | Metal | Core processor |
| Sawmill | Wood + Labor | Lumber | Uses worker time |
| Kitchen | Food + Water | Provisions | Keeps workers fed |
| Brickworks | Stone + Energy | Bricks | For construction |
| Pellet Press | Dry Grass | Pellets | Creates better fuel |

---

## Advanced Buildings

Create endgame resources. Require refined inputs.

| Building | Input | Output | Notes |
|----------|-------|--------|-------|
| Workshop | Metal + Lumber | Machinery | Required for advanced builds |
| Construction Yard | Bricks + Metal | Infrastructure | Victory progress |

---

## Housing

Workers need places to live. Housing quality affects who you can attract.

| Building | Capacity | Who it attracts | Notes |
|----------|----------|-----------------|-------|
| Basic Shelter | 3-5 workers | Laborers | Cheap, minimal comfort |
| Worker Quarters | 5-8 workers | Laborers, some Skilled | Better conditions |
| Skilled Housing | 4-6 workers | Skilled workers | Requires provisions |
| Specialist Quarters | 2-3 workers | Specialists | Expensive, high maintenance |

---

## Storage

Buffer resources between production stages.

| Building | Capacity | Notes |
|----------|----------|-------|
| Stockpile | Low | Basic, open air, some spoilage risk |
| Warehouse | Medium | Protected storage |
| Deep Cellar | High | Unlocked via blueprint, double capacity |

---

## Special Buildings

Unlocked through blueprints or milestones.

| Building | What it does | How to unlock |
|----------|--------------|---------------|
| Watchtower | See next 2 cards before flipping | Blueprint from territory milestone |
| Greenhouse | Grow food in any terrain | Blueprint from surviving Dry Spells |
| Wind Catcher | Energy without fuel | Blueprint from coast/plains expansion |
| Cloud Inventory | Push finished goods to empire | Core building, always available |

---

## Building Placement Rules

1. **Extractors** must be placed on matching terrain
2. **Processors** can be placed anywhere but need energy connection
3. **Housing** should be near work (affects worker happiness?)
4. **Storage** connects between production stages
5. **All buildings** can be damaged by hazards

---

## Building on the Factory Screen

On the React Flow canvas, buildings become **nodes** that you connect:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│    MINE     │─────▶│   SMELTER   │─────▶│   STORAGE   │
│  (ore out)  │      │ (metal out) │      │ (buffer)    │
└─────────────┘      └─────────────┘      └─────────────┘
                            ▲
                     ┌──────┴──────┐
                     │  FIRE PIT   │
                     │  (energy)   │
                     └─────────────┘
```

---

## Building Costs (Example Framework)

These are starting points — balance during development.

### Extractors
| Building | Cost |
|----------|------|
| Mine | 20 Wood, 10 Stone |
| Lumber Camp | 10 Wood, 5 Stone |
| Farm | 15 Wood, 10 Water |
| Well | 10 Stone, 5 Wood |
| Quarry | 15 Wood, 10 Metal |

### Processors
| Building | Cost |
|----------|------|
| Smelter | 30 Stone, 20 Wood |
| Sawmill | 25 Wood, 15 Stone |
| Kitchen | 20 Wood, 10 Stone, 10 Water |
| Brickworks | 25 Stone, 15 Wood |
| Pellet Press | 15 Wood, 10 Stone |

### Advanced
| Building | Cost |
|----------|------|
| Workshop | 40 Metal, 30 Lumber, 20 Bricks |
| Construction Yard | 50 Bricks, 40 Metal, 30 Lumber |

### Housing
| Building | Cost |
|----------|------|
| Basic Shelter | 15 Wood |
| Worker Quarters | 25 Wood, 15 Stone |
| Skilled Housing | 30 Lumber, 20 Bricks |
| Specialist Quarters | 40 Lumber, 30 Bricks, 20 Machinery |

---

## Hazard Damage

Buildings can be damaged by hazards:

| Hazard | Buildings Affected |
|--------|-------------------|
| Hard Frost | Farms, outdoor storage |
| The Long Rain | All buildings (flooding) |
| Brush Fire | Lumber camps, wood buildings |
| Tunnel Collapse | Mines |
| River Surge | Buildings near water |
| The Tremor | Random buildings |

**Damaged buildings** stop producing until repaired (costs resources).

---

## Upgrading Buildings

Some buildings can be upgraded with blueprints or milestones:

| Upgrade | Effect | How to unlock |
|---------|--------|---------------|
| Reinforced Framing | Less hazard damage | Construction milestone |
| Efficient Furnace | Half energy smelting | Energy production milestone |
| Deep Drill | Extract from depleted nodes | Mining milestone |
| Irrigation Lines | Farms ignore Dry Spell | Specialist worker gift |
