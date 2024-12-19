import React, { useState } from 'react';
import { signUpPage } from '../../constants/commontext';
import { Link } from 'react-router-dom';
import { IoMdEyeOff, IoIosEye } from "react-icons/io";
import '../../styles/global.css'
import { register } from '../../services/authservices';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                name: username,
                email,
                role,
                password,
            };
            const response = await register(data);
            if (!response.statusCode) {
                navigate('/login');
            }
            setError(response.message[0]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-green-100'>
            <form className='bg-white flex flex-col p-10 border border-gray-200 rounded sm:w-3/5 md:w-3/5 lg:w-1/3' onSubmit={handleSubmit}>
                <h1 className='text-black text-3xl font-bold'>{signUpPage.title}</h1>
                <p className='text-xl text-gray-500 font-light'>{signUpPage.subtitle}</p>
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{signUpPage.username}</label>
                <input className='border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12' type='text' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{signUpPage.email}</label>
                <input className='border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12' type='email' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{signUpPage.password}</label>
                <div className='flex justify-between items-center border border-gray-200 p-2 rounded h-12'>
                    <input className='border-none rounded focus:outline-none bg-white text-black w-full' type={showPassword ? 'text' : 'password'} name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-white outline-none border-none focus:outline-none focus:border-none' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoMdEyeOff className='bg-transparent text-black' /> : <IoIosEye className='bg-transparent text-black outline-none' />}</button>
                </div>
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{signUpPage.confirmPassword}</label>
                <div className='flex justify-between items-center border border-gray-200 p-2 rounded h-12'>
                    <input className='border-none rounded focus:outline-none bg-white text-black w-full' type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='bg-white outline-none border-none focus:outline-none focus:border-none' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <IoMdEyeOff className='bg-transparent text-black' /> : <IoIosEye className='bg-transparent text-black outline-none' />}</button>
                </div>
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{signUpPage.role}</label>
                <select
                    name='role'
                    className='border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value='CUSTOMER'>{signUpPage.roleCustomer}</option>
                    <option value='SELLER'>{signUpPage.roleSeller}</option>
                </select>
                {error && <p className='text-red-500 font-semibold mt-5'>{error}</p>}
                <button className='bg-blue-500 text-white py-2 px-4 rounded mt-5 hover:bg-green-600 outline-none focus:outline-none focus:border-lime-400'>{signUpPage.button}</button>
                <Link to={signUpPage.linkTo} className='text-md text-gray-500 font-light mt-5'>{signUpPage.link}</Link>
            </form>
        </div>
    );
}

export default SignUp;
