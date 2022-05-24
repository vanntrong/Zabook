import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { requestForgotPasswordApi, resetPasswordApi } from 'api/userApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [isSendRequest, setIsSendRequest] = useState(false);

  const sendRequestSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await requestForgotPasswordApi(email);
      if (res) {
        setIsSendRequest(true);
        toast.success('Check your email to reset password', {});
      }
    } catch (error) {
      toast.error(error.response.data, {});
    }
  };

  const resetPasswordSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await resetPasswordApi({ email, newPassword, code });
      if (res) {
        toast.success('Reset password success', {});
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data, {});
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h2>Sociala.</h2>
      </div>
      <div className="login-main">
        <h3>Reset password</h3>
        {!isSendRequest && (
          <form className="login-form" onSubmit={sendRequestSubmit}>
            <div className="login-input-wrapper">
              <EmailOutlinedIcon />
              <input
                type="email"
                autoComplete="off"
                placeholder="Your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Send</button>
          </form>
        )}

        {isSendRequest && (
          <form className="login-form" onSubmit={resetPasswordSubmit}>
            <div className="login-input-wrapper">
              <LockOutlinedIcon />
              <input
                type="password"
                autoComplete="off"
                required
                minLength={6}
                placeholder="Your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="login-input-wrapper">
              <VpnKeyIcon />
              <input
                type="string"
                autoComplete="off"
                placeholder="Your code"
                required
                minLength={6}
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        )}
        <div className="to-register">
          Go back to <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
