import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { registerUser } from 'api/userApi';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import yup from 'shared/yubGlobal';
import { SignUpFormData } from '../../shared/types';
import './SignUp.scss';

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('What is your first name?')
    .trim('The first name must not contain spaces')
    .min(2, 'The first name must be at least 2 characters long')
    .max(40, 'The first name must be less than 40 characters long'),
  lastName: yup
    .string()
    .required('What is your last name?')
    .trim('The last name must not contain spaces')
    .min(2, 'The last name must be at least 2 characters long')
    .max(40, 'The last name must be less than 40 characters long'),
  email: yup
    .string()
    .required('What is your email?')
    .email('Email is not valid')
    .trim('The email must not contain spaces'),
  username: yup
    .string()
    .required('What is your username?')
    .trim('The username must not contain spaces')
    .min(6, 'Username must be at least 6 characters'),
  password: yup
    .string()
    .required('What is your password?')
    .trim('The password must not contain spaces')
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
  const [pending, SetPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      SetPending(true);
      await registerUser(data);
      toast.success("You're successfully registered!", {});
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data, {});
    }
    SetPending(false);
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
            <label className="sign-up-input-item" htmlFor="firstName">
              <PersonOutlineOutlinedIcon />
              <input
                type="text"
                placeholder="First Name"
                autoComplete="off"
                id="firstName"
                {...register('firstName')}
              />
            </label>
            <label className="sign-up-input-item" htmlFor="lastName">
              <PersonOutlineOutlinedIcon />
              <input
                type="text"
                placeholder="Last Name"
                autoComplete="off"
                id="lastName"
                {...register('lastName')}
              />
            </label>
          </div>
          <div className="error-wrapper">
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            {errors.lastName && <p className="error error-1">{errors.lastName.message}</p>}
          </div>
          <label className="sign-up-input-item" htmlFor="email">
            <EmailOutlinedIcon />
            <input
              type="email"
              placeholder="Your Email Address"
              autoComplete="off"
              id="email"
              {...register('email')}
            />
          </label>
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label className="sign-up-input-item" htmlFor="username">
            <AccountCircleOutlinedIcon />
            <input
              type="text"
              placeholder="Your Username"
              autoComplete="off"
              id="username"
              {...register('username')}
            />
          </label>
          {errors.username && <p className="error">{errors.username.message}</p>}
          <label className="sign-up-input-item" htmlFor="password">
            <LockOutlinedIcon />
            <input
              type="password"
              placeholder="New Password"
              autoComplete="off"
              id="password"
              {...register('password')}
            />
          </label>
          {errors.password && <p className="error">{errors.password.message}</p>}
          <label htmlFor="dateOfBirth">Date of birth</label>
          <label className="sign-up-input-item" htmlFor="dateOfBirth">
            <input
              type="date"
              placeholder="Your Birthday"
              id="dateOfBirth"
              autoComplete="off"
              {...register('dateOfBirth')}
            />
          </label>
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
    </>
  );
};

export default SignupPage;
