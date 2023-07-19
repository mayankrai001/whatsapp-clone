import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import "./Chat.css";
import axios from "./axios";


function Chat({messages}) {

  const [input,setInput] = useState("")

  const sendMessage = async (e) =>{
    e.preventDefault();

    await axios.post('/messages/new',{
      message:input,
      name:"Demo App",
      timestamp : "Just Now!!",
      received : false,
    })

    setInput('')

  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar></Avatar>
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map(message =>(
          <p  className={`chat_message ${message.received && "chat_receiver"}`}>
        <span className="chat_name"> {message.name} </span>
        {message.message}
        <span className="chat_timestamp">
          {
          message.timestamp
          }
        </span>
        </p>
        ))}
      </div>
          <div className="chat_footer">
            <InsertEmoticonIcon></InsertEmoticonIcon>
            <form>
              <input value={input} onChange ={e => setInput(e.target.value)}   placeholder="Type a message"
              type="text"/>
              <button onClick = {sendMessage} type="Submit">
                  Send a message
              </button>
            </form>
            <MicIcon></MicIcon>
          </div>

    </div>
  )
}

export default Chat;
