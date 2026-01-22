# Settle: Card Database

> Complete card definitions and balance data

---

## Card Categories Overview

| Category | Color | Purpose | Card Count |
|----------|-------|---------|------------|
| 🌲 **Nature** | Green | Starting resources, terrain | 5 |
| 🏕️ **Survival** | Yellow | Basic needs (food, water) | 8 |
| ⚡ **Power** | Blue | Energy generation | 6 |
| ⛏️ **Extraction** | Orange | Raw resource gathering | 6 |
| 🔨 **Processing** | Red | Transform raw → refined | 8 |
| 🏛️ **Civilization** | Purple | Population, victory | 8 |
| 🔧 **Utility** | Gray | Logistics, boosters | 6 |
| **Total** | | | **47 cards** |

---

## Resource Types

### Basic Resources

| Resource | Icon | Source | Used By |
|----------|------|--------|---------|
| Water | 💧 | Rivers, Wells | Farms, Population |
| Food | 🌾 | Farms, Fishing | Population |
| Wood | 🪵 | Forests, Lumber Mill | Buildings, Fuel |
| Stone | 🪨 | Mountains, Quarry | Buildings |
| Coal | ⚫ | Mines | Power plants, Smelting |

### Processed Resources

| Resource | Icon | Made From | Used By |
|----------|------|-----------|---------|
| Lumber | 📦 | Wood | Advanced buildings |
| Bricks | 🧱 | Stone + Heat | Advanced buildings |
| Iron Bars | 🔩 | Iron Ore + Heat | Tools, Machines |
| Tools | 🔧 | Iron Bars | Efficiency bonuses |

### Energy

| Resource | Icon | Source | Notes |
|----------|------|--------|-------|
| Power | ⚡ | Generators | Required by machines |
| Heat | 🔥 | Campfires, Furnaces | Processing, warmth |

---

## Tier System

Cards are unlocked progressively:

| Tier | Unlock Condition | Card Types |
|------|------------------|------------|
| **1** | Start | Basic survival, gathering |
| **2** | Population 10 | Basic automation |
| **3** | Population 25 | Processing, power |
| **4** | Population 50 | Advanced production |
| **5** | Population 100 | Monuments, endgame |

---

## Card Definitions

### 🌲 Nature Cards (Terrain)

These are placed during map generation, not by the player.

---

#### River
```yaml
id: river
name: River
category: nature
tier: 0
description: A flowing water source.
flavor: "Life follows water."

outputs:
  - resource: water
    amount: infinite
    rate: passive

placement:
  - type: map_generation

special:
  - Adjacent tiles can build Wells
  - Cannot be built upon
```

---

#### Forest
```yaml
id: forest
name: Forest
category: nature
tier: 0
description: Dense woodland full of timber.
flavor: "The lungs of the land."

outputs:
  - resource: wood
    amount: 50
    rate: manual_harvest

placement:
  - type: map_generation

special:
  - Can be manually harvested (depletes)
  - Can place Lumber Mill on top (clears forest)
```

---

#### Mountain
```yaml
id: mountain
name: Mountain
category: nature
tier: 0
description: Rocky peaks rich with ore.
flavor: "Ancient stone holds ancient secrets."

outputs:
  - resource: stone
    amount: infinite
    rate: passive
  - resource: iron_ore
    amount: infinite
    rate: passive

placement:
  - type: map_generation

special:
  - Cannot be built upon
  - Adjacent tiles can build Quarry, Mine
```

---

#### Fertile Land
```yaml
id: fertile_land
name: Fertile Land
category: nature
tier: 0
description: Rich soil perfect for farming.
flavor: "The earth provides."

placement:
  - type: map_generation

special:
  - Farms produce +50% food here
  - Visual: darker green grass
```

---

#### Ore Vein
```yaml
id: ore_vein
name: Ore Vein
category: nature
tier: 0
description: Exposed mineral deposits.
flavor: "Riches waiting to be claimed."

outputs:
  - resource: iron_ore
    amount: 100
    rate: manual_harvest

placement:
  - type: map_generation

special:
  - Can be manually harvested
  - Mine can be built adjacent
```

