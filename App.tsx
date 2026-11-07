import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { SyncEstate } from './pages/SyncEstate';
import { SMB } from './pages/SMB';
import { WebDev } from './pages/WebDev';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="solutions/sync-estate" element={<SyncEstate />} />
        {/* The old Real Estate AI page is now SyncEstate. */}
        <Route path="solutions/real-estate" element={<Navigate to="/solutions/sync-estate" replace />} />
        <Route path="solutions/smb" element={<SMB />} />
        <Route path="solutions/web-dev" element={<WebDev />} />
      </Route>
    </Routes>
  );
};

export default App;