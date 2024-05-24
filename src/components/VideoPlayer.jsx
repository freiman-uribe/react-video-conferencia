import React, { useContext } from "react";
import { SocketContext } from "../Context";
import "../styles.css";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  const renderOwnVideo = () => {
    return (
      <div className="paper">
        <div>
          <video playsInline muted ref={myVideo} autoPlay className="video" />
          <div className="typography">{name || ""}</div>
        </div>
      </div>
    );
  };

  const renderOtherUserVideo = () => {
    return (
      <div className="paper">
        <div>
          <video playsInline ref={userVideo} autoPlay className="video" />
          <div className="typography">{call.name || ""}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid-container">
      {stream && renderOwnVideo()}
      {callAccepted && !callEnded && renderOtherUserVideo()}
    </div>
  );
};

export default VideoPlayer;
