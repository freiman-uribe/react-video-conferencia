// import React from "react";
// import "./styles.css";
// import VideoPlayer from "./components/VideoPlayer";
// import Sidebar from "./components/Sidebar";
// import Notifications from "./components/Notifications";

// const App = () => {
//   return (
//     <div className="wrapper">
//       <div className="app-bar">
//         <div className="typography header">Meeting</div>
//       </div>
//       <VideoPlayer />
//       <Sidebar>
//         <Notifications />
//       </Sidebar>
//     </div>
//   );
// };

// export default App;

// import React, { useContext, useState } from "react";
// import { SocketContext } from "./Context";
// import "./styles.css";

// const App = () => {
//   const {
//     name: videoPlayerName,
//     callAccepted,
//     myVideo,
//     userVideo,
//     callEnded,
//     stream,
//     call,
//     setName,
//     leaveCall,
//     callUser,
//     answerCall,
//   } = useContext(SocketContext);

//   const {
//     me,
//     name: sidebarName,
//     setName: setSidebarName,
//   } = useContext(SocketContext);

//   const [idToCall, setIdToCall] = useState("");

//   const renderAccountInfo = () => {
//     return (
//       <div className="grid-item">
//         <div className="typography">Nombre del asistente</div>
//         <input
//           type="text"
//           className="text-field"
//           placeholder="Nombre"
//           value={sidebarName}
//           onChange={(e) => setSidebarName(e.target.value)}
//         />
//         {me}
//         <div className="margin-top">
//           <button
//             type="button"
//             className="button button-primary"
//             onClick={() => navigator.clipboard.writeText(me)}
//           >
//             <span className="button-icon">📋 Copiar ID</span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderMakeCallSection = () => {
//     return (
//       <div className="grid-item">
//         <div className="typography">Hacer llamada</div>
//         <input
//           type="text"
//           className="text-field"
//           placeholder="ID de la persona para llamar"
//           value={idToCall}
//           onChange={(e) => setIdToCall(e.target.value)}
//         />
//         <div className="margin-top">
//         {callAccepted && !callEnded ? (
//           <button
//             type="button"
//             className="button button-secondary"
//             onClick={leaveCall}
//           >
//             <span className="button-icon">📴 Colgar</span>
//           </button>) 
//         : ( 
//           <button
//             type="button"
//             className="button button-primary"
//             onClick={() => callUser(idToCall)}
//           >
//             <span className="button-icon">📞 Llamar</span>
//           </button>
//         )}
//         </div>
//       </div>
//     );
//   };

//   const renderOwnVideo = () => {
//     return (
//       <div className="paper">
//         <div>
//           <video playsInline muted ref={myVideo} autoPlay className="video" />
//           <div className="typography">{videoPlayerName || ""}</div>
//         </div>
//       </div>
//     );
//   };

//   const renderOtherUserVideo = () => {
//     return (
//       <div className="paper">
//         <div>
//           <video playsInline ref={userVideo} autoPlay className="video" />
//           <div className="typography">{call.name || ""}</div>
//         </div>
//       </div>
//     );
//   };

//   const renderNotification = () => {
//     return (
//       <div className="notifications">
//         <h1 className="call-message">{`"${call.name}" está llamando`}</h1>
//         <button className="answer-button" onClick={answerCall}>
//           Contestar
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="wrapper">
//       <div className="app-bar">
//         <div className="typography header">Meeting</div>
//       </div>
//       <div className="grid-container">
//         {stream && renderOwnVideo()}
//         {callAccepted && !callEnded && renderOtherUserVideo()}
//       </div>
//       <div className="container">
//         <div className="paper">
//           <form className="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
//             <div className="grid-container">
//               {renderAccountInfo()}
//               {renderMakeCallSection()}
//             </div>
//           </form>
//           {call.isReceivingCall && !callAccepted && renderNotification()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "./Context";
import "./styles.css";

const App = () => {
  const {
    name: videoPlayerName,
    calls,
    myVideo,
    stream,
    leaveCall,
    callUser,
  } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current.srcObject = currentStream;
      });
  }, []);

  const renderAccountInfo = () => {
    return (
      <div className="grid-item">
        <div className="typography">Nombre del asistente</div>
        <div className="margin-top">
          <button
            type="button"
            className="button button-primary"
            onClick={leaveCall}
          >
            <span className="button-icon">📴 Dejar reunión</span>
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
          <button
            type="button"
            className="button button-primary"
            onClick={() => callUser(idToCall)}
          >
            <span className="button-icon">📞 Llamar</span>
          </button>
        </div>
      </div>
    );
  };

  const renderOwnVideo = () => {
    return (
      <div className="paper">
        <div>
          <video playsInline muted ref={myVideo} autoPlay className="video" />
          <div className="typography">{videoPlayerName || ""}</div>
        </div>
      </div>
    );
  };

  const renderOtherUserVideos = () => {
    return (
      <div className="grid-item">
        {calls||[].map(call => (
          <div key={call.id} className="paper">
            <div>
              <video playsInline ref={call.userVideo} autoPlay className="video" />
              <div className="typography">{call.name || ""}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="app-bar">
        <div className="typography header">Meeting</div>
      </div>
      <div className="grid-container">
        {stream && renderOwnVideo()}
        {renderOtherUserVideos()}
      </div>
      <div className="container">
        <div className="paper">
          <form className="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="grid-container">
              {renderAccountInfo()}
              {renderMakeCallSection()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
