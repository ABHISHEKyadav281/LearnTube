import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from "timeago.js";



const Container = styled.div`
width:360px;border-radius:15px;
height:"45dvh";
margin-bottom:"45px"; 
color:${({ theme }) => theme.text};
`;
const Image = styled.img`
width:100%;
height:202px;
object-fit:cover;
margin-bottom:12px ;
border-radius:15px;
`;
const Videoinfo = styled.div`
width:85%;
height:100%;
`;
const Videoname = styled.div`
max-height:"45%"};
font-size:16px;
font-weight:700;
overflow:hidden;
`;
const Videoviews = styled.div`
height:fit-content;
display:flex;
align-items:center;
font-size:16px;
font-weight:400;
`;


export default function YourVideo() {

    const { currentuser } = useSelector(state => state.user)

    const [uv, setuv] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:8080/api/videos/uv/${currentuser._id}`);
            // console.log(res.data);
            setuv(res.data);

        }
        fetchVideos();
    }, [currentuser])
    // console.log(uv);

    const handleDeleteVideo = async(videoId) => {
        console.log(videoId);
        await axios.post(`http://localhost:8080/api/videos/${videoId}`,{})

        const res = await axios.get(`http://localhost:8080/api/videos/uv/${currentuser._id}`);
        // console.log(res.data);
        setuv(res.data);
    }
    // console.log(uv[1]._id)
    return (
        <div>
            {uv?.map(uvv => ( 
                <Container >
                    <Link to={`/video/${uvv._id}`} style={{ textDecoration: "none" }}>
                        <Image src={uvv.imgUrl} />
                    </Link>
                    <Videoinfo>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Videoname > {uvv.title}  </Videoname>
                            <span class="material-symbols-outlined" onClick={()=>handleDeleteVideo(uvv._id)} style={{cursor:"pointer"}}>
                                delete
                            </span>
                        </div>
                        <p>{uvv.desc}</p>
                        <Videoviews>{uvv.views} views &nbsp;&nbsp;• &nbsp; {format(uvv.createdAt)}</Videoviews>
                    </Videoinfo>
                    <br /><br />

                </Container>
            ))}
            <br />
            <hr />
             <p style={{textAlign:"center"}}>
             no more videos
                </p> 
               <hr />
        </div>
    )
}
