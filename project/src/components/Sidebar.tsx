import { User, LogOut, MessageCircle, Settings, HelpCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SidebarProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar = ({ user, isOpen, onClose, onLogout }: SidebarProps) => {
  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-sm border-r border-purple-100 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* User Info */}
          <div className="p-6 border-b border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-purple-800">{user.name}</h2>
                <p className="text-sm text-purple-600/70">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">New Chat</span>
              </button>
              
              <div className="pt-4">
                <h3 className="text-xs font-medium text-purple-600/60 uppercase tracking-wider mb-2">
                  Recent Chats
                </h3>
                <div className="space-y-1">
                  {['AI Writing Assistant', 'Project Planning', 'Learning JavaScript'].map((chat, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 truncate"
                    >
                      {chat}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-purple-100 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </button>
            
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;