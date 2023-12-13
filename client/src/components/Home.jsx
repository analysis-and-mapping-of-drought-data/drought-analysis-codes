import React, { useState, useEffect } from "react";
import TurkeyMap from "turkey-map-react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [iller, setIller] = useState([]);
  const [barajlar, setBarajlar] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/il")
      .then((response) => setIller(response.data))
      .catch((error) => console.error("Error fetching iller:", error));
  }, []);

  const handleMapClick = (city) => {
    const plaka = city.plateNumber;

    axios.get(`http://localhost:3001/il/${plaka}`)
      .then((response) => {
        const data = response.data;

        if (data && data.plaka !== undefined) {
          const apiPlaka = data.plaka;

          if (apiPlaka === plaka) {
            if (data.barajlar && data.barajlar.length > 0) {
              console.log(`${data.il_adi} şehrine ait barajlar ID'leri:`);
              console.log(data.barajlar);

              // Baraj id'lerini kullanarak detay verilerini al
              Promise.all(data.barajlar.map(_id => getBarajDetails(_id)))
                .then(barajDetails => {
                  setBarajlar(barajDetails.filter(Boolean));
                  setSelectedCity(data); // Modal'ı aç
                })
                .catch(error => console.error("Error fetching baraj details:", error));
            } else {
              console.log('Şehir verileri boş.');
              alert('kayit yok ');
              setSelectedCity(data);
            }
          } else {
            console.log("Plaka kodları eşleşmiyor.");
            alert("Plaka kodları eşleşmiyor.");
          }
        } else {
          console.error("Geçersiz veri alındı:", data);
          alert("Geçersiz veri alındı:", data);
        }
      })
      .catch((error) => console.error("Error fetching city data:", error));
  };

  const getBarajDetails = (_id) => {
    return axios.get(`http://localhost:3001/baraj/${_id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching baraj details for id ${_id}:`, error);
        return null;
      });
  };

  const handleClose = () => {
    setSelectedCity(null);
  };

  return (
    <div>
      {/* ... (diğer bileşenler) */}

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
          {selectedCity && selectedCity.barajlar.length > 0 && (
            <div>
              <p>Barajlar:</p>
              <ul>
                {selectedCity.barajlar.map((baraj, index) => (
                  <li key={index}>{baraj}</li>
                ))}
              </ul>
            </div>
          )}
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