---

### 🏕️ Survival Cards

---

#### Well
```yaml
id: well
name: Well
category: survival
tier: 1
cost:
  - resource: wood
    amount: 5

inputs: none

outputs:
  - resource: water
    amount: 2
    rate: per_second

placement:
  - type: adjacent_to
    target: water_source  # River or lake

description: Draws water from underground.
flavor: "Dig deep, drink well."

unlocked: start
```

---

#### Farm
```yaml
id: farm
name: Farm
category: survival
tier: 1
cost:
  - resource: wood
    amount: 8

inputs:
  - resource: water
    amount: 1
    rate: per_second

outputs:
  - resource: food
    amount: 3
    rate: per_second

placement:
  - type: terrain
    target: [plains, fertile_land]

bonus:
  - condition: on_fertile_land
    effect: output +50%

description: Grows crops using water.
flavor: "From seed to sustenance."

unlocked: start
```

---

#### Fishing Hut
```yaml
id: fishing_hut
name: Fishing Hut
category: survival
tier: 1
cost:
  - resource: wood
    amount: 6

inputs: none

outputs:
  - resource: food
    amount: 2
    rate: per_second

placement:
  - type: adjacent_to
    target: water_source

description: Catches fish from nearby water.
flavor: "Patience feeds the village."

unlocked: start
```

---

#### Granary
```yaml
id: granary
name: Granary
category: survival
tier: 2
cost:
  - resource: wood
    amount: 15
  - resource: stone
    amount: 10

inputs: none
outputs: none

storage:
  - resource: food
    capacity: 100

description: Stores food for hard times.
flavor: "Save today, survive tomorrow."

unlocked: population >= 10
```

---

#### Campfire
```yaml
id: campfire
name: Campfire
category: survival
tier: 1
cost:
  - resource: wood
    amount: 3

inputs:
  - resource: wood
    amount: 0.5
    rate: per_second

outputs:
  - resource: heat
    amount: 1
    rate: per_second

radius: 2  # Affects tiles within radius

description: Provides warmth and light.
flavor: "Gather round the flame."

special:
  - Population in radius: +happiness
  - Required for early game survival (winter)

unlocked: start
```

---

#### Cistern
```yaml
id: cistern
name: Cistern
category: survival
tier: 2
cost:
  - resource: stone
    amount: 20

inputs: none
outputs: none

storage:
  - resource: water
    capacity: 50

description: Stores water reserves.
flavor: "A buffer against drought."

unlocked: population >= 10
```

---

#### Hunting Lodge
```yaml
id: hunting_lodge
name: Hunting Lodge
category: survival
tier: 2
cost:
  - resource: wood
    amount: 12
  - resource: stone
    amount: 5

inputs: none

outputs:
  - resource: food
    amount: 2
    rate: per_second

placement:
  - type: adjacent_to
    target: forest

description: Hunters bring back game.
flavor: "The forest provides... if you're quick."

unlocked: population >= 10
```

---

#### Herbalist
```yaml
id: herbalist
name: Herbalist
category: survival
tier: 3
cost:
  - resource: wood
    amount: 10
  - resource: stone
    amount: 8

inputs:
  - resource: water
    amount: 0.5
    rate: per_second

outputs:
  - resource: medicine
    amount: 1
    rate: per_second

placement:
  - type: adjacent_to
    target: forest

description: Gathers medicinal herbs.
flavor: "Nature's pharmacy."

special:
  - Reduces disease impact in Survival mode

unlocked: population >= 25
```

---

### ⚡ Power Cards

---

