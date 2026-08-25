import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.jpg'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../main';
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';


function SideBar() {
    let {userData,otherUsers,selectedUser,onlineUsers,searchData}=useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
    let dispatch=useDispatch()
    let navigate=useNavigate()

    const handleLogOut=async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/auth/logout`,
                {withCredentials:true})
                dispatch(setUserData(null))
                dispatch(setOtherUsers(null))
                navigate("/login")
        }catch(error){
            console.log(error)
        }
    }

    const handlesearch=async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/user/search?query=${input}`,
                {withCredentials:true})
                dispatch(setSearchData(result.data))
                
               
                
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if(input){
         handlesearch()
        }
     
    },[input])
  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 overflow-hidden lg:block relative ${!selectedUser?"block":"hidden"} `}>
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center 
                items-center bg-primary shadow-gray-500 text-gray-700 shadow-lg mt-[10px] 
                cursor-pointer fixed bottom-[20px] left-[10px]" onClick={handleLogOut}>
                <BiLogOutCircle  className='w-[25px] h-[25px]'/>
                </div>
                {input.length > 0 && <div className='w-full h-[500px] top-[250px] flex items-center pt-[20px] overflow-y-auto 
                flex-col gap-[10px] absolute bg-white z-[150] shadow-lg'>
                {searchData?.map((user)=>(
                    <div key={user._id} className="w-full">
                          <div className='w-full h-[70px] flex items-center gap-[20px] px-[10px]
                            bg-white hover:bg-primary-light border-b-2 border-gray-400 cursor-pointer' onClick={()=>{dispatch(setSelectedUser(user))
                            setInput("")
                            setSearch(false)
                            }
                            }>
                          <div className='relative rounded-full flex justify-center items-center '>
                          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                         <img src={user.image || dp} alt="Profile" className='h-[100%] object-cover'/>
                        </div>
                       {onlineUsers?.includes(user._id) && 
                     <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-online-dot
                        shadow-gray-500 shadow-md'></span>}
                     </div>
                       <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                      </div>
                        </div>
                     ))}
                    </div>}
             
        <div className="w-full h-[300px] bg-primary rounded-b-[30%] 
           shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]">
            <h1 className='text-white font-bold text-[25px]'>ChatHive</h1>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-gray-800 font-semibold text-[25px]'>Hii , {userData.name  || "user"}</h1>
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center
                 bg-white shadow-gray-500 shadow-lg cursor-pointer" onClick={()=>navigate("/profile")}>
                  <img src={userData.image || dp} alt="Profile" className='h-[100%] object-cover'/>
                </div>
            </div>
            <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[18px]'>
                {!search && <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center 
                items-center bg-white shadow-gray-500 shadow-lg mt-[10px] cursor-pointer"  onClick={()=>setSearch(true)}>
                    <IoIosSearch className='w-[25px] h-[25px]'/>
                </div>}
                {search && 
                <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px]
                mt-[10px] rounded-full overflow-hidden px-[20px] relative'>
                    <IoIosSearch className='w-[25px] h-[25px]'/>
                    <input type='text' placeholder='search users...' className='w-full h-full text-[17px] 
                    p-[10px] outline-none border-none' onChange={(e)=>setInput(e.target.value)} value={input}/>
                    <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>{setSearch(false);setInput("");}}/>
                  
                </form>
                }
                {!search && otherUsers?.map((user)=>(
                    onlineUsers?.includes(user._id) && 
                    <div key={user._id} className='relative rounded-full  shadow-gray-500 shadow-lg flex justify-center items-center mt-[10px] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                  <img src={user.image || dp} alt="Profile" className='h-[100%] object-cover'/>
                  </div>
                  <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-online-dot shadow-gray-500 shadow-md'></span>
                </div>
                ))}
            </div>
        </div>
        <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
           {otherUsers?.map((user)=>(
            <div key={user._id} className='w-[90%] h-[60px] flex justify-start items-center gap-[20px] rounded-full
             shadow-gray-500 bg-white shadow-lg  hover:bg-primary-light cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
                    <div className='relative rounded-full  shadow-gray-500 shadow-lg flex justify-center items-center mt-[10px] '>
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                  <img src={user.image || dp} alt="Profile" className='h-[100%] object-cover'/>
                  </div>
                  {onlineUsers?.includes(user._id) && 
                  <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-online-dot
                   shadow-gray-500 shadow-md'></span>}
                </div>
                   <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
            </div>
                ))}
        </div>
    </div>
  )
}

export default SideBar



