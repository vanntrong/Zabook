import { getProfileOtherApi } from 'api/userApi';
import withLayout from 'components/layout/Layout';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';
import ImagePlayer from 'components/player/imagePlayer/ImagePlayer';
import CreatePost from 'components/post/createPost/CreatePost';
import Post from 'components/post/Post';
import UserInfo from 'components/userinfo/UserInfo';
import useFetchPosts from 'hooks/useFetchPosts';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { GrCaretNext } from 'react-icons/gr';
import { IoPersonOutline, IoSchoolOutline } from 'react-icons/io5';
import { MdOutlineCake, MdWorkOutline } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import './profilepage.scss';

const ProfilePage = () => {
  const [user, setUser] = useState<null | UserType>(null);
  const [page, setPage] = useState<number>(0);
  const isDarkMode = useAppSelector(selectTheme);
  const limit = 30;
  const { posts, setPosts, hasMore, isFetchingPosts } = useFetchPosts(page, user, limit);
  const navigate = useNavigate();

  const params = useParams();
  const currentUser = useAppSelector(selectCurrentUser);

  const maxLengthPhotoPost = 10;

  const userPhotos = posts
    .filter((post, index) => index < maxLengthPhotoPost)
    .map((post) => post.assets!.map((asset) => asset.media_type === 'image' && asset.url))
    .flat(Infinity);

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
    document.title = `${user?.firstName} ${user?.lastName} | Sociala.`;
  }, [user?.firstName, user?.lastName]);

  return (
    <>
      {!user ? (
        <SimpleLoading />
      ) : (
        <div className={`profilePage ${isDarkMode ? 'dark' : ''}`}>
          <div className="mainWrapper">
            <UserInfo user={user} />
            <div className="profile-laptop-wrapper">
              <div style={{ flex: '2' }}>
                <div className="profile-about">
                  <h2>About</h2>
                  <div className="profile-bio">
                    <p>{user && user.bio ? user.bio : 'No bio yet'}</p>
                  </div>
                  <hr />
                  <div className="profile-info-list">
                    {user!.dateOfBirth && (
                      <div className="profile-info-item">
                        <MdOutlineCake />
                        <span>{moment(user!.dateOfBirth).format('DD/MM/YYYY')}</span>
                      </div>
                    )}

                    {user!.school && (
                      <div className="profile-info-item">
                        <IoSchoolOutline />
                        <span>{user!.school}</span>
                      </div>
                    )}

                    {user!.city && (
                      <div className="profile-info-item">
                        <GoLocation />
                        <span>{user!.city}</span>
                      </div>
                    )}

                    {user!.work && (
                      <div className="profile-info-item">
                        <MdWorkOutline />
                        <span>{user!.work}</span>
                      </div>
                    )}

                    {user!.relationship && (
                      <div className="profile-info-item">
                        <IoPersonOutline />
                        <span>{user?.relationship}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-preview-photos">
                  <div className="profile-preview-photos-title">
                    <h2>Photos</h2>
                    <Link to={`/${user?.username}/photos`}>
                      <span>See all</span>
                    </Link>
                  </div>
                  <div className="profile-preview-photos-list">
                    {userPhotos.length > 0 ? (
                      userPhotos.map((photo, index) => (
                        <div className="profile-preview-photos-item" key={index}>
                          {photo && <ImagePlayer src={photo as string} />}
                        </div>
                      ))
                    ) : (
                      <p>No Photos</p>
                    )}
                  </div>
                  <Link to={`/${user?.username}/photos`} className="profile-preview-photos-button">
                    <GrCaretNext />
                    <span>More</span>
                  </Link>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px 0', flex: '3' }}>
                {params.username === currentUser?.username && <CreatePost setPosts={setPosts} />}
                <InfiniteScroll
                  dataLength={posts.length}
                  hasMore={hasMore}
                  next={() => setPage((prev) => prev + 1)}
                  loader={
                    <div style={{ marginTop: '10px' }}>
                      <SkeletonLoading type="post" />{' '}
                    </div>
                  }
                  style={{ overflow: 'hidden' }}
                >
                  <div className="profile-post-list">
                    {isFetchingPosts && <SkeletonLoading type="post" />}
                    {!isFetchingPosts &&
                      posts!.length > 0 &&
                      posts?.map((post) => <Post key={post._id} post={post} setPosts={setPosts} />)}
                    {!hasMore && (
                      <p style={{ textAlign: 'center', marginTop: '10px' }}>
                        Yay! You have seen it all
                      </p>
                    )}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withLayout(ProfilePage);
