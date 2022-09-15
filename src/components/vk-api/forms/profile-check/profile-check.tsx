/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import './profile-check.css';
import { useVkApiContext } from '../../vk-api-context';
import { useProfileCheck } from './use-profile-check';
import { ProfileFields } from './fields/profile-fields';
import { ControlPanel } from './control-panel/control-panel';

export const ProfileCheck = () => {
  useProfileCheck();
  const context = useVkApiContext();
  const { profileCheckForm: { profileInDb, idSearchParameter, profileVKData } } = context;

  React.useEffect(
    () => {
      console.log('ProfileCheck profileInDb changed', {
        context,
      });
    }, [profileInDb, profileVKData],
  );

  return (
     <>
       <ControlPanel/>
       <div className={'profile-check-container'}>
         <span>Данные из БД {idSearchParameter ? `${idSearchParameter}` : ''}</span>
         <div className={'props-block'}>
           <div className={'foto-profile'}></div>
           <ProfileFields profile={profileInDb} />
         </div>
       </div>
       <div className={'profile-check-container-vk'}>
         <span>Данные из ВК {idSearchParameter ? `${idSearchParameter}` : ''}</span>
         <div className={'props-block'}>
           <div className={'foto-profile'}>
             <img src={profileVKData?.photo_max_orig}/>
           </div>
           <ProfileFields profile={profileVKData} />
         </div>
       </div>
     </>

  );
};