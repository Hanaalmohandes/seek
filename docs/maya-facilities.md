# Maya — Facilities module, Phase 1

## Implemented prototype
The Facilities tab reuses Seek’s navy/gold design tokens, Overpass fonts, rounded cards, chips and shared buttons. Three screens are provided: Facility List, Facility Details and Announcements. All facility hours, services and notices are illustrative fixtures. No live university announcements are claimed.

Functional requirements:
1. Browse campus facilities by category.
2. Search facilities by name, building or service.
3. View a facility’s location, services and opening hours.
4. Open existing campus directions for the selected facility.
5. Read facility-specific or campus-wide announcements.
6. Filter notices by closure, maintenance or hours.
7. Switch bundled announcement content between Arabic and English.

## Architecture
Follow the existing feature-based component architecture. Expo Router owns navigation. Screens own transient presentation state (query, category and language), shared UI components own appearance, and typed facility/announcement records are separate from screens. A repository/service layer should replace fixture imports when persistent storage is introduced. This structure is appropriate for the Phase 1 UI; it does not claim a fully implemented MVVM or Firebase architecture.

## Use cases
Primary actor: Student. Use cases: Browse Facilities, Filter Facilities, Search Facilities, View Facility Details, Get Directions, Read Announcements, Filter Announcements, Switch Language. View Facility Details includes showing location, services and hours. Get Directions extends View Facility Details. Filter Facilities and Search Facilities extend Browse Facilities. Switch Language and Filter Announcements extend Read Announcements.

## Activity flow
Open Facilities → optionally select category or search → choose a result → view details → choose directions or facility announcements → optionally filter notices or switch language → return to facilities. No search results and no matching announcements show recoverable empty states. An unknown facility ID shows a fallback and return action.

## Preliminary cloud data model and storage plan
Facilities collection: id (string), name (string), category (enum), building (string), locationId (string reference to campus location), description (string), services (string array), openingHours (structured day/time records), updatedAt (timestamp).
Announcements collection: id (string), facilityId (reference), type (enum), titleEn/bodyEn/titleAr/bodyAr (strings), createdAt/effectiveFrom/expiresAt (timestamps), published (boolean). A facility has many announcements; each announcement references one facility.
Users/{uid}/devices: token (string), platform (enum), notificationsEnabled (boolean), updatedAt (timestamp). Students read published content; authorised staff alone create/update notices. Device-token writes must be restricted to the owning user. No privileged Firebase or Google credentials should be shipped in the app.

Proposed persistence: Firestore as source of truth. A native local store (SQLite or AsyncStorage) keeps the last successful facilities/notices snapshot and sync time. Show cached data with an offline/last-updated indicator when a request fails; show retry when no cache exists. These fetch/cache/error states are not implemented in this fixture-only prototype.

Google Translate integration: call an authenticated backend endpoint using Cloud Translation, cache by announcement ID, content version and target language, and retain the original text when translation fails. The current toggle uses manually supplied bilingual sample content; it does not call Google Translate.

Push notifications: use expo-notifications in a development build on a physical device, obtain permission on an explicit user action, register the device token, and send from a trusted server when an authorised staff member publishes a notice. Notification taps should open Announcements with facilityId. Permission denial must leave browsing available. Push delivery is not implemented here.

## Manual checks
- Open Facilities from the bottom navigation.
- Select each category; search for a service; search nonsense and reset filters.
- Open each facility and verify services, hours and matching directions.
- Read all notices or only a selected facility’s notices.
- Select a notice type with no results and reset filters.
- Switch English/Arabic and check right alignment of Arabic body text.
- Open /facility/unknown and use the return action.

## Apply to your Mac
In the cloned seek-maya folder, while on maya-work:

    git apply --check /path/to/maya-facilities.patch
    git apply /path/to/maya-facilities.patch
    npm ci
    npx expo start

Use this patch only with Hanaalmohandes/seek, not Labs_bue. If the check fails, the source has changed; do not force-apply it. The patch adds three screens plus navigation changes. It does not modify GitHub or main. This module contributes Maya’s three screens; it does not establish the team’s full nine-screen requirement.
