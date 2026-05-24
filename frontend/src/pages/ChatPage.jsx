import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Navbar from '../components/Navbar.jsx';
import ChatList from '../components/ChatList.jsx';
import ChatBox from '../components/ChatBox.jsx';
import SearchModal from '../components/SearchModal.jsx';
import { ChatContext } from '../context/ChatContext.jsx';
import useSocket from '../hooks/useSocket.js';

const ChatPage = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { selectedChat } = useContext(ChatContext);
  
  // Initialize socket connection
  useSocket();

  return (
    <div className="h-screen flex flex-col bg-surface">
      <Navbar onSearchClick={() => setShowSearchModal(true)} />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Chat List Panel - Resizable */}
          <Panel
            defaultSize={25}
            minSize={20}
            maxSize={40}
            className="hidden md:block"
          >
            <ChatList />
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="hidden md:block w-1 bg-white/5 hover:bg-accent/50 transition-colors cursor-col-resize relative group">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-accent/0 group-hover:bg-accent transition-colors" />
          </PanelResizeHandle>

          {/* Chat Box Panel */}
          <Panel defaultSize={75} minSize={60}>
            {selectedChat ? (
              <ChatBox />
            ) : (
              <div className="h-full flex items-center justify-center bg-surface">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-4 px-4"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto backdrop-blur-xl border border-white/10">
                    <MessageSquare className="w-12 h-12 text-text-muted" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                      Select a chat to start messaging
                    </h3>
                    <p className="text-text-muted text-sm">
                      Choose a conversation from the left or search for users
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </Panel>
        </PanelGroup>

        {/* Mobile View - Show Chat List or Chat Box */}
        <div className="md:hidden h-full">
          {selectedChat ? (
            <ChatBox />
          ) : (
            <ChatList />
          )}
        </div>
      </div>

      {showSearchModal && (
        <SearchModal onClose={() => setShowSearchModal(false)} />
      )}
    </div>
  );
};

export default ChatPage;
