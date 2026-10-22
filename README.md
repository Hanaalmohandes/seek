# Seek

A campus navigation app for BUE, built with Expo, TypeScript and NativeWind.

**Member 1: Hana — 239489**  
Responsible for Campus Map, Location Search, Building Details and Directions.

Sprint 01 is a UI prototype. Search results, walking routes and opening hours use sample data. Live search, GPS and route-finding are planned for later.

## Run the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `w` to open the web version.

## Screens

- **Campus Map:** tap a building to see its places, details and directions.
- **Building Details:** view a building illustration, key facts and places inside.
- **Location Search:** browse buildings and view sample search results.
- **Directions:** view a sample route, walking time and steps.

Campus Map and Building Details are the two main Sprint 01 screens. All screens share the same colours, fonts, cards and buttons.

## Sprint 01 — Architecture decisions

- **Navigation:** bottom tabs make Map and Search easy to switch between. Stack screens open Building Details and Directions, with a back button to return.
- **Route parameters:** `building/[id]` uses a building ID, such as `12`, to display the selected building. `directions/[id]` accepts a place or building ID. Parameter types and link helpers live in `src/navigation/types.ts`.
- **Folders:** campus screens, components and data are grouped in `src/features/campus/`. Shared buttons, inputs and cards live in `src/components/ui/`. Route files live in `src/app/`.
- **Imports:** `@/` points to `src/`, making shared imports shorter and easier to read.
- **Design:** `src/theme/tokens.ts` defines shared colours, fonts, spacing and radii. NativeWind uses the colour, font and radius tokens. Navy is used for headings and actions, gold for accents, and light backgrounds for readable cards.
- **Environments:** `app.config.ts` and `eas.json` define development, staging and production variants with separate names and app IDs. `.env.example` contains public example settings only. Real `.env` files are ignored by Git; no secrets belong in public variables.

## Project brief

See [docs/product-brief.md](docs/product-brief.md) for the app's purpose, scope and screen map.

## Checks

```bash
npx tsc --noEmit
npx expo lint
```
