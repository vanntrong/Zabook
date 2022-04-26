import {
  createCommentApi,
  deleteCommentApi,
  getCommentsApi,
  updateCommentApi,
} from 'api/commentApi';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import React, { FC, useEffect, useState } from 'react';
import { commentType } from 'shared/types';
import Comment from './comment/Comment';
import './comments.scss';
import CreateComment from './createComment/CreateComment';

interface CommentsProps {
  postId: string;
  onDeleteComment: () => void;
  onAddComment: () => void;
}

export const Comments: FC<CommentsProps> = React.memo(
  ({ postId, onDeleteComment, onAddComment }) => {
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
    }, [postId, limit, onAddComment]);

    const handleSubmit = async (data: any) => {
      const res = await createCommentApi(postId, data);
      setComments([...comments, res]);

      // call this function to update comment count
      onAddComment();
    };

    const handleChangeComment = async (id: string, data: { content: string }) => {
      const res = await updateCommentApi(id, data);
      setComments((prev) => prev.map((comment) => (comment._id !== id ? comment : res)));
    };

    const loadMore = () => {
      setLimit(limit + 10);
    };

    const deleteCommentHandler = async (id: string) => {
      try {
        await deleteCommentApi(id);
        setComments((prev) => prev.filter((comment) => comment._id !== id));

        // call this function to update comment count
        onDeleteComment();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    return (
      <div className="comments">
        <CreateComment postId={postId} onSubmit={handleSubmit} />
        {isLoadingComment && <SkeletonLoading type="info" />}
        {!isLoadingComment &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              comment={comment}
              onSubmit={handleChangeComment}
              onDeleteComment={deleteCommentHandler}
              key={comment._id}
            />
          ))}
        {!isLoadingComment && comments.length === 0 && <p className="no-comment">No comments</p>}
        <p className="view-more-comment" onClick={loadMore}>
          View more comments
        </p>
      </div>
    );
  }
);
