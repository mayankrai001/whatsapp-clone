import { Avatar } from '@mui/material';
import React from 'react';
import "./sidebarChat.css";

function sidebarChat() {
  return (
    <div className = "SidebarChat">
        <Avatar/>
    <div className = "SidebarChat_info">
        <h2>Room Name</h2>
        <p>This is the last message</p>
    </div>
    </div>
  )
}

export default sidebarChat;
