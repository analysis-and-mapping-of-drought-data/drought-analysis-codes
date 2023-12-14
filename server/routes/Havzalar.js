const express=require('express')
const router =express.Router();

const havzaController=require('../controllers/HavzalarController');


// Tüm havzaları getir
router.get('/', havzaController.getHavzalar);

//havzalar düzenli
router.get('/year', havzaController.getHavzalarWithYear);

// havza_adi'ye göre havzayı getir
router.get('/:havza_adi', havzaController.getHavzalarWithHavzaId);

// Yeni havza ekle
router.post('/add',havzaController.havzaEkle);

//Guncellme
router.put('/update/:id',havzaController.havzaGuncelle);

// havzaSilme
router.delete('/del/:id',havzaController.havzaSil);

module.exports=router;