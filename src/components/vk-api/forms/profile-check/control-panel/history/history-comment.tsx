import * as React from 'react';
import { THistoryComment } from '../../../../vk-lib/vk-models';

type THistoryCommentProps = {
  historyComment: THistoryComment;
}

export const HistoryComment = ({ historyComment }: THistoryCommentProps) => {

  return (
     <div className={'history-comment'}>
       <div className={'comment-date'}>{historyComment.creation_date}</div>
       <div className={'comment-text-history'}>
         {historyComment.text}
       </div>
     </div>
  );
};