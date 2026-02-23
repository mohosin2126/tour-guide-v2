import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useApi from "../../../hooks/auth/useApi.js";
import Input from '../../../Components/reuseable/input/index.jsx';


export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();


    const handleGoogleSignIn = () =>{
        googleSignIn()
            .then(result =>{
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                }
                useApi.post('/users', userInfo)
                    .then(res =>{
                        console.log(res)
                        navigate('/');
                    })
            })
    }
    const onSubmit = (data) => {
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            });
    }



    return (
        <div
            className='flex justify-center items-center min-h-screen'
            style={{ background: "url(../../../public/image/register.jpg)", backgroundRepeat: "no-repeat" }}
        >
            <div className='absolute inset-0 w-full h-full bg-black/60 pb-24'></div>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-700/50 backdrop-blur-md text-gray-300 z-20 my-24 w-[95%] md:w-[490px]'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-3'>

                        <Input
                            label='Email Address'
                            name="email"
                            type='email'
                            register={register}
                            placeholder="Email"
                            errors={errors}
                        />
                        <Input
                            label='Password'
                            name="password"
                            type='password'
                            placeholder='*******'
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-rose-500 w-full rounded-md py-3 text-white mt-5'
                    >
                        Continue
                    </button>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center rounded space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/auth/register'
                        className='hover:underline hover:text-rose-500 text-gray-300'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}


