import { useState } from "react";
import chatbtn from "../assets/chatbtn.png";
import ChatWindow from "./ChatWindow";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[6.5rem] lg:bottom-[4rem] right-12 lg:right-6 sm:right-10 md:right-[8.5rem] z-50 w-[20rem] max-w-[90vw] h-[29rem]">
          <ChatWindow setIsOpen={setIsOpen} />
        </div>
      )}

      <div
        className="fixed bottom-6 right-6 sm:right-10 md:right-16 z-50 flex items-center justify-center w-16 h-16 bg-red-800 hover:bg-red-400 rounded-full shadow-black shadow-lg hover:drop-shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button>
          <img src={chatbtn} alt="chat_avatar" className="w-12" />
        </button>
      </div>
    </>
  );
};

export default ChatButton;
