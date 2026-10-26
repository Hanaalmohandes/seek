# Seek — product brief

## Problem

BUE students and visitors need a clear way to find campus places, view services and organise lectures.

## Users

Students, visitors and new university staff.

## Current module scope

Seek is a UI prototype with four feature modules:

- **Campus:** illustrated map, building details, sample search results and route previews.
- **Schedule:** sample timetable, lecture details and lecture form screens.
- **Facilities:** service browsing, search, facility details and bilingual sample announcements.
- **Personal Hub:** dashboard, locally saved favorites, profile editing, photo selection and reminder preferences.

Profile details and favorites save on the device. The timetable, campus notices, opening hours and route previews remain sample data. Cloud accounts, live GPS, live university data and notification delivery are planned work.

## Screen map

```text
Root stack
├─ Main tabs
│  ├─ Home /                Dashboard and shortcuts
│  ├─ Map /map              Select a building → Details or Directions
│  ├─ Schedule /schedule    Select a lecture → Details or Edit
│  ├─ Facilities /facilities
│  │                        Select a facility → Details or Announcements
│  ├─ Profile /profile      Student information and local preferences
│  └─ Search /search        Open from Home or Map; hidden from the tab bar
├─ Favorites /favorites     Open from Home → Pin places or Get directions
├─ Building /building/[id]
├─ Directions /directions/[id]
├─ Facility /facility/[id]
├─ Announcements /announcements
├─ Lecture /lecture/[id]
└─ Lecture form /lecture/edit
```

Tabs connect the main areas. Stack navigation provides a clear return path from details, Favorites and forms. Feature code lives in `src/features/`; shared controls, tokens and typed navigation are separate from the screens.
