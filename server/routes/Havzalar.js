const express=require('express')
const router =express.Router();

const havzaController=require('../controllers/HavzalarController');


// Tüm havzaları getir
router.get('/', havzaController.getHavzalar);

// Havzalar düzenli
router.get('/year', havzaController.getHavzalarWithYear);

// Havza_adi'ye göre havzayı getir
router.get('/:havza_adi', havzaController.getHavzalarWithHavzaId);

// Yeni havza ekle
router.post('/add',havzaController.havzaEkle);

// Havza Guncelleme
router.put('/update/:id',havzaController.havzaGuncelle);

// Havza Silme
router.delete('/del/:id',havzaController.havzaSil);

module.exports=router;