import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-transparent.png';
import { Link } from 'react-router-dom';
import { SigninValues } from '../../utils/types';
import InputField from '../../components/CustomInputField';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearSigninState, signin } from '../../redux/auth/features';
import { toast } from 'sonner';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неверный формат электронной почты')
    .required('Введите адрес электронной почты'),
  password: Yup.string()
    .required('Введите пароль')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
      'Пароль должен содержать не менее 8 символов, включая символ, цифру, буквы верхнего и нижнего регистра'
    ),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { success, token } = useAppSelector((state: RootState) => state.signin);
  const toastId = 'Sonner';

  useEffect(() => {
    if (success) {
      toast.success('Вход выполнен успешно', { id: toastId });
    }

    setTimeout(() => {
      if (token) navigate('/dashboard');
    }, 500);
  }, [navigate, success, toastId, token]);

  useEffect(() => {
    return () => {
      dispatch(clearSigninState());
    };
  }, [dispatch]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    control,
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SigninValues> = (data: SigninValues, e) => {
    e?.preventDefault();
    dispatch(signin(data));
    success && reset();
  };
  return (
    <div className='fixed right-0 left-0 h-screen bg-bg-100 bg-opacity-60 p-3'>
      <Link to='/'>
        <img className='mt-4 mb-12' src={logo} alt='Moodscribe logo' />
      </Link>

      <div className='container mx-auto max-w-lg max-h-[640px] bg-bg-800 sm:p-14 p-10 m-6 shadow-xl shadow-stone-500 overflow-y-scroll'>
        <h1 className='text-gray-400 text-lg text-center mb-14'>
          УЖЕ ЕСТЬ АККАУНТ
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <InputField
            registration={{ ...register('email') }}
            type='text'
            control={control}
            valid={
              getValues('email') && !errors.email?.message ? 'success' : ''
            }
            errorMessage={errors.email?.message}
            label='АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ'
            labelClass='text-[#e7c1a3] mt-9'
            placeholder='Введите вашу почту'
            isRequired
            className='bg-transparent border-b border-gray-400 mt-2'
          />
          <InputField
            registration={{ ...register('password') }}
            type={showPassword ? 'text' : 'password'}
            control={control}
            label='ПАРОЛЬ'
            labelClass='text-[#e7c1a3] mt-9'
            placeholder='Введите пароль'
            valid={getValues('password') && !errors.password ? 'success' : ''}
            errorMessage={errors.password?.message}
            isRequired
            handleShowPassword={handleShowPassword}
            className='bg-transparent border-b  border-gray-400 mt-2'
          />
          <button
            type='submit'
            className='py-3 mb-5 mt-12 text-teal-100 font-semibold bg-slate-300 bg-opacity-50 hover:bg-cyan-500 hover:text-white w-full border rounded-3xl'
          >
            ВОЙТИ
          </button>
        </form>
        <p className='text-gray-400 mt-2'>
          Нет аккаунта? {'  '}
          <Link
            to='/auth/signup'
            className='text-teal-100 hover:text-cyan-400 text-lg italic'
          >
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