#### Windmill
```yaml
id: windmill
name: Windmill
category: power
tier: 2
cost:
  - resource: wood
    amount: 20
  - resource: stone
    amount: 10

inputs: none

outputs:
  - resource: power
    amount: 2
    rate: per_second

placement:
  - type: terrain
    target: [plains, hills]
  - type: not_adjacent_to
    target: mountain  # Blocks wind

description: Harnesses wind for power.
flavor: "Let the wind do the work."

special:
  - No fuel required
  - Output varies (0.5-2) based on "wind" (random factor)

unlocked: population >= 10
```

---

#### Waterwheel
```yaml
id: waterwheel
name: Waterwheel
category: power
tier: 2
cost:
  - resource: wood
    amount: 25
  - resource: stone
    amount: 15

inputs: none

outputs:
  - resource: power
    amount: 3
    rate: per_second

placement:
  - type: adjacent_to
    target: river

description: River current spins the wheel.
flavor: "Endless flow, endless power."

special:
  - Consistent output (unlike windmill)
  - Blocks one water tile for Wells

unlocked: population >= 10
```

---

#### Coal Plant
```yaml
id: coal_plant
name: Coal Plant
category: power
tier: 3
cost:
  - resource: stone
    amount: 40
  - resource: iron_bars
    amount: 10

inputs:
  - resource: coal
    amount: 1
    rate: per_second

outputs:
  - resource: power
    amount: 8
    rate: per_second

description: Burns coal for massive power.
flavor: "Progress has a price."

special:
  - High output but requires fuel
  - Reduces happiness in radius: 2

unlocked: population >= 25
```

---

#### Solar Panel
```yaml
id: solar_panel
name: Solar Panel
category: power
tier: 4
cost:
  - resource: iron_bars
    amount: 20
  - resource: tools
    amount: 5

inputs: none

outputs:
  - resource: power
    amount: 4
    rate: per_second

description: Captures sunlight.
flavor: "Clean and silent."

special:
  - Output: 4 during day, 0 at night (if day/night cycle enabled)
  - No pollution

unlocked: population >= 50
```

---

#### Generator
```yaml
id: generator
name: Generator
category: power
tier: 3
cost:
  - resource: iron_bars
    amount: 15
  - resource: stone
    amount: 20

inputs:
  - resource: wood
    amount: 2
    rate: per_second

outputs:
  - resource: power
    amount: 5
    rate: per_second

description: Burns wood for power.
flavor: "Smoke rises, machines hum."

unlocked: population >= 25
```

---

#### Power Line
```yaml
id: power_line
name: Power Line
category: power
tier: 2
cost:
  - resource: wood
    amount: 3
  - resource: iron_bars
    amount: 1

inputs:
  - resource: power
    amount: pass_through
    
outputs:
  - resource: power
    amount: pass_through

description: Extends power network.
flavor: "Connecting the grid."

special:
  - Passes power to non-adjacent buildings
  - Small power loss (5%) per line

unlocked: population >= 10
```

---

### ⛏️ Extraction Cards

---

#### Lumber Mill
```yaml
id: lumber_mill
name: Lumber Mill
category: extraction
tier: 1
cost:
  - resource: stone
    amount: 10

inputs: none

outputs:
  - resource: wood
    amount: 2
    rate: per_second

placement:
  - type: on_terrain
    target: forest  # Replaces forest

description: Harvests timber from forest.
flavor: "The forest falls, civilization rises."

special:
  - Destroys forest tile when placed
  - Limited by adjacent forests

unlocked: start
```

---

#### Quarry
```yaml
id: quarry
name: Quarry
category: extraction
tier: 1
cost:
  - resource: wood
    amount: 15

inputs:
  - resource: power
    amount: 1
    rate: per_second

outputs:
  - resource: stone
    amount: 3
    rate: per_second

placement:
  - type: adjacent_to
    target: mountain

description: Extracts stone from mountain.
flavor: "Breaking rock, building dreams."

unlocked: start
```

---

