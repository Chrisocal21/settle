# SETTLE — Trading System

## Overview

Trading is **structured, value-based, and instant**. No IOUs, no broken promises, no endless negotiation.

---

## Trading Philosophy

- Every item has a visible value
- Market fluctuates per game
- You see what you're getting
- Deals happen instantly
- Fair for new players, strategic for experienced ones

---

## How Trading Works

### Step by Step

1. Player A clicks "Propose Trade"
2. Player A selects what they're offering (sees total value: e.g., 24 points)
3. Player A selects what they want (sees total value: e.g., 30 points)
4. System shows the gap — "You're asking for 6 points more than giving"
5. Player B sees the proposal
6. Player B can: Accept / Decline / Counter
7. If accepted, trade happens instantly

### No Future Promises

All trades are instant swaps. You cannot trade:
- "I'll give you 20 ore now, you give me 10 food per turn for 3 turns"
- "Help me now and I'll help you later"
- Future favors or delayed payments

What you see is what you get.

---

## Resource Values

Every tradeable item has a visible value rating.

| Rarity | Examples | Value Points |
|--------|----------|--------------|
| Common | Wood, stone, basic food | 1-2 |
| Uncommon | Metal, lumber, provisions | 3-5 |
| Rare | Machinery, advanced materials | 8-12 |
| Very Rare | Blueprints, specialist workers | 15-25 |
| Legendary | Unique tools, rare finds | 50+ |

---

## Market Fluctuation

Values shift based on the game state:

| Factor | Effect on prices |
|--------|------------------|
| Course Card | Sets baseline scarcity (desert = water worth more) |
| Current supply | If ore is rare this game, ore prices rise |
| Hazard events | Drought = food prices spike |
| Late game | Advanced materials become more valuable |

**Players can see market rates** — this prevents scamming new players.

---

## What's Tradeable

### YES — Tradeable (Earned In-Game)

| Item type | Notes |
|-----------|-------|
| Raw resources | Ore, wood, food, water, stone |
| Refined resources | Metal, lumber, provisions, bricks |
| Advanced resources | Machinery, infrastructure |
| Materials | Clay, pellets, coal |
| Territory access | "Let me build through your land, I'll pay you" |
| Worker loans? | Potentially — "Borrow 5 workers, return in 3 turns" (risky, maybe cut) |

### NO — Not Tradeable

| Item type | Why |
|-----------|-----|
| Skins | Purchased with real money |
| Cosmetic wildcards | Purchased with real money |
| Card backs | Purchased with real money |
| Themes | Purchased with real money |
| Any gold coin purchase | Hard line — no resale |

---

## Trade Interface Features

| Feature | How it works |
|---------|--------------|
| Value display | Both players see point values of all items |
| Gap indicator | Shows if trade is uneven |
| Market rates | Current value of resources visible |
| Trade history | Everyone can see past deals |
| Quick trade | Preset common trades (e.g., "50 wood for 30 food") |

---

## Trade History

All completed trades are visible to all players.

**Why this matters:**
- Prevents secret deals
- Players can see who's trading with whom
- Creates table talk and strategy
- "Hey, you just gave them all your iron — interesting..."

---

## Reputation Score (Future Feature)

Track trading behavior over time:

| Behavior | Effect on reputation |
|----------|---------------------|
| Complete fair trades | Reputation increases |
| Consistent trading partner | Builds trust score |
| Backs out of trades repeatedly | Reputation decreases |
| Offers very lopsided trades | Flagged as potentially predatory |

**This is a future feature** — adds depth but is complex to implement. Core game works without it.

---

## Trading Strategy

Trading creates opportunities for:

| Strategy | How it works |
|----------|--------------|
| Mutual benefit | Both players get what they need |
| Information gathering | Seeing what others want reveals their weaknesses |
| Kingmaking prevention | Don't trade with the leader |
| Catch-up mechanic | Struggling players can trade for what they need |
| Choking | Refuse to trade a scarce resource |

---

## Trading During Async Play

For async (turn-based over time) games:

| Feature | How it works |
|---------|--------------|
| Trade proposals wait | Sent when you're online, waits for response |
| Notification | "Player X wants to trade" |
| Expiration | Proposals expire after X hours if no response |
| Counter offers | Back and forth until resolved or expired |

---

## Territory Access Trading

A special trade type: paying to build through someone's land.

| Element | How it works |
|---------|--------------|
| Proposal | "Let me build 1 node in your territory" |
| Payment | Resources or ongoing rent |
| Duration | One-time or per-turn fee |
| Restrictions | Can't destroy their buildings, just build your own |

This creates interesting border dynamics without combat.
