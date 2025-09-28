import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ChatArea from './ChatArea';
import Sidebar from './Sidebar';

interface User {
  id: string;
  name: string;
  email: string;
}

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

const MainApp = ({ user, onLogout }: MainAppProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={onLogout}
      />

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg font-semibold text-purple-800">
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm text-purple-600/70">
                How can I assist you today?
              </p>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <ChatArea />
      </div>
    </div>
  );
};

export default MainApp;