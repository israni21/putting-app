import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleLogin = () => {
    if (selectedTab === 'admin') {
      // Perform admin login logic here
      navigate('/admin');
    } else if (selectedTab === 'user') {
      // Perform user login logic here
      navigate('/select-pickzone');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-8 lg:p-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          <button
            className={`p-4 ${selectedTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-mulish rounded-lg mr-4`}
            onClick={() => handleTabChange('admin')}
          >
            Admin
          </button>
          <button
            className={`p-4 ${selectedTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-mulish rounded-lg`}
            onClick={() => handleTabChange('user')}
          >
            User
          </button>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="w-full font-mulish p-4 border border-gray-300 rounded-lg shadow-sm mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full font-mulish p-4 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full font-mulish p-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
