import React from 'react';
import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {

  return (
    <>
      <div className='App'>
        <Header/>

        <HomePage/>

        <Footer/>
      </div>
    </>
  )
}

export default App
