import type { CampusLocation, LocationType } from '../types';

// BUE places, from the official campus map and the university's list of buildings.
// Floors aren't recorded yet (floor: null) — add them when you know them.
// Wind Tunnel Lab, Student Union and Copy Center positions come from Google Maps.
// latitude/longitude: BUE campus centre from Google Maps (used by Google Maps in Phase 2).
const LAT = 30.1187069;
const LNG = 31.6104406;

type Place = Omit<CampusLocation, 'latitude' | 'longitude' | 'floor'> & { floor?: number | null };

const PLACES: Place[] = [
  { id: 'nursing', name: 'Faculty of Nursing', type: 'faculty', buildingId: '17', detail: 'Building 17' },
  { id: 'clinical-rooms', name: 'Clinical Examination Rooms', type: 'lab', buildingId: '17', detail: 'Faculty of Nursing' },
  { id: 'buses', name: 'Buses Area', type: 'facility', buildingId: 'BUS', detail: 'University buses, near Gate 5' },
  { id: 'food-court', name: 'Food Court', type: 'facility', buildingId: '16', detail: 'Food vendors; ramps all around' },
  { id: 'roman-theatre', name: 'Roman Theatre', type: 'facility', buildingId: '16', detail: 'Facing the Food Court' },
  { id: 'eee', name: 'Faculty of E.E.E', type: 'faculty', buildingId: '15', detail: 'Energy and Environmental Engineering' },
  { id: 'mass-comm', name: 'Faculty of Mass Communication', type: 'faculty', buildingId: '13', detail: 'CMM, Building 13' },
  { id: 'media-studios', name: 'Media Studios', type: 'lab', buildingId: '13', detail: 'Faculty of Mass Communication' },
  { id: 'arts-humanities', name: 'Faculty of Arts and Humanities', type: 'faculty', buildingId: '13', detail: 'Building 13' },
  { id: 'pharmacy', name: 'Faculty of Pharmacy', type: 'faculty', buildingId: '11', detail: 'Building 11' },
  { id: 'pharmacy-clinic', name: 'Pharmacy Clinic', type: 'facility', buildingId: '11', detail: 'Faculty of Pharmacy' },
  { id: 'pharma-labs', name: 'Pharmaceutical Labs', type: 'lab', buildingId: '11', detail: 'Faculty of Pharmacy' },
  { id: 'library', name: 'Library', type: 'facility', buildingId: '9', detail: 'Print and e-resources, study support' },
  { id: 'student-union', name: 'Student Union Office', type: 'office', buildingId: '9', detail: 'Next to the Library' },
  { id: 'copy-center', name: 'Copy Center', type: 'facility', buildingId: '9', detail: 'Printing and copying, next to the Library' },
  { id: 'baeps', name: 'Faculty of BAEPS', type: 'faculty', buildingId: 'G', detail: 'Business, Economics and Political Science' },
  { id: 'baeps-clinic', name: 'BAEPS Clinic', type: 'facility', buildingId: 'G', detail: 'Faculty of BAEPS' },
  { id: 'stock-market-room', name: 'Stock Market Simulation Room', type: 'lab', buildingId: 'G', detail: 'Faculty of BAEPS' },
  { id: 'engineering', name: 'Faculty of Engineering', type: 'faculty', buildingId: 'A', detail: 'Building A' },
  { id: 'wind-tunnel', name: 'Wind Tunnel Lab (CELT)', type: 'lab', buildingId: 'A', detail: 'Faculty of Engineering' },
  { id: 'eng-labs', name: 'Engineering Labs and Workshop', type: 'lab', buildingId: 'A', detail: 'Faculty of Engineering' },
  { id: 'law', name: 'Faculty of Law', type: 'faculty', buildingId: '14', detail: 'Building 14' },
  { id: 'dentistry', name: 'Faculty of Dentistry', type: 'faculty', buildingId: '12', detail: 'Building 12' },
  { id: 'dental-hospital', name: 'Dental Hospital', type: 'facility', buildingId: '12', detail: 'Faculty of Dentistry' },
  { id: 'dental-labs', name: 'Dental Laboratories', type: 'lab', buildingId: '12', detail: 'Faculty of Dentistry' },
  { id: 'slc', name: 'SLC Building', type: 'facility', buildingId: '10', detail: 'Building 10' },
  { id: 'art-design', name: 'Faculty of Arts and Design', type: 'faculty', buildingId: '20', detail: 'Opposite the Buses Area' },
  { id: 'ics', name: 'Faculty of ICS', type: 'faculty', buildingId: 'H', detail: 'Informatics and Computer Science' },
  { id: 'it-offices', name: 'IT Offices', type: 'office', buildingId: 'B', detail: 'Accounts, Wi-Fi and technical help' },
  { id: 'auditorium', name: 'Auditorium', type: 'facility', buildingId: 'C', detail: 'Building C' },
  { id: 'open-air-theatre', name: 'Open-Air Theatre', type: 'facility', buildingId: 'C', detail: 'Next to the Auditorium' },
  { id: 'top-management', name: 'Top Management', type: 'office', buildingId: 'C', detail: 'University leadership offices' },
  { id: 'admission', name: 'Admission Building', type: 'office', buildingId: 'E', detail: 'Applications and enrolment' },
  { id: 'english-dept', name: 'English Department', type: 'faculty', buildingId: 'D', detail: 'Building D' },
];

export const LOCATIONS: CampusLocation[] = PLACES.map((p) => ({
  ...p,
  floor: p.floor ?? null,
  latitude: LAT,
  longitude: LNG,
}));

// How each type is named and drawn across the app.
export const TYPE_META: Record<LocationType, { label: string; icon: string }> = {
  faculty: { label: 'Faculties', icon: 'school-outline' },
  lab: { label: 'Labs & studios', icon: 'flask-outline' },
  facility: { label: 'Facilities', icon: 'cafe-outline' },
  office: { label: 'Offices', icon: 'briefcase-outline' },
};

export const LOCATION_TYPES = Object.keys(TYPE_META) as LocationType[];

/** "ground floor", "floor 2", or null when the floor isn't known. */
export function floorLabel(floor: number | null) {
  if (floor === null) return null;
  if (floor === 0) return 'ground floor';
  return `floor ${floor}`;
}
