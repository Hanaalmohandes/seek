export type Category = 'All' | 'Library' | 'Cafeteria' | 'Clinic' | 'Labs' | 'Services';
export type Facility = { id: string; name: string; category: Category; building: string; locationId: string; description: string; hours: string; services: string[] };
export type Notice = { id: string; facilityId: string; type: 'Maintenance' | 'Closure' | 'Hours'; date: string; en: { title: string; body: string }; ar: { title: string; body: string } };
