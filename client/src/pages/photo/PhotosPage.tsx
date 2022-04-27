import { getPostsApi } from 'api/postApi';
import { getProfileOtherApi } from 'api/userApi';
import GalleryImage from 'components/galleryImage/GalleryImage';
import withLayout from 'components/layout/Layout';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
// import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostType, UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import './photopage.scss';

const PhotosPage = () => {
  const [user, setUser] = useState<null | UserType>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserPosts = useAppSelector(selectPosts);
  const navigate = useNavigate();
  const params = useParams();
  const userPhotos = posts.map((post) => post.assets!.map((asset) => asset.url)).flat(Infinity);

  useEffect(() => {
    const getFriendProfile = async (username: string) => {
      try {
        const data: UserType = await getProfileOtherApi(username);
        setUser(data);
      } catch (error) {
        navigate('/404');
      }
    };
    // if currentUser different from params.username then we are in friend profile then get friend profile
    // else get current user profile from store
    if (params.username !== currentUser?.username) {
      getFriendProfile(params.username as string);
    } else {
      setUser(currentUser);
    }
  }, [params.username, currentUser, navigate]);

  useEffect(() => {
    document.title = `${user?.firstName} ${user?.lastName} | Zabook`;
    const getPostsOfUser = async (id: string) => {
      const posts: [PostType] = await getPostsApi(id);
      setPosts(posts);
    };
    // if currentUser different from params.username then we are in friend profile then get friend posts
    // else get current user posts from store
    if (params.username !== currentUser?.username) {
      if (!user) {
        return;
      }
      getPostsOfUser(user?._id as string);
    } else {
      setPosts(currentUserPosts);
    }
    const timer = setTimeout(() => {
      // setIsFetchingPosts(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, currentUser, currentUserPosts, params.username]);
  return (
    <>
      {!user ? (
        <SimpleLoading />
      ) : (
        <div className="photos">
          <div className="mainWrapper">
            <div className="photos-wrapper">
              <UserInfo user={user} />
              <GalleryImage images={userPhotos} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withLayout(PhotosPage);
