import React from "react";
import "./styles.css";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const App = () => {
  return (
    <div className="wrapper">
      <div className="app-bar">
        <div className="typography header">Meeting</div>
      </div>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