#### Mine
```yaml
id: mine
name: Mine
category: extraction
tier: 2
cost:
  - resource: wood
    amount: 20
  - resource: stone
    amount: 15

inputs:
  - resource: power
    amount: 2
    rate: per_second

outputs:
  - resource: iron_ore
    amount: 2
    rate: per_second
  - resource: coal
    amount: 1
    rate: per_second

placement:
  - type: adjacent_to
    target: mountain

description: Digs deep for ore and coal.
flavor: "Into the depths we go."

unlocked: population >= 10
```

---

#### Oil Derrick
```yaml
id: oil_derrick
name: Oil Derrick
category: extraction
tier: 4
cost:
  - resource: iron_bars
    amount: 30
  - resource: tools
    amount: 10

inputs:
  - resource: power
    amount: 3
    rate: per_second

outputs:
  - resource: oil
    amount: 2
    rate: per_second

placement:
  - type: on_terrain
    target: oil_deposit

description: Pumps crude oil from the earth.
flavor: "Black gold."

unlocked: population >= 50
```

---

#### Clay Pit
```yaml
id: clay_pit
name: Clay Pit
category: extraction
tier: 2
cost:
  - resource: wood
    amount: 10

inputs: none

outputs:
  - resource: clay
    amount: 2
    rate: per_second

placement:
  - type: adjacent_to
    target: water_source

description: Digs clay from riverbeds.
flavor: "Earth's moldable gift."

unlocked: population >= 10
```

---

#### Forester
```yaml
id: forester
name: Forester
category: extraction
tier: 3
cost:
  - resource: wood
    amount: 25
  - resource: stone
    amount: 10

inputs:
  - resource: water
    amount: 1
    rate: per_second

outputs:
  - resource: wood
    amount: 3
    rate: per_second

placement:
  - type: any

description: Plants and harvests trees sustainably.
flavor: "For every tree felled, two are planted."

special:
  - Renewable wood source
  - Does not require adjacent forest

unlocked: population >= 25
```

---

### 🔨 Processing Cards

---

#### Smelter
```yaml
id: smelter
name: Smelter
category: processing
tier: 2
cost:
  - resource: stone
    amount: 25
  - resource: wood
    amount: 10

inputs:
  - resource: iron_ore
    amount: 2
    rate: per_second
  - resource: coal
    amount: 1
    rate: per_second

outputs:
  - resource: iron_bars
    amount: 1
    rate: per_second

description: Melts ore into usable metal.
flavor: "Fire transforms stone to steel."

unlocked: population >= 10
```

---

#### Sawmill
```yaml
id: sawmill
name: Sawmill
category: processing
tier: 2
cost:
  - resource: stone
    amount: 15
  - resource: iron_bars
    amount: 5

inputs:
  - resource: wood
    amount: 3
    rate: per_second
  - resource: power
    amount: 1
    rate: per_second

outputs:
  - resource: lumber
    amount: 2
    rate: per_second

description: Cuts wood into refined lumber.
flavor: "Precision cuts, quality builds."

unlocked: population >= 10
```

---

#### Kiln
```yaml
id: kiln
name: Kiln
category: processing
tier: 2
cost:
  - resource: stone
    amount: 20
  - resource: clay
    amount: 10

inputs:
  - resource: clay
    amount: 2
    rate: per_second
  - resource: wood
    amount: 1
    rate: per_second

outputs:
  - resource: bricks
    amount: 2
    rate: per_second

description: Fires clay into sturdy bricks.
flavor: "Heat hardens, structures stand."

unlocked: population >= 10
```

---

#### Workshop
```yaml
id: workshop
name: Workshop
category: processing
tier: 3
cost:
  - resource: lumber
    amount: 20
  - resource: stone
    amount: 15

inputs:
  - resource: iron_bars
    amount: 1
    rate: per_second
  - resource: lumber
    amount: 1
    rate: per_second

outputs:
  - resource: tools
    amount: 1
    rate: per_second

description: Crafts tools from metal and wood.
flavor: "The right tool for every job."

unlocked: population >= 25
```

---

