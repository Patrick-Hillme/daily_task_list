import './App.css'
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LogAndReg from './components/LogAndReg';

function App() {

  return (
    <>
      <Routes>
        <Route index element={ <LogAndReg/> }/>
      </Routes>
    </>
  )
}

export default App
