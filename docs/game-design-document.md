# SETTLE — Game Design Document

## Overview

**Settle** is a survival-strategy game that combines factory building, territory expansion, and card-driven chaos. Players compete to be the last functioning economy standing.

---

## Core Concept

- **Node-based flow graph IS the game board** (React Flow aesthetic)
- **Two screens:** Map/Management + Factory Builder
- **Cards reveal the world** — buildings are earned through production
- **Survival race** — last functioning economy wins

---

## The DNA

| Influence | What it brings |
|-----------|----------------|
| Factory Builder (Factorio) | Node connections, resource optimization, production chains |
| Civilization | Territory control, population management, growth |
| Monopoly | Territory control, snowball advantage, economic competition |
| Survival | Scarcity, hazards, collapse risk |
| Uno | Card chaos, affects others, unpredictable |
| Golf | Course-based maps, leader goes first (most exposed) |

---

## Win Conditions (Multiple Paths)

| Path | How you win |
|------|-------------|
| Total expansion | Claim all available territory on the map |
| Production dominance | Economy so strong others can't compete |
| Last standing | Everyone else collapsed, you survived |
| Complete the land | Extract everything, build everything, ride it to the end |

**There is no single win condition.** Different games play out differently. You read the board, the cards, your workers — and figure out what's possible THIS game.

---

## The Two Screens

### Screen 1: Map & Management
- Empire territory view
- Card flipping happens here
- Worker management
- Trading with other players
- See terrain, expansion options, hazards
- Where strategy and survival play out

### Screen 2: Factory Builder
- React Flow canvas
- Place nodes, connect edges
- Puzzle your production lines together
- Optimize flow, add storage, manage energy
- Cloud inventory pushes to your empire
- Where optimization and building play out

**Both screens run simultaneously.** Toggle button to switch. No mini-view — forces attention management.

---

## Game Flow

```
GAME START
    ↓
Course Card flips — sets the world
    ↓
Players spawn equidistant, basic loadout
    ↓
FLIP PHASE (turn-based, leader goes first)
    ↓
Pick a deck, flip a card, chaos enters
    ↓
MANAGEMENT PHASE (real-time, everyone at once)
    ↓
Build, trade, manage workers, optimize factory
    ↓
Repeat until one economy stands
```

---

## Turn Structure

### Flip Phase (Turn-Based)
- **Leader flips first** (most exposed — being ahead is risky)
- Pick which deck to flip from
- Card resolves — may affect you, everyone, or neighbors
- Some cards grant bonus flips — use them or gift them to mess with someone
- Skip cards exist but must be earned

### Management Phase (Real-Time)
- Everyone acts simultaneously
- Build if you have resources
- Trade with other players
- Manage workers, feed them, house them
- Optimize factory production
- Both screens running at once

---

## The Decks

| Deck | What it does | Risk level |
|------|--------------|------------|
| **Location Deck** | Reveals new territory at your edge | Low-medium |
| **Standard Deck** | Resources, events, hazards — everyday chaos | Medium |
| **Chance Deck** | Big swings, high stakes — spicier | High |
| **Wildcard Pool** | Loot drops that find you through gameplay | Earned |

**On your turn:**
1. You MUST flip from one deck (your choice which)
2. Some cards grant bonus flips
3. Skip cards exist but must be earned/held
4. Wildcard hand is secret — your hidden moves

---

## Collapse — How You Lose

**Your economy dies when your workers all die or leave.**

Workers are everything. Everything feeds back to keeping them alive and loyal:
- Food keeps them fed
- Housing keeps them sheltered
- Hazards threaten them
- Your choices affect their morale
- Neglect them → they leave → you collapse

### Worker Loyalty Curve

```
Happy → Content → Restless → Leaving → Mass Exodus
                     ↑
              (you can pull them back here)
```

**But you CAN recover:**
- Sacrifice resources to feed them
- Build emergency housing
- Play a wildcard that boosts morale
- Trade for what you need

---

## No Combat — It's a Race

**Settle is NOT a battle game.** No troops, no raids, no attacking other players' workers.

### How you beat opponents:
| Method | What it looks like |
|--------|-------------------|
| Out-expand | Grab the good territory before they do |
| Out-build | Better production chains, more efficient |
| Out-survive | Weather hazards better, keep workers happy |
| Choke passively | You got the iron, they didn't — tough luck |
| Trade smart | Make deals that help you more than them |

The only enemy is the world itself. Other players are just... also trying to survive it.

---

## Key Design Principles

1. **Variable control** — Sometimes you're the architect, sometimes you're just surviving what the deck threw at you

2. **No turtling** — Resource depletion, worker demands, and other players' chaos splashing on you means you can't hide

3. **Patience rewarded** — Players who rush might win sometimes, but players who listen to their workers get secret advantages

4. **Every playthrough is different** — Course cards, deck randomness, and emergent gameplay mean no two games are alike

5. **Fair competition** — No pay-to-win, shared map so no one starts in a worse position

6. **Learn by losing** — No tutorial, workers teach you through dialogue

---

## Game Length

Games can be 10 minutes (bad luck, early collapse) to 4+ hours (epic struggle).

**Tunable in lobby:**
| Setting | Short game | Long game |
|---------|------------|-----------|
| Map size | Small | Large |
| Deck thickness | Thin decks | Full decks |
| Win threshold | First to 30% territory | Complete everything |
| Hazard frequency | Low | High (slows everyone) |
