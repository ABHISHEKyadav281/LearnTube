import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// const baseURL = process.env.REACT_APP_API_URL;

const Container = styled.div`
whidth:100%;
// height:100dvh;
display:flex;
flex-wrap:wrap;
gap:2%;
padding:2% 3.5%;
color:${({ theme }) => theme.text};
`
const Imgs=styled.div`
    width:90px;height:90px;
    border-radius:50%;overflow:hidden;`



export default function Home({ darkMode, setDarkMode,menu,setmenu }) {
  const {currentuser}=useSelector(state=>state.user);
  useEffect(() => {
    setmenu("big")
}, []);

  const [videos, setVideos] = useState([])
  const [chanel, setChanel] = useState([])
  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8080/api/videos/chanel/${path}`);
      // console.log(res.data);
      setChanel(res.data);
    //   const res1 = await axios.get(`http://localhost:8080/api/videos/chanel/${path}`);
    //   // console.log(res.data);
      setChanel(res.data);
      setVideos(res.data.videoId);

    }
    fetchVideos();
  },[])
  console.log(chanel.videoId);
  return (
    <>
    <div style={{display:"flex",justifyContent:"left",gap:"50px",alignItems:"center",paddingLeft:"6%"}}>
        <Imgs><img src={chanel.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} /></Imgs>
        <div style={{display:"block",textAlign:"left"}}>
       <h1 style={{textAlign:"center",lineHeight:".8"}}>{chanel.name}
        </h1>  
        <p style={{lineHeight:".6"}}>subscribers : {chanel.subscribers}</p>
        <p style={{lineHeight:".6"}}>videos : {chanel?.videoId?.length}</p>
        <p style={{lineHeight:".6"}}>Location : {chanel.location}</p>
        </div>
    </div>
    <hr />
    <Container style={{width:menu==="big"?"100%":"110%"}}>
      
      {videos.map(videos => (
          <Card key={videos._id} video={videos} p={"chanel"} />
          ))
        }

    </Container>
     </>
  )
}
