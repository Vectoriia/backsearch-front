import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes,Router,Link } from "react-router-dom";
import Login from './components/Login.js';
import SignUp from './components/SignUp';
import SearchPhotos from "./components/SearchPhotos"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminPage from './components/AdminPage';
import AddImage from './components/AddImage';
import EditImage from './components/EditImage';

function App() {
  return (
    
    <BrowserRouter>
      <div className="App" >
            <Routes>
              <Route  path="/" element={<SignUp />} />
              <Route  path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/search" element={<SearchPhotos />} />
              <Route path="/admin-page" element={<AdminPage/>} />
              <Route path="/add-image" element={<AddImage />} />
              <Route path="/edit-image/:curId" element={<EditImage/>} />
            </Routes>
          </div>
    </BrowserRouter>
  );
}


export default App;
