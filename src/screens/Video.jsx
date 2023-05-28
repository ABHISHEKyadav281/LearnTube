import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from '../components/Comment';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, like, videoSuccess } from '../redux/videoSlice';
import { sub } from '../redux/userSlice';
import Recomendations from '../components/Recomendations';


const Container = styled.div`display:flex;gap:30px; overflow-x:hidden ;`;
const Content = styled.div`width:100%`;
const Videowraper = styled.video`width:100%;border-radius:8px;overflow:hidden;`
const Title = styled.h2`Margin:2px; margin-bottom:8px;`;
const Details = styled.div`display:flex;justify-content :space-between;`;
const Info = styled.div`display:flex;gap:25px`;
const Chanelimg = styled.img`
width:45px;
height:45px;
border-radius:50%;
`;
const Chanel = styled.div`
font-weight:500;
`;
const Chanelname = styled.div`
height:fit-content;
font-size:15px;
font-weight:500;
margin-bottom:10px;
`;
const Chanelsub = styled.div`
height:fit-content;
font-size:16px;
font-weight:400;
`;
const Subscribe = styled.button`padding:10px 15px;height:fit-content;border-radius:30px`;
const Buttons = styled.div`display:flex;gap:20px;width:40%;align-items:center`;
const Button = styled.div`cursor:pointer;font-size:20px;display:flex;align-items:center;gap:3px;background-color:${({ theme }) => theme.soft};min-width:70px;width:fit-content;height:35px;padding:0 10px;border-radius:30px;justify-content:center;
&:hover{
    background-color:${({ theme }) => theme.textSoft};
} `;

const Newcomment = styled.div`width:100%;gap:25px;margin-bottom:30px;display:flex;alingn-items:center;`;
const Input = styled.input`width:90%;height:100%;background-color:transparent;border:none;font-size:18px;padding:12px; color:${({ theme }) => theme.text}`;




export default function Video({menu,setmenu}) {
    useEffect(() => {
        setmenu("small")
    }, []);

    const currentuser = useSelector((state) => state.user);
    // console.log(currentuser);

    const currentvideo = useSelector((state) => state.video);
    // console.log(currentvideo);

    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    const [chanel, setChanel] = useState({});

    // new comment
    const [desc, setdesc] = useState("")
    const fetchData = async () => {
        try {
            const videoRes = await axios.get(`http://localhost:8080/api/videos/find/${path}`)

            const chanelRes = await axios.get(`http://localhost:8080/api/users/find/${videoRes.data.userId}`)
            dispatch(videoSuccess(videoRes.data))
            setChanel(chanelRes.data)
            // console.log(chanelRes.data);
        } catch (error) {

        }
    }

    useEffect(() => {
       
        fetchData();
    }, [path, dispatch])



    const handleLike = async () => {
        if (!currentuser.currentuser) {
            console.log('Please log in to like this video.');
            return;
        }
        try {
            const res = await axios.post(`http://localhost:8080/api/videos/like/${currentvideo.currentvideo._id}`, { id: currentuser.currentuser._id })
            dispatch(like(currentuser.currentuser._id));
            // console.log(res);
        } catch (error) {

        }
    }

    const handledisLike = async () => {
        if (!currentuser.currentuser) {
            console.log('Please log in to dislike this video.');
            return;
        }
        const res = await axios.post(`http://localhost:8080/api/videos/dislike/${currentvideo.currentvideo._id}`, { id: currentuser.currentuser._id })
        dispatch(dislike(currentuser.currentuser._id));
        // console.log(res);
    }
    
    const handleSubscribe = async () => {
        // console.log(currentuser.currentuser.subscribedUsers);
        console.log(currentuser.currentuser.subscribedUsers);
        console.log(chanel._id)
        currentuser.currentuser.subscribedUsers?.includes(chanel._id) ?
            await axios.post(`http://localhost:8080/api/users/unsub/${chanel._id}`, { suser: currentuser.currentuser._id }) :

            await axios.post(`http://localhost:8080/api/users/sub/${chanel._id}`, { suser: currentuser.currentuser._id });

        dispatch(sub(chanel._id));
    }

    const handleComment = async () => {
        // console.log(currentvideo)
        setdesc("");
        const comm = await axios.post(`http://localhost:8080/api/comment/${currentvideo.currentvideo._id}`, { desc: desc, id: currentuser.currentuser._id })
        // console.log(comm);
        fetchData()
        

    }

    // console.log(chanel);
    // console.log(currentvideo?.currentvideo);

    return (
        <Container style={{width:menu==="big"?"100%":"110%"}}>
            <Content  style={{width:menu==="big"?"100%":"110%"}} >
                <Videowraper src={currentvideo?.currentvideo?.videoUrl} controls>

                </Videowraper>
                <Title>{currentvideo.Title}</Title>
                <Details>
                    <Info>
                        <Chanelimg src={chanel.img}></Chanelimg>
                        <Chanel>
                            <Chanelname>{chanel.name}</Chanelname>
                            <Chanelsub>{chanel.subscribers} &nbsp; • subscribers</Chanelsub>
                        </Chanel>
                        <Subscribe onClick={handleSubscribe}>
                            {currentuser?.currentuser?.subscribedUsers?.includes(chanel._id) ? "Subscribed" : "Subscribe"}
                        </Subscribe>

                    </Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentvideo?.currentvideo?.likes?.includes(currentuser?.currentuser?._id) ?
                                <i class="ri-thumb-up-fill"></i> :
                                <i class="ri-thumb-up-line"></i>}
                            {currentvideo?.currentvideo?.likes?.length}
                        </Button>
                        <Button onClick={handledisLike}>
                            {currentvideo?.currentvideo?.dislikes?.includes(currentuser?.currentuser?._id) ?
                                <i class="ri-thumb-down-fill"></i> :
                                <i class="ri-thumb-down-line"></i>} {currentvideo?.currentvideo?.dislikes?.length}
                        </Button>
                        <Link to="https://api.whatsapp.com/send/?text=https%3A%2F%2Fyoutu.be%2F5uakgZRwDvU&type=custom_url&app_absent=0" style={{ textDecoration: "none", color: "inherit" }}>
                       
                       <Button><i class="ri-share-forward-line"></i></Button>
                       </Link>
                        <Button><span class="material-symbols-outlined">
                            playlist_add
                        </span> save</Button>
                    </Buttons>
                </Details>
                <br />
                <h3>Comments</h3>

                <Newcomment>
                    <Chanelimg src={currentuser?.currentuser?.img}></Chanelimg>
                    <Input placeholder='add new comment...' value={desc} onChange={e => setdesc(e.target.value)} />
                    <p onClick={handleComment} style={{ cursor: "pointer" }}>
                        send
                    </p>
                </Newcomment>
                <Comment videoId={currentvideo?.currentvideo?._id}></Comment>

            </Content>

            <Recomendations tags={currentvideo?.currentvideo?.tags} />
        </Container >
    )
}
