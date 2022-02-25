import { LoginForm } from '@src/interfaces';
import { axios } from '@src/libs';
import qs from 'qs';
import { useEffect } from 'react';
import { Router, useNavigate } from 'react-router-dom';

type Middleware = 'guest' | 'auth';

type UseAuthProps = {
  middleware?: Middleware;
  redirectIfAuthenticated?: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps) => {
  const navigate = useNavigate();
  // const register = async ({ setErrors, ...props }) => {
  //   setErrors([])

  //   axios
  //     .post('/register', props)
  //     .then(() => {})
  //     .catch((error) => {
  //       if (error.response.status !== 422) throw error

  //       setErrors(Object.values(error.response.data.errors).flat())
  //     })
  // }

  const login = async (props: LoginForm) => {
    axios
      .post(
        '/VbesAplication/oauth/token',
        qs.stringify({
          username: 'josedaniel9839@gmail.com',
          password: '12345678',
          grant_type: 'password',
        }),
        {
          auth: {
            username: 'cliente',
            password: 'password',
          },
        }
      )
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status !== 422) throw error

        // setErrors(Object.values(error.response.data.errors).flat())
      });
  };

  // const forgotPassword = async ({ setErrors, setStatus, email }) => {
  //   setErrors([])
  //   setStatus(null)

  //   axios
  //     .post('/forgot-password', { email })
  //     .then((response) => setStatus(response.data.status))
  //     .catch((error) => {
  //       if (error.response.status !== 422) throw error

  //       setErrors(Object.values(error.response.data.errors).flat())
  //     })
  // }

  // const resetPassword = async ({ setErrors, setStatus, ...props }) => {
  //   setErrors([])
  //   setStatus(null)

  //   axios
  //     .post('/reset-password', { token: router.query.token, ...props })
  //     .then((response) =>
  //       router.push('/login?reset=' + btoa(response.data.status))
  //     )
  //     .catch((error) => {
  //       if (error.response.status != 422) throw error

  //       setErrors(Object.values(error.response.data.errors).flat())
  //     })
  // }

  // const resendEmailVerification = ({ setStatus }) => {
  //   axios
  //     .post('/email/verification-notification')
  //     .then((response) => setStatus(response.data.status))
  // }

  // const logout = async () => {
  //   if (!error) {
  //     await axios.post('/logout')
  //   }

  //   window.location.pathname = '/login'
  // }

  // useEffect(() => {
  //   if (middleware === 'guest' && redirectIfAuthenticated)
  //     Router.push(redirectIfAuthenticated);
  //   if (middleware === 'auth' && error) logout();
  // }, []);

  return {
    // register,
    login,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
    // logout,
  };
};
