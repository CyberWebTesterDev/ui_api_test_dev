/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { TProfileVK } from '../vk-lib/vk-models';
import { useVkApiContext } from '../vk-api-context';

type TIntersection = {
  profile: TProfileVK | null;
  handleIntersectionId: (id: string) => void;
}

export const Intersection = ({ profile, handleIntersectionId }: TIntersection) => {
  const { profilesIntersections } = useVkApiContext();
  const [isIntersected, setIsIntersected] = React.useState<boolean | undefined>(undefined);
  React.useEffect(
    () => {
      if (profilesIntersections) {
        const intersection = profilesIntersections?.find(int => int?.vk_id === profile?.id.toString());
        const hasIntersection = intersection && intersection.vk_id === profile?.id.toString();
        setIsIntersected(hasIntersection);
        const id = isIntersected ? profile?.id.toString() : '';
      }
    },
    [profilesIntersections],
  );

  return isIntersected
    ? <td key={`int-${profile?.id}`} className={'true-td'}>Да</td> : <td key={`int-${profile?.id}`} className={'false-td'}>Нет</td>;
};