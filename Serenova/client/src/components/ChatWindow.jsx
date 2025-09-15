/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import bot_avatar from "../assets/bot_avatar.png";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import loader from "../assets/loader.gif";

const ChatWindow = ({ setIsOpen }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [resLoading, setResLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const generateGuestId = () => {
    return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
  };

  const fetchConversation = async () => {
    try {
      let res;
      const guestUser = JSON.parse(sessionStorage.getItem("guest_user"));

      if (!user && !guestUser) {
        const guestId = generateGuestId();
        res = await axios.get(`${SERVER_URL}/${guestId}/chat/conversation/get`);
        if (res.data.guest) {
          sessionStorage.setItem("guest_user", JSON.stringify(res.data.guest));
        }
      } else if (guestUser && !user) {
        res = await axios.get(`${SERVER_URL}/${guestUser._id}/chat/conversation/get`);
      } else {
        res = await axios.get(`${SERVER_URL}/${user._id}/chat/conversation/get`);
      }

      if (res.data.data.length > 0) {
        setMessages(res.data.data[0].messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendMsg = async (text) => {
    if (!text.trim()) return;
    try {
      setResLoading(true);
      const guestUser = JSON.parse(sessionStorage.getItem("guest_user"));
      const userId = user ? user._id : guestUser?._id;

      await axios.post(SERVER_URL + "/chat/message/send", {
        userId,
        text,
      });

      setMsg("");
      fetchConversation();
    } catch (err) {
      console.log(err);
    } finally {
      setResLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className={`flex flex-col justify-between w-full h-full max-h-[70vh] sm:max-h-full bg-red-200 rounded-2xl rounded-br-none shadow-2xl drop-shadow-2xl transition-all duration-300 ease-in-out ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-slate-800 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <img src={bot_avatar} alt="bot_dp" className="w-8 h-8 rounded-full bg-purple-100 p-1" />
          <h1 className="text-xl font-semibold text-purple-200">SerenAI</h1>
        </div>
        <button
          className="w-8 h-8 rounded-full bg-white text-black hover:bg-black hover:text-white transition"
          onClick={handleClose}
        >
          X
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
        {messages.map((i, j) =>
          i.sender === "bot" ? (
            <div key={j} className="flex items-start gap-2">
              <img src={bot_avatar} className="w-8 h-8" />
              <div className="bg-purple-600 text-white p-2 rounded-xl rounded-tl-none max-w-[80%]">
                <p>{i.text}</p>
              </div>
            </div>
          ) : (
            <div key={j} className="flex justify-end">
              <div className="bg-gray-700 text-white p-2 rounded-xl rounded-br-none max-w-[80%]">
                <p>{i.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-2 border-t sticky bottom-0 bg-red-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow h-10 px-3 rounded-md border border-gray-400 focus:outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMsg(msg)}
        />
        <button
          onClick={() => sendMsg(msg)}
          className="flex items-center justify-center w-10 h-10 bg-black rounded-md hover:bg-gray-800"
        >
          {resLoading ? <img src={loader} className="w-5 h-5" /> : <IoMdSend color="white" size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
