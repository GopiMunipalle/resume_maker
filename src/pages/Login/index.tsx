import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginPage } from '../../constants/commontext'
import { IoMdEyeOff, IoIosEye } from "react-icons/io";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-green-100'>
            <div className='bg-white flex flex-col p-10 border border-gray-200 rounded sm:w-3/5 md:w-3/5 lg:w-1/3'>
                <h1 className='text-black text-3xl font-bold'>{loginPage.title}</h1>
                <p className='text-xl text-gray-500 font-light'>{loginPage.subtitle}</p>
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{loginPage.email}</label>
                <input className='border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12' type='email' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className='mt-5 text-gray-600 font-semibold text-md self-start'>{loginPage.password}</label>
                <div className='flex justify-between items-center w-full border border-gray-200 p-2 rounded h-12'>
                    <input className='border-none rounded focus:outline-none bg-white text-black' type={showPassword ? 'text' : 'password'} name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-white outline-none border-none focus:outline-none focus:border-none' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoMdEyeOff className='bg-transparent text-black' /> : <IoIosEye className='bg-transparent text-black outline-none' />}</button>
                </div>
                <button className='bg-blue-500 text-white py-2 px-4 rounded mt-5 hover:bg-green-600 outline-none focus:outline-none focus:border-lime-400'>{loginPage.button}</button>
                <Link to={loginPage.linkTo} className='text-md text-gray-500 font-light mt-5'>{loginPage.link}</Link>
            </div>
        </div>
    );
}

export default Login