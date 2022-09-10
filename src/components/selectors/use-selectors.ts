import { useVkApiContext } from '../vk-api/vk-api-context';

export function useSelectors() {
  // возможно для доп.расчетов пригодится
  const context = useVkApiContext();

  const getProfilesFound = () => context.profilesFound;

  return null;
}