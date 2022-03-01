import { GetInformationLogin, LoginForm } from '@src/interfaces';
import { axios } from '@src/libs';
import qs from 'qs';
import { createContext, useContext, useEffect } from 'react';
import { Router, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

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
  const validateUserInfo = async (url: string) => {
    const {
      data: { response },
    } = await axios.post<GetInformationLogin>(url, {
      request: {
        msg: {
          mail: localStorage.getItem('email'),
          typeSession: 'Web',
        },
      },
    });

    if (response.errorCode !== '0' && response.errorCode !== '7') {
      throw new Error(response.errorMessage);
    } else {
      return response.msg;
    }
  };
  const {
    data: user,
    error,
    mutate,
  } = useSWR('/vbesRest/getInformationLogin', validateUserInfo);

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

  const login = async ({ username, password }: LoginForm) => {
    axios
      .post(
        '/VbesAplication/oauth/token',
        qs.stringify({
          username,
          password,
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
        localStorage.setItem('email', username);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;
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

  const logout = async () => {
    if (!error) {
      await axios.put('/vbesRest/logoutSession');
    }

    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);
    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    // register,
    login,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
    logout,
  };
};
