import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/chatcontainer';
import RightsideBar from '../components/RightsideBar';

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="w-full h-screen sm:px-[5%] sm:py-[5%]">
      <div
        className={`bg-white/10 backdrop-blur-lg border border-white/20 
        rounded-3xl h-full shadow-xl grid overflow-hidden ${
          selectedUser
            ? 'grid-cols-[270px_2.5fr_300px]' // better balance
            : 'grid-cols-[270px_1fr]'
        }`}
      >
        {/* Sidebar */}
        <div className="h-full">
          <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>

        {/* ChatContainer */}
        <div className="h-full overflow-y-auto">
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>

        {/* RightSidebar */}
        {selectedUser && (
          <div className="h-full">
            <RightsideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
