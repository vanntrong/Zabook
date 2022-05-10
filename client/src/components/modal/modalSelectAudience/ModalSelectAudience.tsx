import React, { FC } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

import './modalSelectAudience.scss';
import { Avatar } from '@mui/material';

interface ModalSelectAudienceProps {
  audience: 'public' | 'friends' | 'private';
  setAudience?: React.Dispatch<React.SetStateAction<'public' | 'friends' | 'private'>>;
  onChangeAudience?: (audience: string) => Promise<void>;
  onClose: () => void;
}

const ModalSelectAudience: FC<ModalSelectAudienceProps> = ({
  audience,
  setAudience,
  onClose,
  onChangeAudience,
}) => {
  return (
    <div className="modalSelectAudience">
      <div className="modalSelectAudience-top">
        <div onClick={onClose}>
          <Avatar className="modalSelectAudience-top-icon">
            <IoArrowBackOutline />
          </Avatar>
        </div>
        <h2>Select audience</h2>
      </div>
      <hr />
      <div className="modalSelectAudience-main">
        <h3>Who can see your post?</h3>
        <p>Your post will show up in Feed, on your profile and in search results.</p>
        <div className="modalSelectAudience-list">
          <div
            className={`modalSelectAudience-item ${audience === 'public' ? 'active' : ''}`}
            onClick={() => {
              if (setAudience) {
                setAudience('public');
              }
              if (onChangeAudience) {
                onChangeAudience('public');
              }
              onClose();
            }}
          >
            <div className="modalSelectAudience-item-icon-info">
              <Avatar className="modalSelectAudience-item-icon">
                <GiEarthAfricaEurope />
              </Avatar>
              <div className="modalSelectAudience-item-name-desc">
                <h4>Public</h4>
                <p>Anyone on or off Sociala.</p>
              </div>
            </div>
            <input type="checkbox" defaultChecked={audience === 'public'} />
          </div>
          <div
            className={`modalSelectAudience-item ${audience === 'friends' ? 'active' : ''}`}
            onClick={() => {
              if (setAudience) {
                setAudience('friends');
              }
              if (onChangeAudience) {
                onChangeAudience('friends');
              }
              onClose();
            }}
          >
            <div className="modalSelectAudience-item-icon-info">
              <Avatar className="modalSelectAudience-item-icon">
                <FaUserFriends />
              </Avatar>
              <div className="modalSelectAudience-item-name-desc">
                <h4>Friends</h4>
                <p>Your friends on Facebook</p>
              </div>
            </div>
            <input type="checkbox" defaultChecked={audience === 'friends'} />
          </div>
          <div
            className={`modalSelectAudience-item ${audience === 'private' ? 'active' : ''}`}
            onClick={() => {
              if (setAudience) {
                setAudience('private');
              }
              if (onChangeAudience) {
                onChangeAudience('private');
              }
              onClose();
            }}
          >
            <div className="modalSelectAudience-item-icon-info">
              <Avatar className="modalSelectAudience-item-icon">
                <BsFillShieldLockFill />
              </Avatar>
              <div className="modalSelectAudience-item-name-desc">
                <h4>Only me</h4>
              </div>
            </div>
            <input type="checkbox" defaultChecked={audience === 'private'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectAudience;
