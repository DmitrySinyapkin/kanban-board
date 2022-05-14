import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Board from './pages/Board/Board';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/' element={ <Board /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
