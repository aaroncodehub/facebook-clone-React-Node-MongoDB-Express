import React, { useState, useEffect } from "react";
import StoryReel from "./StoryReel";
import "./Feed.scss";
import MessageSender from "./MessageSender";
import axios from "../axios";
import Pusher from "pusher-js";
import Post from "./Post";

const pusher = new Pusher("cdf43416aafbcf93fc2c", {
  cluster: "ap4",
});

const Feed = () => {
  const [posts, setPosts] = useState([]);


  const syncFeed = () => {
    axios.get("/retrieve/posts").then((res) => {
      setPosts(res.data);
    });
  };
  useEffect(() => {
    syncFeed();
  }, []);
  useEffect(() => {
    // subscript channel named POSTS and bind a function to an event named INSERTED
    const channel = pusher.subscribe("posts");
    channel.bind("inserted", function (data) {
      syncFeed();
      //   alert(JSON.stringify(data));
    });
  }, []);
    
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {posts.map((post) => (
        <Post
          key={post.id}
          profilePic={post.profilePic}
          message={post.message}
          timestamp={post.timestamp}
          username={post.username}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default Feed;
