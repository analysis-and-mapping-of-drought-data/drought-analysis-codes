const express=require('express')
const router =express.Router();

const barajController=require('../controllers/BarajController');

// Tüm barajları getir
router.get('/barajlar', barajController.getBarajlar);

// Yeni baraj ekle
router.post('/barajlar',barajController.barajEkle);

//Guncellme
router.put('/barajlar/:id',barajController.barajGuncelle);

// barajSilme
router.delete('/barajlar/:id',barajController.barajSil);

module.exports=router;