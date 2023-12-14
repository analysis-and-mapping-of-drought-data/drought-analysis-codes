const express=require('express')
const router =express.Router();

const sulamaController=require('../controllers/sulamalarController');


// Tüm sulamaları getir
router.get('/', sulamaController.getsulamalar);

// Sulamalar düzenleme
router.get('/year', sulamaController.getsulamalarWithYear);

// Sulama_id'ye göre sulamayı getir
router.get('/:sulama_adi', sulamaController.getsulamalarWithsulamaId);

// Yeni sulama ekle
router.post('/add',sulamaController.sulamaEkle);

// Sulama Guncelleme
router.put('/update/:id',sulamaController.sulamaGuncelle);

// Sulama Silme
router.delete('/del/:id',sulamaController.sulamaSil);

module.exports=router;