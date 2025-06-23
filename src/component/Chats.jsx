import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { connectionRequest } from "../utils/socket";

function Chats() {
  const User = useSelector((state) => state.user);
  const userId = User?._id;
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetuserId } = useParams();
  useEffect(() => {
    const socket = connectionRequest();
    socket.emit("joinRoom", { userId, targetuserId });
    socket.on("recieveMessage", ({ firstName, text }) => {
        console.log("received message", firstName, text);
        setMessage((prevMessages) => [...prevMessages, {firstName, text}]);
      });
  }, [userId, targetuserId]);

  const sendMessage = () => {
    const socket = connectionRequest();
    socket.emit("joinRoom",{userId, targetuserId});
    socket.emit("sendMessage", {
      userId,
      targetuserId,
      firstName: User?.firstName,
      text: newMessage,
    });
    setNewMessage("");
  }
  return (
    // <div className="flex flex-col mt-[7%]  border-2 mx-auto border-gray-600 rounded-lg shadow-lg w-3/4 h-auto">
    //   <h1 className="text-2xl p-[2%] border border-gray-600 ">Chats</h1>
    //   {/* message */}
    //   <div className="flex flex-1 border flex-col border-gray-600 p-[2%] overflow-y-auto">
    //     {message.map((msg, index)=>{
    //       return(<div className="chat chat-start" key={index}>
    //       <div className="chat-image avatar">
    //         <div className="w-10 rounded-full">
    //           <img
    //             alt="Tailwind CSS chat bubble component"
    //             src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-header">
    //         {msg.firstName}
    //         <time className="text-xs opacity-50">12:45</time>
    //       </div>
    //       <div className="chat-bubble">{msg.text}</div>
    //       <div className="chat-footer opacity-50">Delivered</div>
    //     </div>)
    //     })}
        
    //   </div>
    //   {/*footer*/}
    //   <div className="w-full flex items-center justify-between  border-t border-gray-600 p-2">
    //     <input
    //       value={newMessage}
    //       onChange={(e) => setNewMessage(e.target.value)}
    //       className="flex flex-1 px-2 py-2"
    //       type="text"
    //     />
    //     <button
    //       onClick={sendMessage}
    //       className="border border-primary bg-blue-500 px-2 ml-2 py-2 rounded text-white"
    //     >
    //       Send...
    //     </button>
    //   </div>
    // </div>
    <div className="w-3/6 flex flex-col mt-20 border-2 mx-auto bg-gray-600 rounded-lg shadow-lg  max-h-[80vh] overflow-hidden h-[75vh]">
  <h1 className="text-2xl font-semibold p-4 border-b border-gray-600  text-gray-800">
    Chats
  </h1>

  {/* Chat messages */}
  <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto border">
    {message.map((msg, index) => (
      <div className="flex items-start gap-3" key={index}>
        <img
          className="w-10 h-10 rounded-full border "
          src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          alt="profile"
        />
        <div className="flex flex-col">
          <div className="text-sm font-semibold  text-white">
            {msg.firstName}{" "}
            <span className="text-xs text-gray-400 ml-2">12:45</span>
          </div>
          <div className="bg-green-500 px-4 py-2 rounded-xl text-sm text-gray-800 max-w-[70%]">
            {msg.text}
          </div>
          <div className="text-xs text-gray-400 mt-1">Delivered</div>
        </div>
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
