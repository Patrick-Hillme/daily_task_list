import './App.css'
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LogAndReg from './components/LogAndReg';
import Homepage from './components/Homepage';

function App() {

  return (
    <>
      <Routes>
        <Route index element={ <LogAndReg/> }/>
        <Route path='/homepage' element={ <Homepage/> }/>
      </Routes>
    </>
  )
}

export default App
