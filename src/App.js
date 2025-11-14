import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import { DarkModeProvider } from './context/DarkModeContext';

export default function App(){
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800'>
          <Navbar />
          <main className='p-6 max-w-6xl mx-auto'>
            <Routes>
              <Route path='/' element={<Dashboard/>} />
              <Route path='/analytics' element={<Analytics/>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  );
}
