import React, { useState } from "react";
import TurkeyMap from "turkey-map-react";
import { Modal, Button } from "react-bootstrap";

function Home(){

  const [selectedCity, setSelectedCity] = useState(null);

  const handleMapClick = (city) => {
    setSelectedCity(city);
  };

  const handleClose = () => {
    setSelectedCity(null);
  };
    return (
        <div>

  {/* Sale & Revenue Start */}
  <div className="container-fluid pt-4 px-4">
    <div className="row g-4">
      <div className="col-sm-6 col-xl-3">
        <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-line fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Toplam İL</p>
            <h6 className="mb-0">81</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-bar fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Toplam Baraj </p>
            <h6 className="mb-0">352</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-area fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Toplam Havza</p>
            <h6 className="mb-0">25</h6>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-pie fa-3x text-primary" />
          <div className="ms-3">
            <p className="mb-2">Tolam  Sulama Kaynak</p>
            <h6 className="mb-0">7</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Sale & Revenue End */}
 
      {/* Turkiye haritasi */}
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
          <Modal.Title>{selectedCity && selectedCity.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Şehir Kodu: {selectedCity && selectedCity.code}</p>
          {/* İlgili diğer bilgileri buraya ekleyebilirsin */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
 


        </div>
    )
}
export default Home