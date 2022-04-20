import GalleryImage from 'components/galleryImage/GalleryImage';
import withLayout from 'components/layout/Layout';
import RightBar from 'components/rightbar/Rightbar';
// import SkeletonLoading from 'components/SkeletonLoading';
import UserInfo from 'components/userinfo/UserInfo';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectPosts } from 'store/slice/postSlice';
import { selectCurrentUser } from 'store/slice/userSlice';
import './photopage.scss';

const PhotosPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserPosts = useAppSelector(selectPosts);
  const userPhotos = currentUserPosts
    .map((post) => post.assets!.map((asset) => asset.url))
    .flat(Infinity);
  return (
    <>
      <div className="photos">
        <div className="photos-wrapper">
          <UserInfo user={currentUser} />
          <GalleryImage images={userPhotos} />
        </div>
        <RightBar className="photos-rightbar" />
      </div>
    </>
  );
};

export default withLayout(PhotosPage);
