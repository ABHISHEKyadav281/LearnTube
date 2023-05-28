import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Sub() {
  const currentuser = useSelector(state => state.user)
  const [following, setfollowing] = useState([]);
  
  useEffect(() => {
    const fecthfollowin = async () => {
      if (!currentuser) {
        alert("please signin first");
        console.log("please login first")
      }
      else {
        // console.log(currentuser.currentuser._id,"first")
        const flow = await axios.get(`http://localhost:8080/api/users/follow/${currentuser.currentuser._id}`)
        setfollowing(flow.data.subscribedUsers
        );
        // console.log(flow.data.subscribedUsers, "f")
      }
    }
    fecthfollowin();
  }, [currentuser]);
  console.log(currentuser.currentuser)
  return (
    <div style={{ padding: "10px" }}>
      {following?.map(suser => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px", height: "8dvh", marginBottom: "10px" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden" }}>
            <img src={suser.img} alt="" style={{ objectFit: "cover" }} />
          </div>
          <h2>{suser.name}</h2>
          <h5>{suser.subscribers}  • Subscribers</h5>
          <h5>{suser.videoId.length}  • Videos</h5>

        </div>

      ))}
      {
        following ? " " : (
          <>
            <hr />
            <h1>New videos starting to you</h1>
            <p>Subscribe to get the latest videos from channels that you love.</p>
            <hr />
          </>
        )
      }

    </div>
  )
}
