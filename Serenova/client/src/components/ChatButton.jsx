import { useState } from "react";
import chatbtn from "../assets/chatbtn.png";
import ChatWindow from "./ChatWindow";
const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex fixed gap-2 w-[20rem] h-[29rem] top-[26rem] left-[90rem] z-50">
      {isOpen && <ChatWindow setIsOpen={setIsOpen}/>}
      <div
        className="fixed flex items-center justify-center w-[4rem] h-[4rem] bg-red-800 hover:bg-red-400 left-[110rem] rounded-full top-[55rem] z-50 shadow-black shadow-lg hover:drop-shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button>
          <img src={chatbtn} alt="chat_avatar" className="w-[3rem]" />
        </button>
      </div>
    </div>
  );
};

export default ChatButton;