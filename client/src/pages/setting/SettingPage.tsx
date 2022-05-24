import { Avatar, MenuItem, TextField } from '@mui/material';
import { changePasswordApi } from 'api/userApi';
import withLayout from 'components/layout/Layout';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserFormType } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectTheme } from 'store/slice/themeSlice';
import { selectCurrentUser, selectLogging, userAction } from 'store/slice/userSlice';
import './settingPage.scss';
import { toast } from 'react-toastify';

const relationshipOptions = [
  {
    value: 'Single',
  },
  {
    value: 'Date',
  },
  {
    value: 'Married',
  },
];

const genderOptions = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  },
  {
    value: 'Other',
  },
];

const SettingPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isDarkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const initFormValue: updateUserFormType = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    bio: currentUser?.bio ? currentUser?.bio : '',
    dateOfBirth: currentUser?.dateOfBirth ? currentUser?.dateOfBirth : '',
    city: currentUser?.city ? currentUser?.city : '',
    relationship: currentUser?.relationship ? currentUser?.relationship : 'Single',
    gender: currentUser?.gender,
    school: currentUser?.school ? currentUser.school : '',
    work: currentUser?.work ? currentUser.work : '',
  };
  const [formValue, setFormValue] = useState(initFormValue);
  const [avatar, setAvatar] = useState<any>();
  const [isSelectChangePassword, setIsSelectChangePassword] = useState(false);
  const [formChangePassword, setFormChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorWhenChangePassword, setErrorWhenChangePassword] = useState({
    isError: false,
    message: '',
  });
  const updatePending = useAppSelector(selectLogging);
  const navigate = useNavigate();
  const handleFormChange = (e: any) => {
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleFormChangePassword = (e: any) => {
    setFormChangePassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setErrorWhenChangePassword({
      isError: false,
      message: '',
    });
  };

  const changeAvatarHandler = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (avatar) {
      formValue.avatar = avatar;
    }
    const updatePayload = {
      userUpdated: formValue,
      id: currentUser!._id,
    };
    dispatch(userAction.updateUserRequest(updatePayload));
    const timer = setTimeout(() => {
      navigate('/');
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  const submitChangePasswordHandler = async (e: any) => {
    e.preventDefault();
    if (
      formChangePassword.oldPassword.trim().length < 6 ||
      formChangePassword.newPassword.trim().length < 6 ||
      formChangePassword.confirmNewPassword.trim().length < 6
    ) {
      setErrorWhenChangePassword({
        isError: true,
        message: 'Password must be at least 6 characters',
      });
      return;
    }
    if (formChangePassword.newPassword !== formChangePassword.confirmNewPassword) {
      setErrorWhenChangePassword({
        isError: true,
        message: 'Confirm password is not match',
      });
      return;
    }
    try {
      const res = await changePasswordApi({
        id: currentUser!._id,
        oldPassword: formChangePassword.oldPassword,
        newPassword: formChangePassword.newPassword,
      });
      if (res) {
        toast.success('Change password successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className={`setting ${isDarkMode ? 'dark' : ''}`}>
        <div className="mainWrapper">
          <div className="setting-wrapper">
            <div
              className={`setting-tab-header ${!isSelectChangePassword ? 'active' : ''}`}
              onClick={() => setIsSelectChangePassword(false)}
            >
              <h2>Edit profile</h2>
            </div>
            <div
              className={`setting-tab-header ${isSelectChangePassword ? 'active' : ''}`}
              onClick={() => setIsSelectChangePassword(true)}
            >
              <h2>Change password</h2>
            </div>

            {!isSelectChangePassword && (
              <form className="setting-user" onSubmit={submitHandler}>
                <div className="setting-user-edit">
                  <div className="setting-user-edit-top">
                    <h3>Profile Picture</h3>
                    <label htmlFor="avatar">Add</label>
                    <input
                      type="file"
                      multiple={false}
                      id="avatar"
                      hidden
                      onChange={changeAvatarHandler}
                    />
                  </div>
                  <Avatar
                    src={avatar ? avatar : currentUser?.avatar}
                    sx={{ width: 140, height: 140 }}
                    className="setting-edit-avatar"
                  />
                </div>
                <div className="setting-user-edit">
                  <div className="edit-bio">
                    <h3>Bio</h3>
                    <textarea
                      name="bio"
                      id=""
                      cols={30}
                      rows={5}
                      placeholder="Let people know more about you..."
                      value={formValue.bio}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>
                </div>
                <div className="setting-user-edit">
                  <div>
                    <h3>Customize your intro</h3>
                    <div className="edit-intro">
                      <label htmlFor="firstName">First name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formValue.firstName}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="lastName">Last name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formValue.lastName}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="dateOfBirth">Date of birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="Date of birth"
                        value={formValue.dateOfBirth}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formValue.city}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="work">Work</label>
                      <input
                        type="text"
                        id="work"
                        name="work"
                        placeholder="Work"
                        value={formValue.work}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="school">School</label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        placeholder="School"
                        value={formValue.school}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="edit-intro">
                      <label>Relationship</label>
                      <TextField
                        id="outlined-select-currency"
                        select
                        value={formValue.relationship}
                        onChange={handleFormChange}
                        className="input-select"
                        name="relationship"
                      >
                        {relationshipOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value} className="form-select">
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="edit-intro">
                      <label>Gender</label>
                      <TextField
                        id="outlined-select-currency"
                        select
                        value={formValue.gender}
                        onChange={handleFormChange}
                        className="input-select"
                        name="gender"
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value} className="form-select">
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '0 10px' }}
                >
                  <button type="button" className="edit-button cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="edit-button">
                    Save
                  </button>
                </div>
              </form>
            )}

            {isSelectChangePassword && (
              <form className="setting-user" onSubmit={submitChangePasswordHandler}>
                <div className="setting-user-edit">
                  <div>
                    <div className="edit-intro">
                      <label htmlFor="oldPassword">Old Password</label>
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Old password"
                        value={formChangePassword.oldPassword}
                        onChange={handleFormChangePassword}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={formChangePassword.newPassword}
                        onChange={handleFormChangePassword}
                      />
                    </div>
                    <div className="edit-intro">
                      <label htmlFor="confirmNewPassword">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={formChangePassword.confirmNewPassword}
                        onChange={handleFormChangePassword}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '0 10px' }}
                >
                  <button type="button" className="edit-button cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="edit-button">
                    Change
                  </button>
                </div>
                {errorWhenChangePassword && (
                  <p className="error-message">{errorWhenChangePassword.message}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      {updatePending && <ProgressLoading />}
    </>
  );
};

export default withLayout(SettingPage);
