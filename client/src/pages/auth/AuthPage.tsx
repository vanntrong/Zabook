import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import { registerUser } from 'api/userApi';
import Backdrop from 'components/Backdrop';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import yup from 'shared/yubGlobal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectLogging, userAction } from 'store/slice/userSlice';
import { LoginFormData, SignUpFormData } from '../../shared/types';
import './authpage.scss';

interface SignUpFormProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpSchema = yup.object().shape({
  firstName: yup.string().required('What is your first name?'),
  lastName: yup.string().required('What is your last name?'),
  email: yup.string().required('What is your email?').email('Email is not valid'),
  username: yup
    .string()
    .required('What is your username?')
    .min(6, 'Username must be at least 6 characters'),
  password: yup
    .string()
    .required('What is your password?')
    .min(6, 'Password must be at least 6 characters'),
  dateOfBirth: yup.string().required('What is your date of birth?'),
  gender: yup.string().required('What is your gender?').nullable(),
});

const LoginSchema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required('What is your email or username?')
    .min(6, 'Email or Username must be at least 6 characters'),
  password: yup
    .string()
    .required('What is your password?')
    .min(6, 'Password must be at least 6 characters'),
});

const SignUpForm: FC<SignUpFormProps> = ({ setIsShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);
      setIsShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-up">
      <div
        style={{
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 className="sign-up__title">Sign Up</h2>
          <p className="sign-up__desc">It's quick and easy</p>
        </div>
        <div onClick={() => setIsShow((pre) => !pre)}>
          <CloseIcon className="sign-up__icon" />
        </div>
      </div>
      <hr className="sign-up__hr" />
      <form style={{ padding: '0 20px', marginTop: '15px' }} onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-up-name">
          <input
            type="text"
            placeholder="First name"
            autoComplete="off"
            {...register('firstName')}
          />
          <input type="text" placeholder="Last name" autoComplete="off" {...register('lastName')} />
        </div>
        <div className="error-wrapper">
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          {errors.lastName && <p className="error error-1">{errors.lastName.message}</p>}
        </div>
        <div className="sign-up__input">
          <input
            type="email"
            placeholder="Email address"
            autoComplete="off"
            {...register('email')}
          />
        </div>
        {errors.email && <p className="error">{errors.email.message}</p>}
        <div className="sign-up__input">
          <input type="text" placeholder="Username" autoComplete="off" {...register('username')} />
        </div>
        {errors.username && <p className="error">{errors.username.message}</p>}
        <div className="sign-up__input">
          <input
            type="password"
            placeholder="New password"
            autoComplete="off"
            {...register('password')}
          />
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
        <h4 className="sign-up__label">Date of birth</h4>
        <div className="sign-up__birth">
          <input
            type="date"
            placeholder="Date of birth"
            autoComplete="off"
            {...register('dateOfBirth')}
          />
        </div>
        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
        <h4 className="sign-up__label">Gender</h4>
        <div className="sign-up__gender">
          <div className="gender-box">
            <label htmlFor="male">Male</label>
            <input type="radio" value="Male" id="male" {...register('gender')} />
          </div>
          <div className="gender-box">
            <label htmlFor="female">Male</label>
            <input type="radio" value="Female" id="female" {...register('gender')} />
          </div>
          <div className="gender-box">
            <label htmlFor="other">Other</label>
            <input type="radio" value="Other" id="other" {...register('gender')} />
          </div>
        </div>
        {errors.gender && <p className="error">{errors.gender.message}</p>}
        <button className="sign-up__button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const AuthPage = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectLogging);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(userAction.loginUserRequest(data));
  };
  return (
    <>
      <div className="auth">
        <div className="auth-logo">
          <h1>facebook</h1>
          <p>Facebook helps you connect and share with the people in your life.</p>
        </div>
        <div className="auth-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-form__input">
              <input
                type="text"
                autoComplete="off"
                placeholder="Username or email address"
                {...register('emailOrUsername')}
              />
            </div>
            {errors.emailOrUsername && <p className="error">{errors.emailOrUsername.message}</p>}
            <div className="auth-form__input">
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
            <button type="submit" className="auth-form__button">
              {isLogging && <CircularProgress size="20px" color="primary" />}
              Log In
            </button>
            <Link to="/login/forgot" className="button-forgot">
              Forgotten password?
            </Link>
            <hr className="auth-hr" />
            <button className="showSignUp" onClick={() => setIsShowModal(true)} type="button">
              Create New Account
            </button>
          </form>
        </div>
      </div>
      <Backdrop isShow={isShowModal} setIsShow={setIsShowModal} color="#fff" opacity={0.7} />
      {isShowModal && <SignUpForm setIsShow={setIsShowModal} />}
    </>
  );
};

export default AuthPage;
