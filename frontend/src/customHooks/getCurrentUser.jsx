import axios from 'axios'
import { serverUrl } from '../main'
import { useEffect } from 'react'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const getCurrentUser=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                let result=await axios.get(`${serverUrl}/api/user/current`,
                    {withCredentials:true})
                    dispatch(setUserData(result.data ))
            } catch (error){
                 console.log(error)
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser