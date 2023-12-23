import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Baraj from "./components/Baraj";
import Footer from "./components/Footer";
import BarajDetay from "./components/BarajDetay";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/baraj" element={<Baraj />} />
        {/* Diğer rotaları ekleyin */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/baraj/detay/:baraj_adi" render={(props) => <BarajDetay BarajDetay={BarajDetay} {...props} /> } element={<BarajDetay />} /> */}
        <Route path="/baraj/detay/:baraj_adi" element={<BarajDetay BarajDetay={BarajDetay} />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
