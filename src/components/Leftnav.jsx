import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logoi from '../utils/logo1.png'
import { loginFaliure, logout } from '../redux/userSlice';
import axios from 'axios';

const Container = styled.div`
flex-shrink:0;
padding:0 4px;
padding-top:20px;
// flex:1;
position:sticky;
top:7dvh;
height:93dvh;
overflow:auto;
color:${({ theme }) => theme.text};
background-color:${({ theme }) => theme.bgLighter};

&::-webkit-scrollbar{
  display:none;
}
`;




const Items = styled.div`display:flex;align-items:center;gap:24px;padding:10px;cursor:pointer;
&:hover{
  background-color:${({ theme }) => theme.soft};
}
`;

const Login = styled.div`padding:2px 10px;`;

const Hr = styled.hr`
border:1px solid ${({ theme }) => theme.soft};
`;
const Button = styled.button`
padding:5px 15px;
background-color:transparent;
border:1px solid skyblue;
border-radius:30px;
cursor:pointer;
color:${({ theme }) => theme.text};
`;





export default function Leftnav({ menu, setmenu, darkMode, setDarkMode }) {

  const currentUser = useSelector(state => state.user);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoff = () => {
    dispatch(logout());
    navigate("/")
  }



  const handlemenu = () => {
    if (menu === "big") {
      setmenu("small");
    } else {
      setmenu("big");
    }
  };


  const deleteacc=async()=>{
    const confirmed = window.confirm("Are you sure you want to delete your account?");
  if (confirmed) {
    await axios.post(`http://localhost:8080/api/users/${currentUser.currentUser._id}`, {});
    navigate("/");

  }
}
  return (
    <Container style={{ width: menu === "big" ? "15vmax" : "3.9vmax" }}>
      {
        menu === "big" ? <span class="material-symbols-outlined" style={{ fontWeight: "600", fontSize: "28px", position: "fixed", top: "55px", left: "13%", cursor: "pointer" }} onClick={handlemenu}>
          close
        </span> : <span class="material-symbols-outlined" style={{ fontWeight: "600", fontSize: "28px", position: "fixed", top: "52px", left: "14px", cursor: "pointer" }} onClick={handlemenu}>
          menu
        </span>
      }
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Items><span class="material-symbols-outlined">
          home
        </span>Home</Items>
      </Link>

      <Link to="/trend" style={{ textDecoration: "none", color: "inherit" }}>
        <Items><span class="material-symbols-outlined">
          trending_up
        </span>Trending</Items>
      </Link>

      <Hr />

      <Items><span class="material-symbols-outlined">
        playlist_add_check_circle
      </span>Courses</Items>
      <Link to="/sub" style={{ textDecoration: "none", color: "inherit" }}>
        <Items><span class="material-symbols-outlined">
          subscriptions
        </span>Subscriptions</Items>
      </Link>
      <Hr />

      <>
        {!currentUser.currentuser ?
          <Login>
            <p style={{ lineHeight: ".9" }}>
              Signup for better Experience
            </p>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button>
                Signup
              </Button>
            </Link>
          </Login> :
          <>
            <Link to="/urvideo" style={{ textDecoration: "none", color: "inherit" }}>
              <Items><span class="material-symbols-outlined">
                smart_display
              </span>Your Videos</Items>
            </Link>

            <Items><span class="material-symbols-outlined">
              sensors
            </span> Live Class</Items>
            <Link to="/prem" style={{ textDecoration: "none", color: "inherit" }}>
              <Items style={{ fontWeight: "500" }}>
                <img src={Logoi} alt="" style={{ width: "25px", height: "25px", objectFit: "cover" }} />
                Premium</Items>
            </Link>

            <Items onClick={logoff} ><span class="material-symbols-outlined">
              logout
            </span>
              logout</Items>
            <Items><span class="material-symbols-outlined">
              video_library
            </span>Librayr</Items>
            <Items><span class="material-symbols-outlined">
              history
            </span>History</Items>
            <Items onClick={deleteacc}><span class="material-symbols-outlined">
              manage_accounts
            </span> <small>Delete acc</small> </Items>
          </>
        }
      </>
      <Hr />
      Explore

      {/* category in future */}
      {/* <Items><span class="material-symbols-outlined">
        music_note
      </span>Music</Items> */}
      {/* <Items><span class="material-symbols-outlined">
        newspaper
      </span>News</Items> */}
      {/* <Items><span class="material-symbols-outlined">
        settings
      </span>Settings</Items> */}
      {/* <Items><span class="material-symbols-outlined">
        flag
      </span>Report</Items> */}


      <Items onClick={() => setDarkMode(!darkMode)}><span class="material-symbols-outlined">
        touch_app
      </span>
        {darkMode ? "Light" : "Dark"} Mode</Items>

      <Items><span class="material-symbols-outlined">
        help
      </span>Help</Items>
      <Hr />
      <small>
        About &nbsp;&nbsp;Copyright  <br />
        Contactus &nbsp;&nbsp; Creators   <br />Advertise &nbsp;&nbsp;Developers <br />
        &nbsp;&nbsp;PrivacyPolicy & SafetyHow<br />Terms  &nbsp;&nbsp; LearnTube
      </small>

    </Container>
  )
}
