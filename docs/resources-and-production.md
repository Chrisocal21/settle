# SETTLE — Resources & Production

## Resource Tiers

Resources flow from raw extraction through processing to advanced goods.

---

## Tier 1 — Raw Resources

Extracted directly from the map via extractor buildings.

| Resource | Source Terrain | Extractor Building |
|----------|----------------|-------------------|
| Ore | Mountains, mines | Mine |
| Wood | Forests | Lumber Camp |
| Food | Plains, farms, hunting | Farm |
| Water | Rivers, wells, coast | Well |
| Stone | Quarries, rocky terrain | Quarry |
| Dry Grass | Plains | Gathering (manual) |

---

## Tier 2 — Refined Resources

Processed from raw resources. Requires processor buildings + energy.

| Resource | Made from | Processor Building |
|----------|-----------|-------------------|
| Metal | Ore + Energy | Smelter |
| Lumber | Wood + Labor | Sawmill |
| Provisions | Food + Water | Kitchen |
| Bricks | Stone + Energy | Brickworks |
| Pellets | Dry Grass | Pellet Press |

---

## Tier 3 — Advanced Resources

The endgame goods. Required for advanced buildings, high trade value, victory progress.

| Resource | Made from | Building |
|----------|-----------|----------|
| Machinery | Metal + Lumber | Workshop |
| Infrastructure | Bricks + Metal | Construction Yard |

---

## Energy System

Energy is required for processing. Buildings only consume energy when actively producing — idle buildings use zero.

### Energy Sources (Tiered Quality)

| Source | How to get it | Burn quality |
|--------|---------------|--------------|
| Dry Grass | Gathered from plains | Low — burns fast, weak |
| Wood | Lumber camps in forest | Medium — decent, common |
| Grass Pellets | Processed dry grass | Medium-good — lasts longer |
| Wood + Pellet mix | Combine both | High — efficient, long burn |
| Coal | Mined from mountains (rare) | High — strong, slow burn |
| Water Power | River access, build a mill | Constant — no fuel needed but location locked |

### Energy Consumption Rules

| Building State | Energy Use |
|----------------|------------|
| Idle | Zero |
| Producing | Consumes fuel |
| Production complete | Stops burning |

**This creates decisions:**
- You don't waste fuel on idle buildings
- You can pause production to conserve energy
- Big production pushes need stockpiled fuel
- Running everything at once burns through reserves fast

---

## Production Chain Flow

```
[EXTRACT]              [PROCESS]              [ADVANCED]
    ↓                      ↓                      ↓
   Ore        →        Metal        →       Machinery
   Wood       →        Lumber       →           ↑
   Stone      →        Bricks       →     Infrastructure
   Food       →      Provisions     →   (keeps workers alive)
   Water      →           ↑
   Grass      →        Pellets      →        (fuel)
```

---

## The Factory Screen

On the Factory Builder screen, you create production lines by connecting nodes:

```
[Extractor Node] → [Processor Node] → [Storage Node] → [Cloud Inventory]
                                                              ↓
                                                    Your empire uses it
                                                              ↓
                                               Build, feed workers, expand
```

### Node Types for React Flow

| Node Type | Purpose |
|-----------|---------|
| Extractor | Pulls raw resources from map tile |
| Processor | Transforms inputs to outputs |
| Storage | Buffers resources |
| Cloud Inventory | Pushes finished goods to empire |
| Energy Source | Provides power to connected processors |

### Edge Types

| Edge Type | What it shows |
|-----------|---------------|
| Resource Flow | Animated flow showing resource type + rate |
| Energy Line | Power connection from source to processor |
| Blocked/Broken | Visually shows insufficient connections |

---

## Resource Depletion

**Nodes don't produce forever.** Extraction sites have a lifespan.

- Mines run dry
- Forests can be cleared
- Farms deplete soil over time
- Wells can dry up in drought

**This forces expansion.** You must keep revealing new territory to find fresh resources.

---

## Terrain Affects Output

Where a resource is found affects its quality:

| Terrain | Effect on Resources |
|---------|---------------------|
| Plains | Standard yield |
| Mountains | Rich ore, but hard to traverse |
| Forest | Good wood, requires clearing |
| Swamp | Impure yields, harder to extract |
| River | Water access, trade bonuses |
| Desert | Rare minerals, no food/water |
| Coast | Fishing, trade, flood risk |

---

## Resource Values (for Trading)

Every tradeable item has a visible value rating:

| Rarity | Example | Value Points |
|--------|---------|--------------|
| Common | Wood, stone, basic food | 1-2 |
| Uncommon | Metal, lumber, provisions | 3-5 |
| Rare | Machinery, advanced materials | 8-12 |
| Very Rare | Blueprints, specialist workers | 15-25 |
| Legendary | Unique tools, rare finds | 50+ |

**Market fluctuation:** Values shift based on the Course Card and in-game scarcity. Ore might be worth more in a game where mountains are rare.
