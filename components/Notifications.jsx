import React, { useContext } from "react";
import { SocketContext } from "../Context";
import "../styles.css";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  const renderNotification = () => {
    return (
      <div className="notifications">
        <h1 className="call-message">{`"${call.name}" está llamando`}</h1>
        <button className="answer-button" onClick={answerCall}>
          Contestar
        </button>
      </div>
    );
  };

  return <>{call.isReceivingCall && !callAccepted && renderNotification()}</>;
};

export default Notifications;
