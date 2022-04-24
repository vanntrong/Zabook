import { createCommentApi, getCommentsApi, updateCommentApi } from 'api/commentApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { FC, useEffect, useState } from 'react';
import { commentType } from 'shared/types';
import Comment from './comment/Comment';

import './comments.scss';
import CreateComment from './createComment/CreateComment';

interface CommentsProps {
  postId: string;
}

export const Comments: FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<commentType[]>([]);
  const [limit, setLimit] = useState<number>(2);
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  useEffect(() => {
    const getCommentsPost = async () => {
      setIsLoadingComment(true);
      const params = {
        limit,
      };
      const res = await getCommentsApi(postId, params);
      if (res.length === 0) {
        setIsLoadingComment(false);
        return;
      }
      setComments(res);
      setIsLoadingComment(false);
    };
    getCommentsPost();
  }, [postId, limit]);

  const handleSubmit = async (data: any) => {
    const res = await createCommentApi(postId, data);
    setComments([...comments, res]);
  };

  const handleChangeComment = async (id: string, data: { content: string }) => {
    const res = await updateCommentApi(id, data);
    setComments((prev) => prev.map((comment) => (comment._id !== id ? comment : res)));
  };

  const loadMore = () => {
    setLimit(limit + 10);
  };
  return (
    <div className="comments">
      <CreateComment postId={postId} onSubmit={handleSubmit} />
      {isLoadingComment && (
        <p className="no-comment">
          <SkeletonLoading type="info" />
        </p>
      )}
      {!isLoadingComment &&
        comments.length > 0 &&
        comments.map((comment) => (
          <Comment comment={comment} onSubmit={handleChangeComment} key={comment._id} />
        ))}
      {!isLoadingComment && comments.length === 0 && <p className="no-comment">No comments</p>}
      <p className="view-more-comment" onClick={loadMore}>
        View more comments
      </p>
    </div>
  );
};
