import * as React from 'react';
import { BASE_LINKS_OPTIONS, LOCAL_BASE_LINK, VK_BASE_LINK } from './base-link-constants';

type TBaseLinkProfileProps = {
  profileId: string;
  textContent: string;
  handleSelectedTd: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isVK?: boolean;
};

export const BaseLinkProfile: React.FC<TBaseLinkProfileProps> = ({
  profileId,
  handleSelectedTd,
  textContent,
  isVK,
}) => {
  const link = isVK ? VK_BASE_LINK : LOCAL_BASE_LINK;
  const href = `${link}${profileId}`;
  const isExternal = isVK;

  return (
     <a
        href={href}
        id={profileId}
        target={BASE_LINKS_OPTIONS.TARGET}
        className={BASE_LINKS_OPTIONS.CLASS_NAME}
        onClick={handleSelectedTd}
        {...(isExternal && { rel: 'noopener noreferrer' })}
     >
       {textContent}
     </a>
  );
};