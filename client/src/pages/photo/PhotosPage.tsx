import { getProfileOtherApi } from 'api/userApi';
import GalleryImage from 'components/galleryImage/GalleryImage';
import withLayout from 'components/layout/Layout';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
// import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import useFetchPosts from 'hooks/useFetchPosts';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './photopage.scss';

const PhotosPage = () => {
  const [user, setUser] = useState<null | UserType>(null);
  const [page, setPage] = useState<number>(0);
  const { posts, hasMore, isFetchingPosts } = useFetchPosts(page, user);
  const currentUser = useAppSelector(selectCurrentUser);
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
  }, [user?.firstName, user?.lastName]);
  return (
    <>
      {!user ? (
        <SimpleLoading />
      ) : (
        <div className="photos">
          <div className="mainWrapper">
            <InfiniteScroll
              dataLength={posts.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={hasMore}
              loader={
                <div style={{ marginTop: '10px' }}>
                  <SkeletonLoading type="post" />{' '}
                </div>
              }
              endMessage={
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              style={{ overflow: 'hidden' }}
            >
              <div className="photos-wrapper">
                <UserInfo user={user} />
                <GalleryImage images={userPhotos} />
                {isFetchingPosts && <SkeletonLoading type="post" />}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
};

export default withLayout(PhotosPage);
