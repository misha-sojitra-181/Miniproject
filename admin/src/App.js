import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout and Pages
import Layout from './components/Layout';
import Login from './components/login';
import Dashboard from './components/dashboard';

import Homem from './components/Homem';
import Createm from './components/Createm';
import Updatem from './components/Updatem';
import Readm from './components/Readm';

import Homew from './components/Homew';
import Createw from './components/Createw';
import Updatew from './components/Updatew';
import Readw from './components/Readw';

import Mobilep from './components/Mobilep';
import Wifip from './components/Wifip';

import Viewuser from './components/Viewuser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Login />} />

        {/* Protected / Layout Routes */}
        <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />

        {/* Mobile Plans */}
        <Route path='/Homem' element={<Layout><Homem /></Layout>} />
        <Route path='/createm' element={<Layout><Createm /></Layout>} />
        <Route path='/updatem/:id' element={<Layout><Updatem /></Layout>} />
        <Route path='/readm/:id' element={<Layout><Readm /></Layout>} />

        {/* WiFi Plans */}
        <Route path='/homew' element={<Layout><Homew /></Layout>} />
        <Route path='/createw' element={<Layout><Createw /></Layout>} />
        <Route path='/updatew/:id' element={<Layout><Updatew /></Layout>} />
        <Route path='/readw/:id' element={<Layout><Readw /></Layout>} />

        {/* Other Pages */}
        <Route path='/mobilep' element={<Layout><Mobilep /></Layout>} />
        <Route path='/wifip' element={<Layout><Wifip /></Layout>} />

        {/* user data */}
         <Route path='/Viewuser' element={<Layout><Viewuser /></Layout>} />

        {/* Fallback route */}
        <Route path='*' element={<Layout><h2 className="text-center mt-5">Page Not Found</h2></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
