import { useContext } from 'react';

import { PersonalHubContext } from '../contexts/PersonalHubContext';

export function usePersonalHub() {
  const value = useContext(PersonalHubContext);
  if (!value) throw new Error('usePersonalHub must be inside PersonalHubProvider');
  return value;
}
