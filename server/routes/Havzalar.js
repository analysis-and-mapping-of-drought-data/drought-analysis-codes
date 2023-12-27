const express=require('express')
const router =express.Router();

const havzaController=require('../controllers/HavzalarController');


// Tüm havzaları getir
router.get('/', havzaController.getHavzalar);

// Havza_adi'ye göre havzayı getir
router.get('/:havzaId', havzaController.getHavzaById);

// Yeni havza ekle
router.post('/add',havzaController.addHavza);

// Havza Guncelleme
router.put('/update/:id',havzaController.updateHavza);

// Havza Silme
router.delete('/del/:id',havzaController.deleteHavza);

router.get('/get/year', havzaController.getHavzalarWithYearByName);


module.exports=router;