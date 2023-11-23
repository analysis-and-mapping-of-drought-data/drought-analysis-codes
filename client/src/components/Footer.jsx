import React from "react";

function Footer(){

    return (
      <div>
      {/* Footer Start */}
      <div className="container-fluid pt-2 px-2 fixed-bottom" style={{ maxWidth: '80%' }}>
        <div className="bg-secondary rounded-top p-2">
          <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              © <a href="#">Baraj ve sulama verileri </a>, Bu sitenin bütün hakları saklıdır ... 
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              Tasarım: <a>Berat Kurtaran </a>
              <br />ISS Ekibi
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </div>
    
    )
}
export default Footer