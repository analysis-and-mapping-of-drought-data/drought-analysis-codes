import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Baraj from "./components/Baraj";
import Footer from "./components/Footer";
import BarajDetay from "./components/BarajDetay";
import BarajChart from './components/BarajChart';
import Havza from './components/Havzalar'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/baraj" element={<Baraj />} />
        <Route path="/" element={<Home />} />
        <Route path="/havza" element={<Havza />} />
        <Route path="/baraj" element={<Baraj />} />
        <Route path="/baraj/detay/:baraj_adi" element={<BarajDetay />} />
        <Route path="/baraj/chart/:baraj_adi" element={<BarajChart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
