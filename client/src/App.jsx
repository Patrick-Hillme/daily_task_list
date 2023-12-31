import './App.css'
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import LogAndReg from './components/LogAndReg';
import Homepage from './components/Homepage';
import Swat from './components/Swat';
import Merchandising from './components/Merchandising';
import Inventory from './components/Inventory';
import EditTask from './components/EditTask';
import ViewTask from './components/viewTask';

function App() {

  return (
    <>
      <Routes>
        <Route index element={ <LogAndReg/> }/>
        <Route path='/homepage' element={ <Homepage/> }/>
        <Route path='/swat' element={ <Swat/> }/>
        <Route path='/inventory' element={ <Inventory/> }/>
        <Route path='/merchandising' element={ <Merchandising/> }/>
        <Route path='/editTask/:id' element={ <EditTask/> }/>
        <Route path='/viewTask/:id' element={ <ViewTask/> }/>
      </Routes>
    </>
  )
}

export default App
