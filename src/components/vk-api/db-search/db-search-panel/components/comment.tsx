/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import './panel.css';
import { useVkApiContext } from '../../../vk-api-context';
import { useApiVKService } from '../../../../../service-api/service-api';
import { TComment } from '../../../vk-lib/vk-models';
import { usePopups } from '../../../../pop-ups/popups-hooks';
import { POPUP_MESSAGES } from '../../../../pop-ups/popup-contants';

export const Comment = () => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [comment, setComment] = React.useState<TComment | null>(null);
  const [newComment, setNewComment] = React.useState('');
  const [isUpdated, setIsUpdated] = React.useState(false);
  const context = useVkApiContext();
  const { getCommentByProfileId, insertUpdatePostByVkId } = useApiVKService();
  const { setShowMessagePopUp, setShowErrorPopUp } = usePopups();
  const { profileCheckForm: { idSearchParameter, profileInDb } } = context;
  const handleEditButton = () => {
    const value = !isDisabled;
    setIsDisabled(value);
  };
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleUpdateComment = async () => {
    if (comment) {
      const response = await insertUpdatePostByVkId({
        id: comment.id,
        text: newComment,
      });
      console.log('Comment handleUpdateComment', {
        response,
      });
      setIsUpdated(true);
      setIsDisabled(true);
      if (response.isSuccess) {
        setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_COMMENT_UPDATE);
      } else {
        setShowErrorPopUp(POPUP_MESSAGES.ERROR_COMMENT_UPDATE);
      }
    } else {
      if (idSearchParameter) {
        const response = await insertUpdatePostByVkId({
          id: idSearchParameter,
          text: newComment,
        });
        console.log('Comment handleUpdateComment', {
          response,
        });
        setIsUpdated(true);
        setIsDisabled(true);
        if (response.isSuccess) {
          setShowMessagePopUp(POPUP_MESSAGES.SUCCESS_COMMENT_UPDATE);
        } else {
          setShowErrorPopUp(POPUP_MESSAGES.ERROR_COMMENT_UPDATE);
        }
      }
    }
  };

  React.useEffect(
    () => {
      if (isUpdated && idSearchParameter) {
        getCommentByProfileId(idSearchParameter)
          .then(
            (commentData) => {
              setComment(commentData);
              if (commentData.text) {
                setNewComment(commentData.text);
              }
              setIsUpdated(false);
            },
          );
      }
    }, [isUpdated],
  );

  React.useEffect(
    () => {
      if (idSearchParameter) {
        getCommentByProfileId(idSearchParameter)
          .then(
            (commentData) => {
              setComment(commentData);
              if (commentData?.text) {
                setNewComment(commentData.text);
              }
            },
          );
      }
    }, [idSearchParameter],
  );

  return profileInDb && (
     <div className={'comment-vk'}>
       {comment && <span>Дата создания комментария: {comment.creation_date as string}</span>}
       {comment && <span>Дата обновления комментария: {comment.change_date as string}</span>}
       <label style={{ marginTop: '10px' }} htmlFor={'comment'}>Комментарий для ID: {idSearchParameter}</label>
       <textarea
          onChange={(e) => handleChangeComment(e)}
          id={'comment'}
          className={isDisabled ? 'comment-text-disabled' : 'comment-text'}
          value={isDisabled ? comment?.text ?? '' : newComment}
       >
       </textarea>
       <button
          style={{
            width: '150px',
          }}
          disabled={isDisabled}
          onClick={() => handleUpdateComment()}
       >
         Записать
       </button>
       <button
          style={{
            width: '150px',
            marginTop: '5px',
          }}
          onClick={handleEditButton}
       >
         Редактировать
       </button>
     </div>
  );
};