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
    shouldRetryOnError: false,
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
        request: {
          msg: {
            email,
            tipoDoc: document_type,
            numDoc: document_value,
          },
        },
      })
      .then(() => {
        navigate('/signup/successful');
      })
      .catch((error) => {
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
    const { data: response } = await axios.post<Response<any>>(
      '/vbesRest/validateUser',
      {
        request: {
          msg: {
            correo: email,
            tipoDoc: document_type,
            numDoc: document_value,
          },
        },
      }
    );

    if (response.errorCode !== '0') {
      setError(response.errorMessage ?? '');
      throw new Error(response.errorMessage);
    } else {
      navigate('/password-reset?email=' + email);
    }
  };

  const resetPassword = async ({
    email,
    password,
    setStatus,
  }: {
    email: string;
    password: string;
    setStatus: Dispatch<SetStateAction<boolean>>;
  }) => {
    setError('');

    axios
      .post<Response<any>>('/vbesRest/changePassword', {
        request: {
          msg: {
            email,
            password,
            idTipoCambio: 4,
          },
        },
      })
      .then(({ data: response }) => {
        if (response.errorCode !== '0') {
          setError(response.errorMessage ?? '');
          throw new Error(response.errorMessage);
        } else {
          setStatus(true);
          setTimeout(() => {
            navigate('/login');
          }, 2500);
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
    signOut
  };
};
