import React, { useState } from 'react';
import './App.css';
import{ BrowserRouter, Link, Route, Routes} from "react-router-dom"
import { LogIn } from './components/LogIn';
import { Documents } from './components/Documents';
import { EditDocument } from './components/EditDocument';
import { ShowDocument } from './components/ShowDocument';
import { NewDocument } from './components/NewDocument';
import useToken from './components/useToken';

export function logOut(){
  localStorage.removeItem("token");
  window.location.reload();
}

function App() {

  const { token, setToken } = useToken();
  if(!token){
    return <div className="wrapper"><BrowserRouter><Routes><Route path="/*" element={<LogIn setToken={setToken} />} /></Routes></BrowserRouter></div>
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Documents />} />
          <Route path='/create' element={<NewDocument />} />
          <Route path='/:id' element={<ShowDocument />} />
          <Route path='/edit/:id' element={<EditDocument />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
