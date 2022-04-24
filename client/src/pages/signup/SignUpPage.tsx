import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { registerUser } from 'api/userApi';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import Notification from 'components/notification/Notification';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import yup from 'shared/yubGlobal';
import { SignUpFormData } from '../../shared/types';
import './SignUp.scss';

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

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpSchema),
  });
  const [error, SetError] = useState<string | null>(null);
  const [pending, SetPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      SetError(error.response.data);
    }
  };
  return (
    <>
      <div className="sign-up-page">
        <div className="sign-up-header">
          <h2>Sociala.</h2>
        </div>
        <form className="sign-up-main" onSubmit={handleSubmit(onSubmit)}>
          <h3>Create your account</h3>
          <div className="sign-up-input-wrapper">
            <div className="sign-up-input-item">
              <PersonOutlineOutlinedIcon />
              <input
                type="text"
                placeholder="First Name"
                autoComplete="off"
                {...register('firstName')}
              />
            </div>
            <div className="sign-up-input-item">
              <PersonOutlineOutlinedIcon />
              <input
                type="text"
                placeholder="Last Name"
                autoComplete="off"
                {...register('lastName')}
              />
            </div>
          </div>
          <div className="error-wrapper">
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            {errors.lastName && <p className="error error-1">{errors.lastName.message}</p>}
          </div>
          <div className="sign-up-input-item">
            <EmailOutlinedIcon />
            <input
              type="email"
              placeholder="Your Email Address"
              autoComplete="off"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}
          <div className="sign-up-input-item">
            <AccountCircleOutlinedIcon />
            <input
              type="text"
              placeholder="Your Username"
              autoComplete="off"
              {...register('username')}
            />
          </div>
          {errors.username && <p className="error">{errors.username.message}</p>}
          <div className="sign-up-input-item">
            <LockOutlinedIcon />
            <input
              type="password"
              placeholder="New Password"
              autoComplete="off"
              {...register('password')}
            />
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
          <label htmlFor="dateOfBirth">Date of birth</label>
          <div className="sign-up-input-item">
            <input
              type="date"
              placeholder="Your Birthday"
              id="dateOfBirth"
              autoComplete="off"
              {...register('dateOfBirth')}
            />
          </div>
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
          <label htmlFor="gender">Gender</label>
          <div className="input-gender-wrapper">
            <div className="input-gender">
              <span>Male</span>
              <input type="radio" value="Male" {...register('gender')} />
            </div>
            <div className="input-gender">
              <span>Female</span>
              <input type="radio" value="Female" {...register('gender')} />
            </div>
            <div className="input-gender">
              <span>Other</span>
              <input type="radio" value="Other" {...register('gender')} />
            </div>
          </div>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
          <button type="submit">Register</button>
          <div className="to-login">
            Already have account <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      {pending && <ProgressLoading />}
      {error && <Notification type="error" content={error} />}
    </>
  );
};

export default SignupPage;
