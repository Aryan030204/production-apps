import { useState } from "react";
import chatbtn from "../assets/chatbtn.png";
import ChatWindow from "./ChatWindow";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 md:bottom-32 md:right-10 lg:bottom-36 lg:right-12 xl:bottom-40 xl:right-14 z-50">
          <ChatWindow setIsOpen={setIsOpen} />
        </div>
      )}

      {/* Floating Chat Button */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:bottom-12 xl:right-12 w-16 h-16 bg-red-800 hover:bg-red-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button>
          <img src={chatbtn} alt="chat_avatar" className="w-10" />
        </button>
      </div>
    </>
  );
};

export default ChatButton;
