# Seek

A campus navigation and personal dashboard app for BUE.

## Run the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `w` to open the web version.

## Screens

The app opens on the dashboard. The bottom tabs are Home, Map, Schedule, Facilities and Profile.

- **Home:** today's sample lectures, saved-place count and shortcuts.
- **Map and Search:** browse campus buildings and places.
- **Building Details and Directions:** view a building and a sample walking route.
- **Schedule:** browse sample lectures and open their details or form screens.
- **Facilities:** browse services, facility details and sample announcements.
- **Favorites:** open from Home to pin places and get directions.
- **Profile:** edit student details, choose a photo and save preferences locally.

Search results, routes, opening hours, lectures and announcements use sample data. Profile details, reminder preferences and favorites save on the device. Live GPS, cloud accounts and notification delivery are outside the current UI prototype.

## Sprint 01 — Architecture decisions

- **Navigation:** bottom tabs connect the main areas. Stack screens open Favorites, details and forms, with a back action. Home is the opening screen.
- **Route parameters:** building, directions, facility and lecture screens use an `id`. Typed links and parameter definitions live in `src/navigation/types.ts`.
- **Feature structure:** each feature owns its screens, components, data and types. Stateful features also own their context, provider and hook. Personal Hub keeps device storage in its services folder. Features expose shared exports through their own `index.ts`.
- **Folders:** `src/features/` groups campus, schedule, facilities and personal-hub code. Shared controls live in `src/components/ui/`. Route files stay in `src/app/`.
- **Shared state:** React Context providers share campus, schedule and Personal Hub data. PersonalHubProvider loads profile details, favorites and preferences once, saves changes locally and updates every consumer. Unfinished profile edits remain inside the form until Save is pressed.
- **Imports:** `@/` points to `src/`.
- **Design:** `src/theme/tokens.ts` provides shared colours, fonts, spacing and radii. The palette uses navy, BUE red and light backgrounds.
- **Environments:** `app.config.ts`, `eas.json` and `.env.example` provide development, staging and production examples. Real environment files are ignored by Git.

## Project brief

See [docs/product-brief.md](docs/product-brief.md) for the scope and screen map.

## Checks

```bash
npx tsc --noEmit
npx expo lint
```
