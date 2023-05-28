import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {format} from 'timeago.js';

const Info = styled.div`
width:85%;
display:flex;
align-items:center;
gap:15px;
height:fit-content;
`;

const Dot = styled.div`
height:5px;width:5px;border-radius:50%;background-color:${({ theme }) => theme.text};`

const Chanelname = styled.div`
font-size:15px;
font-weight:500;
margin-bottom:10px;
`;
const Timee = styled.p`font-size:12px;`;

const Chanelimg = styled.img`
width:45px;
height:45px;
border-radius:50%;
`;

const Container = styled.div`width:100%;
height:fit-content;
display:flex;gap:20px;margin-bottom:30px`
const Mssg = styled.div`width:90%;`
const Msg = styled.div`margin-bottom:7px;`;

export default function Comment(videoId) {
  const [comments, setcomments] = useState([])
  // const [channel, setchannel] = useState({})

  useEffect(() => {
    const fetcthcomments = async () => {
      // console.log(videoId,"---------------------")

      const res = await axios.get(`http://localhost:8080/api/comment/${videoId.videoId}`);
      setcomments(res.data);
      // console.log(res.data,"ffffffffffffffffffff")
      // console.log(res);
    }
    fetcthcomments();
  }, [videoId]);
  // console.log(comments);
  return (
    <>
      {
        comments?.map(comment => (
          <Container key={comment._id}>
            <Chanelimg src={comment.userId.img}></Chanelimg>
            <Mssg>
              <Info>
                <Chanelname>{comment.userId.name}</Chanelname>
                <Dot />
                <Timee>{format(comment.createdAt)}</Timee>
              </Info>
              <Msg>{comment.desc}</Msg>
              
            </Mssg>
          </Container>
        ))
      }
    </>
  )
}
