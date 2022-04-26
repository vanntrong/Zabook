import { getPostsApi } from 'api/postApi';
import { getProfileOtherApi } from 'api/userApi';
import withLayout from 'components/layout/Layout';
import CreatePost from 'components/post/createPost/CreatePost';
import Post from 'components/post/Post';
import UserInfo from 'components/userinfo/UserInfo';
import React, { useEffect } from 'react';
import { GoLocation } from 'react-icons/go';
import { GrCaretNext } from 'react-icons/gr';
import { IoPersonOutline, IoSchoolOutline } from 'react-icons/io5';
import { MdOutlineCake, MdWorkOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostType, UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import moment from 'moment';
import './profilepage.scss';
import SimpleLoading from 'components/loadings/simpleLoading/SimpleLoading';
import SkeletonLoading from 'components/loadings/skeletonLoading/SkeletonLoading';

const ProfilePage = () => {
  const [user, setUser] = React.useState<null | UserType>(null);
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = React.useState<boolean>(true);
  const currentUserPosts = useAppSelector(selectPosts);
  const navigate = useNavigate();

  const params = useParams();
  const currentUser = useAppSelector(selectCurrentUser);

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
      setIsFetchingPosts(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, currentUser, currentUserPosts, params.username]);
  return (
    <>
      {!user ? (
        <SimpleLoading />
      ) : (
        <div className="mainWrapper">
          <div className="profilePage">
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
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-2.jpg" alt="" />
                    </div>
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-3.jpg" alt="" />
                    </div>
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-4.jpg" alt="" />
                    </div>
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-5.jpg" alt="" />
                    </div>
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-2.jpg" alt="" />
                    </div>
                    <div className="profile-preview-photos-item">
                      <img src="http://uitheme.net/sociala/images/e-1.jpg" alt="" />
                    </div>
                  </div>
                  <Link to={`/${user?.username}/photos`} className="profile-preview-photos-button">
                    <GrCaretNext />
                    <span>More</span>
                  </Link>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px 0', flex: '3' }}>
                {params.username === currentUser?.username && <CreatePost />}
                <div className="profile-post-list">
                  {isFetchingPosts && <SkeletonLoading type="post" />}
                  {!isFetchingPosts &&
                    posts!.length > 0 &&
                    posts?.map((post) => <Post key={post._id} post={post} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withLayout(ProfilePage);
