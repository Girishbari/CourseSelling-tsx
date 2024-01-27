import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Landing } from './pages';
import { RecoilRoot } from 'recoil';
import { Footer } from './components';


export default function App() {
  return (
    <div className='w-full min-h-full flex flex-col bg-[#FBEAEB]'>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Landing />} />
          </Routes>
        </Router>
        <Footer />
      </RecoilRoot>
    </div>
  );
}
