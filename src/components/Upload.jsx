import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div`
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index:99
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:99999999;background-color:${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 600px;
  height: 720px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;border-radius: 15px;overflow:hidden;
  box-shadow:inset 2px 2px 15px gray;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width:fit-content;
  height:fit-content;
  background-color:red;
  padding:4px 9px;border-radius:50%;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;margin-top:-3px;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #5b4adb;
  color: white;
`;
const Label = styled.label`
  font-size: 16px;padding:0;font-weight:500;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  
  const {currentuser}=useSelector((state)=>state.user);
  // console.log(currentuser._id);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    console.log(currentuser);
    console.log(inputs);
    const res = await axios.post("http://localhost:8080/api/videos", {...inputs, tags,userId:currentuser._id})
    res.status===200 && navigate("/")
    setOpen(false)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video </Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc +"%"
        ) : (
          <Input
            type="file" accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Label>Title:</Label>
        <Input
          type="text" placeholder="Title" name="title"
          onChange={handleChange}
        />
        <Label>Desc:</Label>
        <Desc
          placeholder="Description" name="desc" rows={8}
           onChange={handleChange}
        />
        <Label>Tags:</Label>
        <Input
          type="text" placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file" accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
