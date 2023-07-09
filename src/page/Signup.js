import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginsignupImage from '../assest/login-animation.gif'
import { BiSolidShow, BiSolidHide } from 'react-icons/bi'
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from 'react-hot-toast';
export default function Signup() {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false);
    const [showConfrimpassword, setShowConfrimPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confrimPassword: "",
        image : ""
    })
    // console.log(data);
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleShowConfrimPassword = () => {
        setShowConfrimPassword(preve => !preve)
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleUploadProfileImage = async(e)=>{
        const data = await ImagetoBase64(e.target.files[0])
        setData((preve)=>{
            return{
              ...preve,
              image : data
            }
        })
  
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const [firstName, email, password, confrimPassword] = [data.firstName, data.email, data.password, data.confrimPassword];
        if (firstName && email && password && confrimPassword) {
            if (password === confrimPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                    method : "POST",
                    headers : {
                      "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                  })
        
                  const dataRes = await fetchData.json()
                //   console.log(dataRes)
                // alert(dataRes.message);
                toast(dataRes.message)
                if(dataRes.alert){
                    navigate("/login");
                }
            } else {
                alert("check password..")
            }
        } else {
            alert("please enter require filed");
        }

    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-blod'>SignUp</h1> */}
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                <img src={data.image ? data.image : loginsignupImage} className="w-full h-full" />

                    <label htmlFor="profileImage">
                        <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                            <p className="text-sm p-1 text-white">Upload</p>
                        </div>
                        <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />
                    </label>
                </div>
                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type={'text'} id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500' value={data.firstName} onChange={handleOnChange} />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type={'text'} id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500' value={data.lastName} onChange={handleOnChange} />

                    <label htmlFor='email'>Email</label>
                    <input type={'email'} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-blue-500' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password'>Password</label>
                    <div className=' mt-1 mb-2  flex py-1 bg-slate-200  py-1 rounded  focus-within:outline focus-within:outline-blue-500'>
                        <input type={showpassword ? 'text' : 'password'} id="password" name='password' className='w-full bg-slate-200  outline-none border-none' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showpassword ? <BiSolidShow /> : <BiSolidHide />}</span>
                    </div>
                    <label htmlFor='confrimpassword'>Confrim Password</label>
                    <div className=' mt-1 mb-2  flex py-1 bg-slate-200  py-1 rounded   focus-within:outline focus-within:outline-blue-500'>
                        <input type={showConfrimpassword ? 'text' : 'password'} id="confrimPassword" name='confrimPassword' className='w-full bg-slate-200  outline-none border-none' value={data.confrimPassword} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfrimPassword}>{showConfrimpassword ? <BiSolidShow /> : <BiSolidHide />}</span>
                    </div>
                    <button type='submit' className='max-w-[150px] m-auto  w-full bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xlfont-medium text-center py-1 rounded-full mt-4'> Sign Up</button>
                </form>
                <p className='text-left text-sm mt-3'>Already have account ? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>


            </div>
        </div>
    )
}
