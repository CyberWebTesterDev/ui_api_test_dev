import * as React from 'react';
import { TProfile, VK_NAMES_BY_KEY_MAP } from '../vk-lib/vk-models';

type TVkProfilesTable = {
  profiles?: TProfile[];
}

export const VkProfilesTable = ({ profiles }: TVkProfilesTable) => {
  if (profiles?.length === 0 || !profiles) {
    return null;
  }
  const tableHead = Object.keys(VK_NAMES_BY_KEY_MAP).map(
    (key) => {
      return (
         <th>{key}</th>
      );
    },
  );
  const tableBody = profiles.map(
    (profile) => {
      return (
         <tr>
           <td>{profile.id}</td>
           <td>{profile.first_name}</td>
           <td>{profile.last_name}</td>
           <td>{profile.sex}</td>
           <td>{profile.bdate}</td>
         </tr>
      );
    },
  );
  return (
     <table className={'table-vk-matches'}>
       <thead>
         <tr>
          {tableHead}
         </tr>
       </thead>
       <tbody>
        {tableBody}
       </tbody>
     </table>
  );
};