#### Bakery
```yaml
id: bakery
name: Bakery
category: processing
tier: 2
cost:
  - resource: stone
    amount: 20
  - resource: wood
    amount: 15

inputs:
  - resource: food
    amount: 2
    rate: per_second
  - resource: water
    amount: 1
    rate: per_second

outputs:
  - resource: bread
    amount: 3
    rate: per_second

description: Bakes grain into nutritious bread.
flavor: "The smell of prosperity."

special:
  - Bread satisfies population better than raw food

unlocked: population >= 10
```

---

#### Refinery
```yaml
id: refinery
name: Refinery
category: processing
tier: 4
cost:
  - resource: iron_bars
    amount: 40
  - resource: bricks
    amount: 30

inputs:
  - resource: oil
    amount: 2
    rate: per_second
  - resource: power
    amount: 3
    rate: per_second

outputs:
  - resource: fuel
    amount: 2
    rate: per_second

description: Processes crude oil into fuel.
flavor: "Liquid power."

unlocked: population >= 50
```

---

#### Factory
```yaml
id: factory
name: Factory
category: processing
tier: 4
cost:
  - resource: iron_bars
    amount: 50
  - resource: bricks
    amount: 40
  - resource: tools
    amount: 10

inputs:
  - resource: iron_bars
    amount: 2
    rate: per_second
  - resource: power
    amount: 5
    rate: per_second

outputs:
  - resource: machines
    amount: 1
    rate: per_second

description: Mass produces complex machinery.
flavor: "The engine of progress."

unlocked: population >= 50
```

---

#### Textile Mill
```yaml
id: textile_mill
name: Textile Mill
category: processing
tier: 3
cost:
  - resource: lumber
    amount: 25
  - resource: iron_bars
    amount: 10

inputs:
  - resource: fiber
    amount: 2
    rate: per_second
  - resource: power
    amount: 1
    rate: per_second

outputs:
  - resource: cloth
    amount: 2
    rate: per_second

description: Weaves fiber into cloth.
flavor: "Thread by thread, warmth is made."

unlocked: population >= 25
```

---

### 🏛️ Civilization Cards

---

#### Tent
```yaml
id: tent
name: Tent
category: civilization
tier: 1
cost:
  - resource: wood
    amount: 5

provides:
  - population_cap: +2

upkeep: none

description: Basic shelter for early settlers.
flavor: "A roof over our heads."

unlocked: start
```

---

#### House
```yaml
id: house
name: House
category: civilization
tier: 2
cost:
  - resource: lumber
    amount: 10
  - resource: stone
    amount: 8

provides:
  - population_cap: +5

upkeep:
  - resource: water
    amount: 0.5
    rate: per_second

description: Comfortable permanent housing.
flavor: "Home is where the hearth is."

unlocked: population >= 10
```

---

#### Market
```yaml
id: market
name: Market
category: civilization
tier: 2
cost:
  - resource: lumber
    amount: 15
  - resource: stone
    amount: 10

inputs: none
outputs: none

radius: 3

description: Hub of trade and commerce.
flavor: "Where goods change hands."

special:
  - Buildings in radius: +20% efficiency
  - +Happiness in radius

unlocked: population >= 10
```

---

#### School
```yaml
id: school
name: School
category: civilization
tier: 3
cost:
  - resource: lumber
    amount: 25
  - resource: bricks
    amount: 20

inputs: none
outputs: none

radius: 4

description: Educates the next generation.
flavor: "Knowledge builds civilizations."

special:
  - +50% research speed (if research implemented)
  - +Happiness
  - Unlocks Tier 4 cards faster

unlocked: population >= 25
```

---

#### Hospital
```yaml
id: hospital
name: Hospital
category: civilization
tier: 3
cost:
  - resource: bricks
    amount: 30
  - resource: iron_bars
    amount: 15

inputs:
  - resource: medicine
    amount: 1
    rate: per_second
  - resource: water
    amount: 1
    rate: per_second

outputs: none

radius: 5

description: Heals the sick and injured.
flavor: "Where hope is restored."

special:
  - Prevents population loss from disease
  - +Population growth rate in radius

unlocked: population >= 25
```

