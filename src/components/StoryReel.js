import React from "react";
import Story from "./Story";
import './StoryReel.scss'

const StoryReel = () => {
  return (
    <div className="storyReel">
      <Story
        image="https://images.unsplash.com/photo-1604063746573-aa6459c2e01e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        profileSrc="https://images.unsplash.com/photo-1603880627100-4bb6535790e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        title="Abby"
      />
      <Story
        image="https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        profileSrc="https://images.unsplash.com/photo-1602652295575-fe1b47cff6b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        title="Aaron"
      />
      <Story
        image="https://images.unsplash.com/photo-1604013149166-246f5f8871cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=927&q=80"
        profileSrc="https://images.unsplash.com/photo-1604073788733-f01b27fe34cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        title="Jeff"
      />
      <Story
        image="https://images.unsplash.com/photo-1604034731382-5b17cdbbf3be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        profileSrc="https://images.unsplash.com/photo-1603759039427-8f6d7525330d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80"
        title="Sean"
      />
      <Story
        image="https://images.unsplash.com/photo-1604048774551-ff9622fecfde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        profileSrc="https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        title="Coco"
      />
    </div>
  );
};

export default StoryReel;
