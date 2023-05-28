import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'
import { useSelector } from 'react-redux'
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


export default function Home({ type, darkMode, setDarkMode,menu,setmenu }) {
  const {currentuser}=useSelector(state=>state.user);

  const [videos, setVideos] = useState([])


  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8080/api/videos/${type}`);
      // console.log(res.data);
      setVideos(res.data);

    }
    setmenu("big")
    fetchVideos();
  }, [type])
  // console.log(currentuser);
  return (
    <Container style={{width:menu==="big"?"100%":"110%"}}>
      
      {videos.map(videos => (
        <Card key={videos._id} video={videos}  />
      ))
      }

    </Container>
  )
}
