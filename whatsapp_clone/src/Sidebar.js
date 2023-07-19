import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./sidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src=""></Avatar>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_SearchContainer">
          <SearchOutlined></SearchOutlined>
          <input placeholder="Search or start new chat" type="text">

          </input>
        </div>
      </div>
        <div className="sidebar_chats">
            <SidebarChat></SidebarChat>
            <SidebarChat></SidebarChat>
            <SidebarChat></SidebarChat>
        </div>
    </div>
  );
}

export default Sidebar;
