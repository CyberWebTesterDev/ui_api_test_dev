import * as React from 'react';
import './history-comments.css';
import { HistoryComment } from './history-comment';
import { useVkApiContext } from '../../../../vk-api-context';

type THistoryComments = {
  isOpen: boolean;
  handleCloseButton: (bool: boolean) => void;
};

export const HistoryComments = ({
  isOpen,
  handleCloseButton,
}: THistoryComments) => {
  const { profileCheckForm: { historyComments } } = useVkApiContext();

  const historyCommentsBlock = React.useMemo(
    () => {
      if (historyComments) {
        return historyComments.map(
          (hc) => <HistoryComment historyComment={hc} />,
        );
      }
      return <h2>Исторических комментариев нет</h2>;
    }, [historyComments],
  );

  const labelHistoryComments = React.useMemo(
    () => {
      if (historyComments?.length === 0) {
        return 'Исторических комментариев нет';
      }
      return 'История комментариев';
    }, [historyComments],
  );

  return isOpen ? (
     <>
       <div className={'dimmer-block'}>
       </div>
       <div className={'history-block'}>
         <div onClick={() => handleCloseButton(!isOpen)} className={'close-sign'}>&#10060;</div>
         <span className={'comment-label'}>{labelHistoryComments}</span>
         {historyCommentsBlock}
       </div>
     </>
  ) : null;
};