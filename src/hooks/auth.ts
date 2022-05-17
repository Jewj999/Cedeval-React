import { userAtom } from './../atoms/user';
import { useRecoilState } from 'recoil';
import {
  GetInformationLogin,
  LoginForm,
  RegisterForm,
  Response,
} from '@src/interfaces';
import { axios } from '@src/libs';
import qs from 'qs';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { Router, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Axios from 'axios';

type Middleware = 'guest' | 'auth';

type UseAuthProps = {
  middleware?: Middleware;
  redirectIfAuthenticated?: string;
  setError: Dispatch<SetStateAction<string>>;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
  setError,
}: UseAuthProps) => {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);

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
      setError(response.errorMessage ?? '');
      throw new Error(response.errorMessage);
    } else {
      setUserState(response.msg);
      return response.msg;
    }
  };

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/vbesRest/getInformationLogin', validateUserInfo, {
    shouldRetryOnError: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const register = async ({
    email,
    document_type,
    document_value,
  }: RegisterForm) => {
    axios
      .post('/vbsRegister/registerUser', {
        msg: {
          email,
          tipoDoc: document_type,
          numDoc: document_value,
        },
      })
      .then((res) => {
        if (res.data.response.errorCode === '0') {
          navigate('/signup/successful');
        } else {
          setError(res.data.response.errorMessage);
        }
      })
      .catch((error) => {
        setError(error.response.data.response.errorMessage);
        if (error.response.status !== 422) throw error;
      });
  };

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
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        try {
          validateUserInfo('/vbesRest/getInformationLogin');
          navigate('/dashboard');
        } catch (err: any) {
          setError(err.message);
        }
      });
  };

  const forgotPasswordValidateUser = async ({
    email = '',
    document_type = '',
    document_value = '',
  }) => {
    setError('');

    const {
      data: { response },
    } = await axios.post<Response<any>>('/vbesRecoveryUser/validateUser', {
      request: {
        msg: {
          correo: email,
          tipoDoc: document_type,
          numDoc: document_value,
        },
      },
    });

    if (response.errorCode !== '0') {
      setError(response.errorMessage ?? '');
      throw new Error(response.errorMessage);
    } else {
      const {
        data: { access_token },
      } = await getTokenForgotPassword();

      const { data } = await sendTokenForgotPassword(access_token, {
        email: email,
        description: 'Solicitud de token para recuperar contraseña',
        codCanal: 'CANAL_WEB',
        tipo: 1,
      });

      navigate('/verify-token?email=' + email);
    }
  };

  const getTokenForgotPassword = async () => {
    return Axios.create({
      baseURL: process.env.REACT_APP_CEDEVAL_SECURITY_SERVICES_URL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).post(
      '/security/oauth/token',
      qs.stringify({
        username: process.env.REACT_APP_CEDEVAL_SECURITY_SERVICES_USER,
        password: process.env.REACT_APP_CEDEVAL_SECURITY_SERVICES_PASSWORD,
        grant_type: 'password',
      }),
      {
        auth: {
          username: process.env.REACT_APP_CEDEVAL_SECURITY_BASIC_USER ?? '',
          password: process.env.REACT_APP_CEDEVAL_SECURITY_BASIC_PASSWORD ?? '',
        },
      }
    );
  };

  const sendTokenForgotPassword = async (token: string, body: {}) => {
    return Axios.create({
      baseURL: process.env.REACT_APP_CEDEVAL_SECURITY_SERVICES_URL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).post('/vbesSecurity/generateToken', body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  };

  const resetPassword = async ({
    email,
    password,
    setStatus,
    token,
  }: {
    email: string;
    password: string;
    setStatus: Dispatch<SetStateAction<boolean>>;
    token: string;
  }) => {
    setError('');

    console.log(email, password, token);
    axios
      .put<Response<any>>('/vbesRecoveryUser/changePasswordUser', {
        request: {
          msg: {
            email,
            password,
            idTipoCambio: 4,
            token,
          },
        },
      })
      .then(({ data: { response } }) => {
        if (response.errorCode !== '0') {
          setError(response.errorMessage ?? '');
          throw new Error(response.errorMessage);
        } else {
          setStatus(true);
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        }
      })
      .catch((err: any) => {
        setError(err.message);
      });
  };

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

  const signOut = async () => {
    await axios.put('/vbesRest/logoutSession', {
      request: {
        msg: {
          idSesAct: userState.lastSession.bvsIdsesact,
        },
      },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);
    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPasswordValidateUser,
    // forgotPassword,
    resetPassword,
    // resendEmailVerification,
    logout,
    signOut,
  };
};
