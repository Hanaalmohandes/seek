// Phase 1 fixtures. Services, opening hours and announcements are illustrative, not live campus notices.
export const categories = ['All', 'Library', 'Cafeteria', 'Clinic', 'Labs', 'Services'] as const;
export type Category = typeof categories[number];
export type Facility = { id: string; name: string; category: Category; building: string; locationId: string; description: string; hours: string; services: string[] };
export const facilities: Facility[] = [
  { id: 'library', name: 'University Library', category: 'Library', building: 'Building 9', locationId: 'library', description: 'A quiet place to study, discover resources and work together.', hours: 'Sun–Thu · 8:30 AM–5:00 PM', services: ['Book borrowing', 'Study spaces', 'Digital resources'] },
  { id: 'food-court', name: 'Food Court', category: 'Cafeteria', building: 'Building 16', locationId: 'food-court', description: 'Take a break between lectures and meet your friends.', hours: 'Sun–Thu · 8:00 AM–6:00 PM', services: ['Meals and snacks', 'Drinks', 'Seating area'] },
  { id: 'pharmacy-clinic', name: 'Pharmacy Clinic', category: 'Clinic', building: 'Building 11', locationId: 'pharmacy-clinic', description: 'Find campus health support and assistance.', hours: 'Sun–Thu · 9:00 AM–4:00 PM', services: ['Health enquiries', 'Student assistance'] },
  { id: 'eng-labs', name: 'Engineering Labs', category: 'Labs', building: 'Building A', locationId: 'eng-labs', description: 'Spaces for practical learning and supervised workshops.', hours: 'Scheduled sessions only', services: ['Practical sessions', 'Workshops', 'Supervised equipment'] },
  { id: 'copy-center', name: 'Copy Center', category: 'Services', building: 'Building 9', locationId: 'copy-center', description: 'Prepare your coursework and printed materials.', hours: 'Sun–Thu · 9:00 AM–4:30 PM', services: ['Printing', 'Photocopying', 'Binding'] },
];
export type Notice = { id: string; facilityId: string; type: 'Maintenance' | 'Closure' | 'Hours'; date: string; en: { title: string; body: string }; ar: { title: string; body: string } };
export const announcements: Notice[] = [
  { id: '1', facilityId: 'library', type: 'Hours', date: '2026-10-24', en: { title: 'Extended library hours', body: 'Example notice: the library will remain open until 7 PM during revision week.' }, ar: { title: 'تمديد مواعيد المكتبة', body: 'إعلان تجريبي: تستمر المكتبة في العمل حتى السابعة مساءً خلال أسبوع المراجعة.' } },
  { id: '2', facilityId: 'eng-labs', type: 'Maintenance', date: '2026-10-23', en: { title: 'Workshop maintenance', body: 'Example notice: the workshop is unavailable on Sunday morning for equipment maintenance.' }, ar: { title: 'صيانة الورشة', body: 'إعلان تجريبي: الورشة غير متاحة صباح الأحد لصيانة المعدات.' } },
  { id: '3', facilityId: 'food-court', type: 'Closure', date: '2026-10-22', en: { title: 'Temporary seating closure', body: 'Example notice: one seating area is closed for cleaning. Other seating remains available.' }, ar: { title: 'إغلاق مؤقت لمنطقة الجلوس', body: 'إعلان تجريبي: منطقة جلوس مغلقة للتنظيف، مع استمرار إتاحة باقي الأماكن.' } },
];
