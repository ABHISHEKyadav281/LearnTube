import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`height:100%;padding-left:5px`;

export default function Recomendations({ tags }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchvideo = async () => {
            // console.log(tags)
            const res = await axios.get(`http://localhost:8080/api/videos/tags?tags=${tags}`);
            setVideos(res.data);
            console.log(res.data,"rec");
        }
        fetchvideo();
    }, [tags])

    return (
        <Container>
            {videos.map(video => (
                <Card type="sm" key={video._id} video={video}></Card>
            ))
            }
        </Container>
    )
}
