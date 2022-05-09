import { getOnePostApi } from 'api/postApi';
import withLayout from 'components/layout/Layout';
import Post from 'components/post/Post';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostType } from 'shared/types';

import './postViewPage.scss';

const PostViewPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        if (postId) {
          const res = await getOnePostApi(postId);
          setPost(res);
        }
      } catch (error) {
        navigate('/404');
      }
    };
    getPost();
  }, [postId, navigate]);

  return (
    <div className="postViewPage">
      <div className="mainWrapper">
        <div className="postViewPage-wrapper">{post && <Post post={post} />}</div>
      </div>
    </div>
  );
};

export default withLayout(PostViewPage);
