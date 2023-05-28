import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from "timeago.js";
import axios from 'axios';

const Container = styled.div`
width:${(props) => props.type === "sm" ? "400px" : "100%"};
gap:${(props) => props.type === "sm" && "10px"};
border-radius:15px;
// border:1px solid red;
height:${(props) => props.type === "sm" ? "16dvh" : "38dvh"};
margin-bottom:${(props) => props.type === "sm" ? "25px" : "45px"}; 
color:${({ theme }) => theme.text};
display:${(props) => props.type === "sm" && "flex"};
// background-color:red;
`;

const Image = styled.img`
width:${(props) => props.type === "sm" ? "400px" : "100%"};
height:${(props) => props.type === "sm" ? "100%" : "70%"};
border:1px solid ${({ theme }) => theme.textSoft};
object-fit:cover;
margin-bottom:12px ;
overflow:hidden;
border-radius:15px;
`;
const Chanel = styled.div`
width:100%;
height:${(props) => props.type === "sm" ? "100%" : "30%"};
display:flex;
gap:4%;
`;

const Chanelimg = styled.img`
width:${(props) => props.type === "sm" ? "0px" : "45px"};
overflow:hidden;
height:45px;
border-radius:50%;
`;

const Videoinfo = styled.div`
width:85%;
height:100%;
`;
const Videoname = styled.div`
max-height:${(props) => props.type === "sm" ? "40%" : "45%"};
font-size:16px;
font-weight:700;
overflow:hidden;
`;
const Chanelname = styled.div`
height:25%;
font-size:15px;
font-weight:500;
`;
const Videoviews = styled.div`
height:fit-content;
display:flex;
align-items:center;
font-size:16px;
font-weight:400;
`;


export default function Card({ type, video,p }) {
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetcthChannel = async () => {
      const res = await axios.get(`http://localhost:8080/api/users/find/${video.userId}`);
      setChannel(res.data);
      // console.log(res)
    };
    fetcthChannel();
  }, [video.userId])
  // console.log(channel);

  const addview = (vi) => {
    // console.log(vi);
    axios.get(`http://localhost:8080/api/videos/view/${vi}`)
  }
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none", width: "32%" }}>
      <Container type={type} onClick={() => addview(video._id)}>
        <Image src={video.imgUrl} type={type} />
        <>{
          p==="chanel"&&<h3 style={{padding:"0",paddingLeft:"20px",lineHeight:".8",marginTop:"-3px"}}>{video.desc}</h3>
        }
        </>
        
        <Chanel type={type}>
          <Link to={`/chanel/${video.userId}`} style={{ textDecoration: "none" }}>
            <Chanelimg src={channel.img} type={type} />
          </Link>
          <Videoinfo>
            <Videoname type={type}> {video.title}</Videoname>
            <Chanelname type={type}>{channel.name}</Chanelname>
            <Videoviews>{video.views} views &nbsp;&nbsp;• &nbsp; {format(video.createdAt)}</Videoviews>
          </Videoinfo>
        </Chanel>
      </Container>
    </Link>
  )
}