---

#### Temple
```yaml
id: temple
name: Temple
category: civilization
tier: 3
cost:
  - resource: stone
    amount: 40
  - resource: lumber
    amount: 20

inputs: none
outputs: none

radius: 4

description: A place of worship and reflection.
flavor: "The spirit of the people."

special:
  - +Happiness (large bonus)
  - Reduces negative event impact

unlocked: population >= 25
```

---

#### Monument
```yaml
id: monument
name: Monument
category: civilization
tier: 5
cost:
  - resource: stone
    amount: 100
  - resource: iron_bars
    amount: 50
  - resource: tools
    amount: 20

inputs: none
outputs: none

description: A testament to your achievements.
flavor: "They will remember us."

special:
  - Victory points: +1000
  - +Happiness (massive)
  - Achievement unlock

unlocked: population >= 100
```

---

#### Town Hall
```yaml
id: town_hall
name: Town Hall
category: civilization
tier: 4
cost:
  - resource: bricks
    amount: 50
  - resource: lumber
    amount: 30
  - resource: iron_bars
    amount: 20

inputs: none
outputs: none

description: The seat of governance.
flavor: "Order brings prosperity."

special:
  - Unlocks advanced cards
  - +10% all production globally
  - Required for population > 75

unlocked: population >= 50
```

---

### 🔧 Utility Cards

---

#### Road
```yaml
id: road
name: Road
category: utility
tier: 1
cost:
  - resource: stone
    amount: 2

description: Connects buildings efficiently.
flavor: "All roads lead somewhere."

special:
  - Buildings connected by roads: +10% efficiency
  - Cheap, can chain

unlocked: start
```

---

#### Warehouse
```yaml
id: warehouse
name: Warehouse
category: utility
tier: 2
cost:
  - resource: lumber
    amount: 20
  - resource: stone
    amount: 15

storage:
  - resource: all
    capacity: 200

description: General storage facility.
flavor: "A place for everything."

unlocked: population >= 10
```

---

#### Splitter
```yaml
id: splitter
name: Splitter
category: utility
tier: 2
cost:
  - resource: iron_bars
    amount: 5

inputs:
  - resource: any
    amount: pass_through

outputs:
  - resource: same
    amount: split_evenly
    ports: 2

description: Divides resource flow.
flavor: "Share the wealth."

special:
  - Splits one input to two outputs

unlocked: population >= 10
```

---

#### Merger
```yaml
id: merger
name: Merger
category: utility
tier: 2
cost:
  - resource: iron_bars
    amount: 5

inputs:
  - resource: same_type
    amount: pass_through
    ports: 2

outputs:
  - resource: same
    amount: combined

description: Combines resource flows.
flavor: "Strength in unity."

special:
  - Merges two inputs of same type

unlocked: population >= 10
```

---

#### Buffer
```yaml
id: buffer
name: Buffer
category: utility
tier: 3
cost:
  - resource: iron_bars
    amount: 10
  - resource: lumber
    amount: 10

storage:
  - resource: single
    capacity: 50

description: Small inline storage.
flavor: "Smooth out the bumps."

special:
  - Prevents production stalls
  - Stores overflow, releases when needed

unlocked: population >= 25
```

---

#### Boost Beacon
```yaml
id: boost_beacon
name: Boost Beacon
category: utility
tier: 4
cost:
  - resource: iron_bars
    amount: 25
  - resource: tools
    amount: 10

inputs:
  - resource: power
    amount: 3
    rate: per_second

radius: 2

description: Enhances nearby production.
flavor: "Amplifying potential."

special:
  - Buildings in radius: +25% output
  - Consumes significant power

unlocked: population >= 50
```

---

## Balance Notes

### Production Rates

Base unit: 1 resource per second

| Tier | Typical Output | Typical Input |
|------|----------------|---------------|
| 1 | 1-2 /s | 0-1 /s |
| 2 | 2-3 /s | 1-2 /s |
| 3 | 3-5 /s | 2-3 /s |
| 4 | 5-8 /s | 3-5 /s |
| 5 | Special | Varies |

