// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import FileUpload from './FileUpload';
import PickzonePage from './PickzonePage';
import AislePage from './AislePage';
import RackPage from './RackPage';

{/* <Route path="/" element={<FileUpload onUploadSuccess={() => {}} />} /> */}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/select-pickzone" element={<PickzonePage />} />
        <Route path="/select-aisle/:pickzone" element={<AislePage />} />
        <Route path="/select-rack/:pickzone/:aisle" element={<RackPage />} />
      </Routes>
    </>
  );
};

export default App;
