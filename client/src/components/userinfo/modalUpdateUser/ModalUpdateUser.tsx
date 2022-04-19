import React, { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import './modalUpdateUser.scss';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slice/userSlice';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';

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

interface ModalUpdateUserProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalUpdateUser: FC<ModalUpdateUserProps> = ({ handleClose }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const initFormValue = {
    // avatar: currentUser?.avatar,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    bio: currentUser?.bio ? currentUser?.bio : '',
    dateOfBirth: currentUser?.dateOfBirth,
    city: currentUser?.city ? currentUser?.city : '',
    relationship: currentUser?.relationship ? currentUser?.relationship : 'Single',
    gender: currentUser?.gender,
    school: currentUser?.school ? currentUser.school : '',
  };
  const [formValue, setFormValue] = useState(initFormValue);

  const handleFormChange = (e: any) => {
    setFormValue((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(formValue);
  };
  return (
    <form className="modal-user" onSubmit={submitHandler}>
      <div className="modal-user-top">
        <h3>Edit profile</h3>
        <div onClick={() => handleClose(false)} style={{ cursor: 'pointer' }}>
          <Avatar>
            <CloseIcon />
          </Avatar>
        </div>
      </div>
      <hr />
      <div className="modal-user-edit">
        <div className="modal-user-edit-top">
          <h3>Profile Picture</h3>
          <label htmlFor="avatar">Add</label>
          <input type="file" multiple={false} id="avatar" hidden />
        </div>
        <Avatar
          src={currentUser?.avatar}
          sx={{ width: 140, height: 140 }}
          className="modal-edit-avatar"
        />
      </div>
      <div className="modal-user-edit">
        <div className="edit-bio">
          <h3>Bio</h3>
          <textarea
            name=""
            id=""
            cols={30}
            rows={5}
            placeholder="Let people know more about you..."
            value={formValue.bio}
            onChange={handleFormChange}
          ></textarea>
        </div>
      </div>
      <div className="modal-user-edit">
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
            >
              {relationshipOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
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
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default ModalUpdateUser;
