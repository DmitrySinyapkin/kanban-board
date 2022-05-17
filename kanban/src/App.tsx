import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Board from './pages/Board/Board';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  const isMobile = window.innerWidth < 768

  return (
    <div className="App">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Board />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
