import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.jpg";


function ReceiverMessage({image,message}) {
  let scroll = useRef()
  let {selectedUser}=useSelector(state=>state.user)
  useEffect(()=>{
     scroll.current.scrollIntoView({behavior:"smooth"})
  },[message,image])

  const handleImageScroll=()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className="flex items-center gap-[10px]">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center
               bg-white shadow-gray-500 shadow-lg cursor-pointer">
                <img src={selectedUser.image || dp} alt="Profile" className='h-[100%] object-cover'/>
          </div>
          <div ref={scroll} className="w-fit max-w-[500px] px-[20px] py-[10px] bg-white text-gray-800 border border-primary-light
        text-[19px] rounded-tl-none rounded-2xl relative left-0  shadow-gray-500 
        shadow-lg gap-[10px] flex flex-col">
            {image && (<img src={image} alt=" "className="w-[150px] rounded-lg"
            onLoad={handleImageScroll}/>)}
            {message && <span>{message}</span>}
          </div>
          
        </div>
  )
}

export default ReceiverMessage