### Population Consumption

| Resource | Per Person Per Second |
|----------|----------------------|
| Food | 0.1 |
| Water | 0.05 |
| Heat (winter) | 0.02 |

### Population Growth

| Condition | Growth Rate |
|-----------|-------------|
| All needs met | +1 per 10 seconds |
| Food shortage | -1 per 5 seconds |
| Water shortage | -1 per 3 seconds |
| Both shortage | -1 per 2 seconds |

### Happiness Modifiers

| Source | Modifier |
|--------|----------|
| Basic needs met | +10 |
| Market nearby | +5 |
| Temple nearby | +15 |
| School nearby | +5 |
| Hospital nearby | +5 |
| Coal plant nearby | -10 |
| Overcrowding | -5 per excess |

---

## Card Unlock Progression

### Starting Deck (Tier 1)
- Well
- Farm
- Fishing Hut
- Campfire
- Lumber Mill
- Quarry
- Tent
- Road

### Population 10 Unlocks (Tier 2)
- Granary
- Cistern
- Hunting Lodge
- Windmill
- Waterwheel
- Mine
- Clay Pit
- Smelter
- Sawmill
- Kiln
- Bakery
- House
- Market
- Warehouse
- Splitter
- Merger
- Power Line

### Population 25 Unlocks (Tier 3)
- Herbalist
- Coal Plant
- Generator
- Forester
- Workshop
- Textile Mill
- School
- Hospital
- Temple
- Buffer

### Population 50 Unlocks (Tier 4)
- Solar Panel
- Oil Derrick
- Refinery
- Factory
- Town Hall
- Boost Beacon

### Population 100 Unlocks (Tier 5)
- Monument
- (Additional endgame cards TBD)

---

## Puzzle Mode Card Sets

### Tutorial Puzzles (Levels 1-10)
Limited to: Well, Farm, Tent, Road

### Basic Puzzles (Levels 11-25)
Add: Lumber Mill, Quarry, Campfire, House

### Intermediate Puzzles (Levels 26-40)
Add: Mine, Smelter, Windmill, Sawmill, Market

### Advanced Puzzles (Levels 41-50)
Full card set available

---

## Card Art Guidelines

### Style
- Simple, iconic silhouettes
- Limited color palette (2-3 colors per card)
- Consistent stroke weight
- Readable at small sizes

### Dimensions
- Card: 120×160 px (3:4 ratio)
- Icon: 64×64 px
- Thumbnail: 32×32 px

### Color Coding
Each category has a primary and accent color:

| Category | Primary | Accent |
|----------|---------|--------|
| Nature | #27AE60 | #2ECC71 |
| Survival | #F39C12 | #F1C40F |
| Power | #3498DB | #5DADE2 |
| Extraction | #E67E22 | #EB984E |
| Processing | #E74C3C | #EC7063 |
| Civilization | #9B59B6 | #AF7AC5 |
| Utility | #95A5A6 | #BDC3C7 |

---

## Future Card Ideas

### Tier 5+ (Endgame)
- **University** - Unlocks special research
- **Observatory** - Reveals full map
- **Cathedral** - Massive happiness
- **Colosseum** - Entertainment + happiness
- **Aqueduct** - Long-range water transport
- **Railroad** - Fast resource transport
- **Bank** - Stores "gold" resource
- **Embassy** - Trade with "other civs" (events)

### Special/Event Cards
- **Disaster Relief** - Mitigates storms
- **Festival** - Temporary happiness boost
- **Expedition** - Reveals resources
- **Miracle** - One-time big bonus

### Seasonal Cards
- **Ice House** - Stores food through winter
- **Greenhouse** - Farm works in winter
- **Snow Plow** - Roads work in winter

---

## Document Info

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Chris + Claude  
**Status:** Ready for Implementation  
**Card Count:** 47 defined, expandable
