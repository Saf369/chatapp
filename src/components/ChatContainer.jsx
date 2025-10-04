import React, { useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const chatEndRef = useRef(null);

  // Manage messages in state for dynamic updates
  const [messages, setMessages] = useState(messagesDummyData);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full">
        <img src={assets.logo_icon} alt="" className="w-16" />
        <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500 flex-shrink-0">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="hidden md:block w-5" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col space-y-3">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === '680f50e4f10f3cd28382ecf9';
          const avatar = isSender ? assets.avatar_icon : assets.profile_martin;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              {!isSender && <img src={avatar} alt="" className="w-7 rounded-full flex-shrink-0" />}

              <div className="flex flex-col max-w-[70%]">
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-full border border-gray-700 rounded-lg"
                  />
                ) : (
                  <p
                    className={`p-2 rounded-lg break-words md:text-sm font-light ${
                      isSender
                        ? 'bg-violet-500/70 text-white rounded-bl-lg rounded-tr-lg'
                        : 'bg-stone-600/30 text-white rounded-br-lg rounded-tl-lg'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <span className="text-xs text-gray-400 mt-1 self-end">{formatMessageTime(msg.createdAt)}</span>
              </div>

              {isSender && <img src={avatar} alt="" className="w-7 rounded-full flex-shrink-0" />}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 left-0 right-0 flex items-center gap-3 p-3 border-t backdrop-blur-md bg-black/20">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            type="text"
            placeholder="send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />

          {/* Image Upload */}
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>

        {/* Send Button */}
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatContainer;
