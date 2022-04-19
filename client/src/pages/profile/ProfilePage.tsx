import InputPost from 'components/input/InputPost/InputPost';
import Navbar from 'components/navbar/Navbar';
import Post from 'components/post/Post';
import Sidebar from 'components/sidebar/Sidebar';
import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType, UserType } from 'shared/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import './profilepage.scss';
import { getPostsApi } from 'api/postApi';
import { getProfileOtherApi } from 'api/userApi';
import { selectPosts } from 'store/slice/postSlice';
import RightBar from 'components/rightbar/Rightbar';

const ProfilePage = () => {
  const [user, setUser] = React.useState<null | UserType>(null);
  const [posts, setPosts] = React.useState<PostType[] | null>(null);
  const [isFetchingPosts, setIsFetchingPosts] = React.useState<boolean>(true);
  const currentUserPosts = useAppSelector(selectPosts);

  const params = useParams();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getFriendProfile = async (username: string) => {
      const data: UserType = await getProfileOtherApi(username);
      setUser(data);
    };
    if (params.username !== currentUser?.username) {
      getFriendProfile(params.username as string);
    } else {
      setUser(currentUser);
    }
  }, [params.username, currentUser]);

  useEffect(() => {
    document.title = `${user?.firstName} ${user?.lastName} | Zabook`;
    const getPostsOfUser = async (id: string) => {
      const posts: [PostType] = await getPostsApi(id);
      setPosts(posts);
    };
    if (params.username !== currentUser?.username) {
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
      <Navbar />
      <Sidebar />
      <div className="profile">
        <div className="profile-wrapper">
          {user && <UserInfo user={user} />}
          <div className="post-wrapper">
            {/* <div className="post-item">
              <InputPost className="post-item__input" />
            </div> */}
            <div className="post-list">
              <h3 className="post-list__title">Publications</h3>
              <div className="post-list__wrapper">
                {isFetchingPosts && <SkeletonLoading type="post" />}
                {!isFetchingPosts &&
                  posts &&
                  posts.map(
                    (post: PostType) =>
                      user && (
                        <Post key={post._id} post={post} user={user} className="post-profile" />
                      )
                  )}
                {!isFetchingPosts && posts?.length === 0 && (
                  <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
                    This user has no posts yet
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
        <RightBar className="profile-rightbar" />
      </div>
    </>
  );
};

export default ProfilePage;
