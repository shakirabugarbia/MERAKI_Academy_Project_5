import React from "react";
import videoBg from "../../assets/videoBg.mp4";
const Video = () => {
  return (
    <div className="video">
      <video src={videoBg} autoPlay loop muted />
    </div>
  );
};

export default Video;
