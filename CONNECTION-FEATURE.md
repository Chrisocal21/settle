# Connection System - Drag-to-Connect Conveyors

**Status:** ✅ Base Implementation Complete (More Features Coming)

## Current Implementation

### What Works Now
- **Shift+Click** buildings to create connections (start → end)
- **Green dashed lines** show active connections with dots at endpoints
- **Yellow indicator banner** appears when in connection mode
- **Automatic resource transfer** at 1 item/second through connections
- **SVG overlay rendering** for visual connection lines
- **Connection data structure** stores from/to positions, speed, and type

### Known Limitations (Future Improvements)
- ❌ Cannot delete connections yet (need right-click handler)
- ❌ No visual resource flow animation (just static lines)
- ❌ Fixed transfer speed (always 1 item/sec)
- ❌ No connection capacity limits
- ❌ No priority routing or smart distribution
- ❌ No different connection types (pipes vs belts)

---

## How to Use

Instead of placing conveyor cards, you can now create connections between buildings:

### Creating a Connection
1. **Hold Shift** and **click on a source building** (miner, extractor, storage, smelter, etc.)
2. A **yellow circle** will appear on the source building
3. A **yellow banner** will appear at the bottom saying "Connection Mode"
4. **Hold Shift** and **click on the destination building**
5. A **green dashed line** will appear connecting the two buildings

### Canceling a Connection
- Click anywhere without holding Shift to cancel

### How Connections Work
- Resources automatically transfer from source to destination at 1 item/second
- The connection transfers any resources in the source's storage
- Only transfers if the destination has space
- Green dashed lines show active connections with dots at each end

## Features
- Visual connection lines (green dashed lines)
- Connection mode indicator (yellow banner at bottom)
- Source building highlighted with yellow circle
- Automatic resource transfer every game tick
- No conveyor cards needed!

## Example Uses
- Connect miner → storage building to auto-collect resources
- Connect storage → smelter to supply iron ore
- Connect smelter → storage to collect iron bars
- Chain connections for complex production lines

## Future Enhancements (Ideas)

### Phase 4 Improvements
- **Delete connections:** Right-click connection line to remove it
- **Connection info:** Hover over line to see transfer rate and contents
- **Adjust speeds:** Upgrade connections for faster transfer (1→5→10 items/sec)
- **Visual flow:** Animated dots flowing along connection lines

### Phase 5 Advanced Features
- **Connection types:** 
  - Conveyors (items) - what we have now
  - Pipes (fluids) - for water, oil, etc.
  - Power lines (electricity)
- **Splitters:** One input → multiple outputs with ratio control
- **Mergers:** Multiple inputs → one output with priority
- **Filters:** Only allow specific resources through
- **Buffer zones:** Small storage along connection lines

### Long-Term Vision
- **Smart routing:** Auto-path around obstacles
- **Connection blueprints:** Save/load connection patterns
- **Color coding:** Different colors for different resource types
- **Connection statistics:** Track total items transferred
- **Overflow handling:** What happens when destination is full?
