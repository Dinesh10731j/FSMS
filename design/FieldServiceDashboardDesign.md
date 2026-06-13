# DishHome Fibernet Field Service Management Dashboard

## Purpose
Design a mobile-first ISP field service management control center that prevents stock loss, detects fraud, and optimizes technician performance in real time.

This system is a real-time control center for:
- fraud detection
- technician productivity tracking
- stock loss prevention
- inventory and activity oversight

---

## Information Architecture

Priority order:
1. Alerts
2. Activity
3. Technicians
4. Stock
5. Analytics

The home screen follows a feed-based hierarchy, with the live activity feed as the central interaction model.

### Primary navigation
- Bottom tab bar or persistent thumb-zone nav
- Primary tabs:
  - Home (dashboard)
  - Activity Feed
  - Inventory
  - Analytics
  - Profile / Settings

### Home screen sections
A. System Overview Strip
B. Live Activity Feed (Primary Focus)
C. Technician Intelligence Cards
D. Inventory Intelligence
E. Analytics Section
F. Alert Center

---

## Homepage Layout

### Section A: System Overview Strip
A compact top strip showing the mission-critical status summary:
- Total stock count by category (Router, IPTV, Wire)
- Today consumption
- Loss percentage
- Active technicians

Design
- Use a horizontal scrollable summary strip for mobile
- Each summary card is simple, high-contrast, icon-led, and colored by meaning
- Reserve red only for out-of-tolerance values

### Section B: Live Activity Feed
Primary focus of the screen.
- Feed cards show technician actions, stock usage, and alert events
- Each card includes timestamp, location, event type, and severity
- Cards are collapsed by default and expandable on tap
- Feed filters available via swipe gesture: All / High-risk / Stock / Technician

Card anatomy
- Badge: icon + alert type
- Headline: action summary
- Metadata row: time, location, technician
- Inline severity indicator: fraud / mismatch / warning / normal
- Tap expands to show details and quick action buttons

### Section C: Technician Intelligence Cards
A row of horizontal technician cards for fast monitoring.
- Status: online / offline / idle
- Today output: jobs completed or stock delivered
- Efficiency score: performance index
- Risk level indicator: fraud or mismatch risk status

Design
- Use a swipeable horizontal cluster of cards
- Each card uses a discreet color system: green = good, amber = watch, red = high-risk
- Long press reveals quick actions (message, reassign, dispatch)

### Section D: Inventory Intelligence
Clear inventory visibility with a focus on loss prevention.
- Stock breakdown by router / IPTV / wire
- Burn rate mini-chart or sparkline
- Remaining stock warnings with actionable thresholds

Design
- Use a compact chart + details card for each category
- Highlight margins and mismatch risk in contextual chips (e.g. “12% variance”) 
- Include a small “stock heat” indicator for urgent restocking

### Section E: Analytics Section
A lightweight analytics section for trends and comparisons.
- Weekly / monthly usage trends
- Technician comparison charts
- Loss trend analysis

Design
- Use small multiple charts or card toggles
- Keep all charts simple with high contrast and soft palette
- Provide one tap to expand an analytics chart into full-screen detail

### Section F: Alert Center
A dedicated alert zone to surface risk quickly.
- Fraud detection alerts
- Stock mismatch alerts
- Area anomaly detection

Design
- Use a stacked alert list near the bottom of the screen for quick review
- Display alert severity and whether action is required
- Each alert card can be swiped to acknowledge or flagged for escalation

---

## UX Principles

- Feed-based interaction model like Reddit
- Progressive disclosure: tap to view more details
- Minimal cognitive load: one main action per card
- Meaningful color system, not decorative
- Thumb-friendly layout: bottom actions, horizontal swipes, large tappable cards

Interaction patterns
- Tap card to expand details
- Swipe feed for quick filters
- Long press for quick actions on technician cards
- Floating action button for “Add Consumption / Ticket”

---

## Visual Style

- Clean, modern enterprise SaaS feel
- Soft shadows and rounded cards
- High contrast typography for readability
- Minimal icons used for meaning
- Palette:
  - Calm blues / greens for normal status
  - Amber/sea-green for watch and warning
  - Red for alerts and fraud

Example palette
- Primary blue: #2563EB
- Calm green: #10B981
- Neutral blue-grey: #334155 / #64748B
- Alert red: #EF4444
- Card surface: #FFFFFF / #F8FAFC

---

## Component Architecture

### Suggested reusable components
- `SummaryStripCard`
- `ActivityFeedCard`
- `TechnicianCard`
- `InventoryMetricCard`
- `TrendChartCard`
- `AlertCard`
- `FloatingActionButton`

### Screen structure
- `HomeScreen`
  - `CurvedHeader`
  - `OverviewStrip`
  - `LiveActivityFeed`
  - `TechnicianCarousel`
  - `InventoryOverview`
  - `AnalyticsPanel`
  - `AlertCenter`
  - `FAB`

### Data model notes
- `activityFeed[]`: timestamp, type, technician, location, severity, details
- `technicianStatus[]`: status, output, efficiency, riskLevel
- `stockMetrics[]`: category, available, consumedToday, lossPct, burnRate
- `alerts[]`: alertType, timestamp, severity, location, affectedTechnician

---

## Mobile-First Interaction Flow

1. User opens the app and sees the overview strip above the fold.
2. The live activity feed fills the center of the screen.
3. Technician intelligence cards are swipeable just below the feed.
4. Inventory and analytics are visible as secondary sections.
5. The alert center is anchored to the bottom with urgent events.
6. Floating action button allows rapid creation of a consumption event or ticket.

---

## Outcome

This design turns the home screen into a real-time ISP control center that:
- surfaces fraud and stock mismatches immediately,
- lets managers review technician output at a glance,
- reduces cognitive load by using a prioritized feed,
- preserves enterprise polish with calm color, soft elevation, and clean layouts.
