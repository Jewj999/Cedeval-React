import { LoginForm } from '@src/interfaces';
import qs from 'qs';

type Middleware = 'guest' | 'auth';

type UseAuthProps = {
  middleware?: Middleware;
  redirectIfAuthenticated?: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps) => {
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
    fetch('http://34.134.221.255:8080/VbesAplication/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic Y2xpZW50ZTpwYXNzd29yZA==',
      },

      body: qs.stringify({
        username: 'josedaniel9839@gmail.com',
        password: '12345678',
        grant_type: 'password',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
      });

    // axios
    //   .post(
    //     '/VbesAplication/oauth/token',
    //     qs.stringify({ ...props, grant_type: 'password' }),
    //     {
    //       auth: {
    //         username: process.env.OAUTH_USER || '',
    //         password: process.env.OAUTH_PASSWORD || '',
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // if (error.response.status !== 422) throw error

    //     // setErrors(Object.values(error.response.data.errors).flat())
    //   });
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

  //   useEffect(() => {
  //     if (middleware === 'guest' && redirectIfAuthenticated)
  //       router.push(redirectIfAuthenticated)
  //     if (middleware === 'auth' && error) logout()
  //   }, [])

  return {
    // register,
    login,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
    // logout,
  }
};
