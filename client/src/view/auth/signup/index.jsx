import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useContext } from 'react';
// import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
// import useAxiosPublic from '../../Hook/useAxiosPublic';
import { useForm } from "react-hook-form";
import Input from "../../../components/input/index.jsx";

export default function SignUp(){
    // const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();


    const onSubmit = (data) => {
        // createUser(data?.email, data?.password)
        //   .then(result => {
        //     const loggeduser = result.user
        //     console.log(loggeduser)
        //     updateUserProfile(data?.name, data?.photoUrl)
        //       .then(() => {
        //         const userInfo = {
        //           name,
        //           photo: photoUrl,
        //           email,
        //         }
        //         axiosPublic.post("/users", userInfo)
        //           .then(res => {
        //             if (res.data.insertedId) {
        //               Swal.fire({
        //                 position: 'top',
        //                 icon: 'success',
        //                 title: 'User created successfully.',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //               });
        //               navigate(from, { replace: true });
        //             }
        //           })

        //       })

        //       .catch(error => console.log(error))
        //   })
    }


    const handleGoogleSignIn = () => {
        // googleSignIn()
        //   .then(result => {

        //     const userInfo = {
        //       email: result.user?.email,
        //       name: result.user?.displayName,
        //       photo: result.user?.photoURL,

        //     }
        //     axiosPublic.post('/users', userInfo)
        //       .then(res => {
        //         console.log(res.data);
        //         navigate('/');
        //       })
        //   })
    }

    return (
        <div className="relative w-full h-auto" style={{ backgroundImage: `url('/image/register.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {/* Overlay */}
            <div className="absolute inset-0 w-full h-full bg-black/60"></div>
            {/* Content */}
            <div className='relative z-20 flex justify-center items-center w-full h-auto'>
                <div className='flex flex-col px-3 md:px-6 py-6 rounded-md bg-gray-700/50 backdrop-blur-md text-gray-300 my-24 w-[95%] md:w-[490px]'>
                    <div className='mb-8 text-center'>
                        <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                        <p className='text-sm text-gray-400'>Welcome to Tour</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-3'>
                            <Input
                                label='User Name'
                                name="username"
                                placeholder='Name'
                                register={register}
                                errors={errors}
                            />
                            <Input
                                label='Photo URL'
                                name="photoURL"
                                type='file'
                                placeholder="Enter Your Photo URL"
                                register={register}
                                errors={errors}
                            />
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
                    <div className='flex items-center pt-4 space-x-1'>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        <p className='px-3 text-sm dark:text-gray-400'>
                            Signup with social accounts
                        </p>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    </div>
                    <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer'>
                        <FcGoogle size={32} />
                        <p>Continue with Google</p>
                    </div>
                    <p className='px-6 text-sm text-center text-gray-400'>
                        Already have an account?{' '}
                        <Link
                            to='/auth/login'
                            className='hover:underline hover:text-rose-500 text-gray-200'
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

