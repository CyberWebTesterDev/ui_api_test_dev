import * as React from 'react';
import { TProfileVK } from '../vk-lib/vk-models';
import { useVkApiContext } from '../vk-api-context';

type TIntersectionProps = {
  profile: TProfileVK | null;
};

export const Intersection: React.FC<TIntersectionProps> = ({ profile }) => {
  const { profilesIntersections } = useVkApiContext();

  if (!profile) {
    return <td className="false-td">Нет</td>;
  }

  const isIntersected =
     !!profilesIntersections?.some(int => int?.vk_id === String(profile.id));

  return (
     <td className={isIntersected ? 'true-td' : 'false-td'}>
       {isIntersected ? 'Да' : 'Нет'}
     </td>
  );
};