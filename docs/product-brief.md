# Seek — product brief

Sprint 01 covers Member 1’s campus navigation UI. Search results, route previews and opening hours use sample data; live search, GPS and route-finding are planned for Phase 2.

## Problem
New BUE students struggle to find buildings, faculties, labs and offices on a large campus,
and to plan their day around lectures in different buildings.

## Users
BUE students (especially first-years), visitors and new staff.

## Product scope

The first three items have UI prototype screens in this repository. The final two are planned team features.

## Core features
1. Interactive campus map following the official BUE campus map, with building details (Member 1)
2. Location search by faculty, lab, office or building (Member 1)
3. Walking directions from the nearest gate or any building (Member 1)
4. Facilities, announcements and favourites (Members 2 and 4)
5. Personal academic schedule with lecture reminders (Member 3)

## Screen map

```
Root Stack (src/app/_layout.tsx)
├─ (tabs)  Bottom tabs (src/app/(tabs)/_layout.tsx)
│  ├─ index   Campus Map ───── tap building → panel ─┬─ Details ──► building/[id]
│  │                                                 └─ Directions ─► directions/[id]
│  └─ search  Location Search ─ tap building ──────────► building/[id]
│                              └ tap place ───────────► directions/[id]
├─ building/[id]    Building Details  ── Get directions ─► directions/[id]   params: id
└─ directions/[id]  Directions                                              params: id, from?
```
Navigator choice: tabs for equal top-level areas, a stack screen for drilling into one place.
Teammates add their feature tabs (Schedule, Facilities, Profile) to the same tab bar.
