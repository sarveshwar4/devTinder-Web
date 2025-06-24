import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connectionRequest } from "../utils/socket";
import BASE_URL from "../utils/constansts";
import axios from "axios";

function Chats() {
  const socketref = useRef(null);
  const User = useSelector((state) => state.user);
  const userId = User?._id;
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const { targetuserId } = useParams();
  const navigate = useNavigate();

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(
        BASE_URL + "/chat" + "/" + `${targetuserId}`,
        {
          withCredentials: true,
        }
      );
      const chatmessages = chat.data.message.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });
      console.log("chat messages", chatmessages);
      setMessage(chatmessages);
      console.log("chat", chat.data.message);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId || !targetuserId) return;

    const socket = connectionRequest();
    socketref.current = socket;

    socket.emit("joinRoom", {userId, targetuserId});

    socket.emit("checkOnline", targetuserId);
    socket.on("isOnline", ({targetuserId, isOnline})=>{
      setIsOnline(isOnline)
    });
    socket.on("joinRoomFailed", (message) => {
      console.error("Failed to join room:", message);
      navigate("/connection");
    });
    socket.on("recieveMessage", ({ firstName, text }) => {
      console.log("received message", firstName, text);
      setMessage((prevMessages) => [...prevMessages, { firstName, text }]);
    });

    return()=>{
      socket.disconnect();
    }
  }, [userId, targetuserId]);

  const sendMessage = () => {
    // const socket = connectionRequest();
    const socket = socketref.current;
    //socket.emit("joinRoom", { userId, targetuserId });
    socket.emit("sendMessage", {
      userId,
      targetuserId,
      firstName: User?.firstName,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="w-3/6 flex flex-col mt-20 border-2 mx-auto bg-gray-600 rounded-lg shadow-lg  max-h-[80vh] overflow-hidden h-[75vh]">
      <h1 className="text-2xl font-semibold p-4 border-b border-gray-600  text-gray-800">
        Chats
      </h1>


      <div className="*:[grid-area:1/1] mb-3 flex flex-row items-center gap-3.5">
        <div className="relative w-3 h-3 ml-2 mb-3">
          <div
            className={`status animate-ping ${
              isOnline ? "bg-green-500" : "bg-red-500"
            } absolute rounded-full w-full h-full`}
          ></div>
          <div
            className={`status ${
              isOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full w-full h-full`}
          ></div>
        </div>
        <span
          className={`text-sm font-semibold ${
            isOnline ? "text-green-500" : "text-red-500"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>



      {/* Chat messages */}
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto border">
        {message.map((msg, index) => (
          <div
            className={
              "chat " +
              (msg.firstName === User.firstName ? "chat-end" : "chat-start")
            }
            key={index}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border">
                <img
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  alt="profile"
                />
              </div>
            </div>
            <div className="chat-header text-white">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-2">12:45</time>
            </div>
            <div className="chat-bubble bg-green-500 text-gray-800">
              {msg.text}
            </div>
            <div className="chat-footer opacity-50 text-xs">Delivered</div>
          </div>
        ))}
      </div>
      {/* Chat input */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-500 font-bold px-4 py-2 rounded-lg text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chats;
