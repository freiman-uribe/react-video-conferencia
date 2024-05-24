import React, { useState, useContext } from "react";
import { SocketContext } from "../Context";
import "../styles.css";

const Sidebar = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const renderAccountInfo = () => {
    return (
      <div className="grid-item">
        <div className="typography">Account Info</div>
        <input
          type="text"
          className="text-field"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="margin-top">
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigator.clipboard.writeText(me)}
          >
            <span className="button-icon">📋 Copiar ID</span>
          </button>
        </div>
      </div>
    );
  };

  const renderMakeCallSection = () => {
    return (
      <div className="grid-item">
        <div className="typography">Hacer llamada</div>
        <input
          type="text"
          className="text-field"
          placeholder="ID de la persona para llamar"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <div className="margin-top">
        {callAccepted && !callEnded ? (
          <button
            type="button"
            className="button button-secondary"
            onClick={leaveCall}
          >
            <span className="button-icon">📴 Colgar</span>
          </button>) 
        : ( 
          <button
            type="button"
            className="button button-primary"
            onClick={() => callUser(idToCall)}
          >
            <span className="button-icon">📞 Llamar</span>
          </button>
        )}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="paper">
        <form className="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="grid-container">
            {renderAccountInfo()}
            {renderMakeCallSection()}
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
