import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
     <Header/>
     <Home/>  
     <Footer/>
    </div>
  );
}

export default App;
