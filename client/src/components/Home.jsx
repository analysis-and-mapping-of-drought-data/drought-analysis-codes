import React, { useState, useEffect } from "react";
import TurkeyMap from "turkey-map-react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [iller, setIller] = useState([]);

  useEffect(() => {
    // İllerin verilerini çek
    axios.get("http://localhost:3001/il")
      .then((response) => setIller(response.data))
      .catch((error) => console.error("Error fetching iller:", error));
  }, []);

  const handleMapClick = (city) => {
   
    const plaka = city.plateNumber; // Harita üzerinden gelen il kodu
    // Haritadan bir şehire tıklandığında ilgili verileri çek
    axios.get(`http://localhost:3001/il/${plaka}`)
      .then((response) => {
        const data = response.data;
        
        if (data && data.plaka !== undefined) {
          const apiPlaka = data.plaka;

          console.log("API'den gelen plaka kodu:", apiPlaka);
          console.log("Haritadan gelen  plaka kodu:", plaka);

          // API'den gelen plaka kodu ile city.plateNumber'ın eşit olup olmadığını kontrol et
          if (apiPlaka === plaka) {
            // Şehir verilerini aldıktan sonra sit kontrolü yapabilirsiniz
            if (data.sit) {
              // Şehir sit olabilir
              console.log(`${data.baraj_adi} şehri baraj içeriyor.`);
              setSelectedCity(data); // Modal'ı aç
            } else {
              console.log(`${data.baraj_adi} şehri baraj içermiyor.`);
              setSelectedCity(data); 
            }
          } else {
            // Plaka kodları eşleşmiyor
            console.log("Plaka kodları eşleşmiyor.");
            // Uyarı göster
            alert("Plaka kodları eşleşmiyor.");
          }
        } else {
          console.error("Invalid data received:", data);
        }
      })
      .catch((error) => console.error("Error fetching city data:", error));
  };

  const handleClose = () => {
    setSelectedCity(null);
  };

  return (
    <div>
      {/* Sale & Revenue Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          {/* ... (diğer bileşenler) */}
        </div>
      </div>
      {/* Sale & Revenue End */}

      {/* Türkiye haritası */}
      <div style={{ width: "100%", height: "400px", background: "black" }}>
        <TurkeyMap
          hoverable={true}
          customStyle={{ idleColor: "red", hoverColor: "red" }}
          showTooltip={true}
          onClick={(city) => handleMapClick(city)}
        />
      </div>

      {/* Bootstrap Modal */}
      <Modal show={selectedCity !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCity && selectedCity.plaka}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Şehir Kodu: {selectedCity && selectedCity.plaka}</p>
          {/* Diğer ilgili bilgileri buraya ekleyebilirsin */}
          <p>Baraj Adı: {selectedCity && selectedCity.barajlar[0].baraj_adi}</p>
          <p>Oran: {selectedCity && selectedCity.barajlar[0].oran}</p>
          <p>Yıl: {selectedCity && selectedCity.barajlar[0].yil}</p>
          {/* İl ile ilgili diğer bilgileri de benzer şekilde ekleyebilirsin */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;