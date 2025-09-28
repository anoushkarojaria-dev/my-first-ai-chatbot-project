import { useState } from 'react';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: name,
      email: email
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <MainApp user={user} onLogout={handleLogout} />;
  }

  return (
    <AuthPage 
      onLogin={handleLogin} 
      onSignup={handleSignup} 
      isLoading={isLoading} 
    />
  );
}

export default App;