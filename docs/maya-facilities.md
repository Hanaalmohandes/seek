# Maya — Facilities module

## Scope

Three UI screens: Facilities, Facility Details and Announcements. The module uses Seek's shared navy-and-red palette, Overpass fonts, cards, inputs and buttons. Facility hours and announcements are sample content.

## Features

- Browse facilities by category.
- Search by name, building or service.
- View location, services and opening hours.
- Open campus directions for a facility.
- Read general or facility-specific announcements.
- Filter notices by closure, maintenance or opening hours.
- Switch sample announcement content between Arabic and English.

## Structure

Screens and sample data live in `src/features/facilities/`. Expo Router handles navigation. Screens own their filter, search and language state; shared components control appearance.

## Screen flow

Facilities → choose a category or search → Facility Details → Directions or Announcements.

An unknown facility shows a return action. Searches and announcement filters provide empty states when there are no results.

## Future integration

Published facilities and notices can be stored in Firestore, with local caching for offline access. Translation and push notification delivery require separate service integration; the current module uses bundled bilingual notices.

## Manual checks

- Open Facilities from the bottom tabs.
- Try each category and search by service.
- Search for a missing item and reset the filters.
- Open a facility and check its details, directions and announcements.
- Switch English and Arabic.
- Open `/facility/unknown` and use the return action.
