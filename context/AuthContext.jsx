import { createContext, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import {connect, io} from 'socket.io-client';
import {useState} from 'react';
const backendUrl=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=backendUrl;

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [token,setToken]=useState(localStorage.getItem('token') || null);
    const[authUser,setAuthUser]=useState(null);
    const[onlineUsers,setOnlineUsers]=useState([]);
    const [socket,setSocket]=useState(null);
    // check user connected then connect

const checkAuth=async()=>{
    if(!token){
        setAuthUser(null);
        return;
    }

    try {
        const {data} = await axios.get('/auth/auth/check');
        if(data.success){
        setAuthUser(data);
        connectSocket(data.user);
    }} catch (error) {
      toast.error(error.message);
    }
};
// login function 
const login=async({state ,credentials})=>{
    try {
        const {data}=await axios.post(`/auth/auth/${state}`,credentials);
        if(data.success){
             axios.defaults.headers.common['token']=data.token;
            setToken(data.token);
            localStorage.setItem('token',data.token);
            setAuthUser(data.userData);
            connectSocket(data.userData);
           
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
        
    }
}
//logout
const logout=async()=>{
    try {
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        localStorage.removeItem('token');
        axios.defaults.headers.common['token']=null;
        toast.success('Logged out successfully');
        socket?.disconnect();
        setSocket(null);
    }
    catch (error) {
        toast.error(error.response.data.message);
    }
}


//update profile
const updateProfile=async(profileData)=>{
    try {
        const {data}=await axios.put('/auth/auth/update-profile',profileData);
        if(data.success){
            setAuthUser(data.userData);
            toast.success("Profile updated successfully");
        }
        else{
            toast.error(error.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

const connectSocket=()=>{
    if(!userData || socket?.connected) return;
    const newSocket=io(backendUrl,{
        query: {
            userID: userData._id,
        }
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on('connect',(userIDs)=>{
        console.log('getOnlineUsers',()=>{
            setOnlineUsers(userIDs);
            
        });
    });
};

useEffect(()=>{
     if(token){
        axios.defaults.headers.common['token']=token;
      
     }
  checkAuth();
},[token]);

const value={
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile
};


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};