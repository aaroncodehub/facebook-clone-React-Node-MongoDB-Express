import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import MoodIcon from "@material-ui/icons/Mood";
import { useStateValue } from "../contextAPI/StateProvider";
import axios from "../axios";
import "./MessageSender.scss";

const MessageSender = () => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);


  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    };
    const savePost = async (postData) => {
        await axios.post('/upload/post', postData)
            .then(res => {
            console.log(res)
        })
}

  const handleSubmit = async (e) => {
    if (image) {
      const imgForm = new FormData();
      imgForm.append("file", image, image.name);
      axios
        .post("/upload/image", imgForm, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data;boundary=${imgForm._boundary}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const postData = {
            text: input,
            imgName: res.data.filename,
            user: user.displayName,
            avatar: user.photoURL,
            timestamp: Date.now(),
          };
          savePost(postData);
        });
    } else {
      const postData = {
        text: input,
        user: user.displayName,
        avatar: user.photoURL,
        timestamp: Date.now(),
      };
      savePost(postData);
    }
    setImage(null);
    setInput("");
  };

    
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="messageSender__input"
            placeholder={`what's on your mind ${user.displayName} ?`}
          />
          <input type="file" onChange={handleChange} />
          <button type="submit" onClick={handleSubmit}>
            Hidden button
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <MoodIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
