import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { loginFaliure, loginStart, loginSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
// const baseURL= process.env.REACT_APP_API_URL;

const Box=styled.div`
position:absolute;
top:0;left:0;z-index:99999999;width:100%;height:100%;background-color:#110d07;
`
const Box1=styled.div`
display:flex;
position:inherit;
width:50dvw;
height:80dvh;border-radius:20px;overflow:hidden;
top:50%;left:50%;transform:translate(-50%,-50%);`
const Container=styled.div`
width:50%;height:100%;background-color:#fffdfd;color:#1d1d25;text-align:center;flex:shrink:0;`;
const Input=styled.input`width:80%;color:#3d262b;background-color:#e2e2e2;height:40px; border-radius:30px;border:none;margin-bottom:20px;padding:5px 15px;outline:none;`;
const Buttons=styled.button`color:white;width:fit-content;min-width:30%;height:40px;font-size:14px;font-weight:bold; border-radius:30px;border:none;margin-bottom:10px;padding:5px 15px;background-color:#fd745a;margin:5px ;`;
const Cros=styled.div`width:30px;height:30px;border-radius:50%;background-color:red;color:white;Position:absolute;right:20px;top:20px;transform:translate(50%,-50%);display:flex;align-items:center;justify-content:center;z-index:99999999999999`


export default function Login({darkMode,setDarkMode}) {
  
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    // e.preventDefault();
    dispatch(loginStart())
    try {
      console.log(email,password);
      const res=await axios.post("http://localhost:8080/api/auth/login",{email,password})
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      const loguser=res.data;
      if(loguser) navigate(`/`)
      
    } catch (err) {
      dispatch(loginFaliure());
    }
  }
  const loginwithgoogle=()=>{
    dispatch(loginStart());
     signInWithPopup(auth,provider).then((data)=>{
       axios.post("http://localhost:8080/api/auth/google",{name:data.user.displayName,email:data.user.email,img:data.user.photoURL}).then((res)=>{
         dispatch(loginSuccess(res.data));
        
         navigate("/");
       })
     }).catch(error=>{
       dispatch(loginFaliure())})
   }
  return (
<Box>
<Box1>
<Container>
  <img src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3992.jpg?w=360" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
  </Container>
    <Container>
        <Link to="/" style={{textDecoration:"none"}}>
        <Cros>X</Cros>
        </Link>
        <h2 style={{lineHeight:".8"}}>LOGIN</h2>
        <h4>For Better Experience</h4>
       <Input type='email' placeholder='Email' onChange={e=>setEmail(e.target.value)}></Input>
       <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}></Input>
       <br />

      <Buttons onClick={handleLogin}>Login</Buttons>
      <Link to="/signup" style={{margin:"10px",fontSize:"16px"}}>forgot password
      </Link>
      <Buttons onClick={loginwithgoogle} style={{width:"70%",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginLeft:"15%"}}><p>Login with google</p> <i class="ri-google-fill"></i></Buttons>

    </Container>
    </Box1>
    </Box>
  )
}

