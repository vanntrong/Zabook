import { yupResolver } from '@hookform/resolvers/yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ProgressLoading from 'components/loadings/progressLoading/ProgressLoading';
import Notification from 'components/notification/Notification';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import yup from 'shared/yubGlobal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectLogging, selectLoginError, userAction } from 'store/slice/userSlice';
import { LoginFormData } from '../../shared/types';
import './login.scss';

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

const Login = () => {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectLogging);
  const loginError = useAppSelector(selectLoginError);
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
    <div className="login-page">
      <div className="login-header">
        <h2>Sociala.</h2>
      </div>
      <div className="login-main">
        <h3>Login into your account</h3>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input-wrapper">
            <EmailOutlinedIcon />
            <input
              type="text"
              autoComplete="off"
              placeholder="Username or email address"
              {...register('emailOrUsername')}
            />
          </div>
          {errors.emailOrUsername && <p className="error">{errors.emailOrUsername.message}</p>}
          <div className="login-input-wrapper">
            <LockOutlinedIcon />
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}
          <div className="password-forgot">
            <p>Forgot your Password?</p>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="to-register">
          Dont have account <Link to="/register">Register</Link>
        </div>
      </div>
      {isLogging && <ProgressLoading />}
      {loginError && <Notification type="error" content={loginError} />}
    </div>
  );
};

export default Login;
