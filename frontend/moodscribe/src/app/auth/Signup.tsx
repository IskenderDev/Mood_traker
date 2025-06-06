import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../../assets/logo-transparent.png';
import { Link } from 'react-router-dom';
import { SignupValues } from '../../utils/types';
import InputField from '../../components/CustomInputField';
import { Icon } from '@iconify/react/dist/iconify.js';
import { clearSignupState, signup } from '../../redux/auth/features';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Enter your name')
    .min(3, 'Should contain minimum of 3 characters'),
  email: Yup.string()
    .email('Wrong email format')
    .required('Enter your email address'),
  password: Yup.string()
    .required('Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
      'Password should contain 8 or more characters, at least a symbol, number, uppercase & lower case letters'
    ),
});

const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { success, loading } = useAppSelector(
    (state: RootState) => state.signup
  );
  const toastId = 'Hello';

  useEffect(() => {
    if (success) {
      toast.success("You've successfully registered", { id: toastId });
      navigate('/auth/signin');
    }
  }, [navigate, success, toastId]);

  useEffect(() => {
    return () => {
      dispatch(clearSignupState());
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

  const onSubmit: SubmitHandler<SignupValues> = (data: SignupValues, e) => {
    e?.preventDefault();
    dispatch(signup(data));
    reset();
  };
  return (
    <div className='fixed right-0 left-0 h-screen bg-bg-100 bg-opacity-60 p-3'>
      <Link to='/'>
        <img className='mt-4 mb-12' src={logo} alt='Moodscribe logo' />
      </Link>

      <div className='container mx-auto max-w-lg max-h-[640px] bg-bg-800 sm:p-14 p-10 m-6 shadow-xl shadow-stone-500 overflow-y-scroll'>
        <h1 className='text-gray-400 text-lg text-center mb-14'>NEW ACCOUNT</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <InputField
            label='FULL NAME'
            labelClass='text-[#e7c1a3] mt-9'
            type={'text'}
            control={control}
            registration={{ ...register('fullName') }}
            placeholder='Enter your full name'
            errorMessage={errors.fullName?.message}
            isRequired
            className='bg-transparent border-b border-gray-400 mt-2'
          />
          <InputField
            registration={{ ...register('email') }}
            type='text'
            control={control}
            valid={
              getValues('email') && !errors.email?.message ? 'success' : ''
            }
            errorMessage={errors.email?.message}
            label='EMAIL ADDRESS'
            labelClass='text-[#e7c1a3] mt-9'
            placeholder='Enter your email'
            isRequired
            className='bg-transparent border-b border-gray-400 mt-2'
          />
          <InputField
            registration={{ ...register('password') }}
            type={showPassword ? 'text' : 'password'}
            control={control}
            label='PASSWORD'
            labelClass='text-[#e7c1a3] mt-9'
            placeholder='Enter your password'
            valid={getValues('password') && !errors.password ? 'success' : ''}
            errorMessage={errors.password?.message}
            isRequired
            handleShowPassword={handleShowPassword}
            className='bg-transparent border-b border-gray-400 mt-2'
          />
          <button
            type='submit'
            className='py-3 mb-5 mt-12 text-teal-100 font-semibold bg-slate-300 bg-opacity-50 hover:bg-cyan-500 hover:text-white w-full border rounded-3xl'
          >
            {loading && (
              <Icon
                icon='eos-icons:loading'
                className='inline-block h-7 w-7 mr-2 mb-1'
              />
            )}
            CREATE ACCOUNT
          </button>
        </form>
        <p className='text-gray-400 mt-2'>
          Already have an account? {'  '}
          <Link
            to='/auth/signin'
            className='text-teal-100 hover:text-cyan-400 text-lg italic'
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
