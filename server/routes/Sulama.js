const express=require('express')
const router =express.Router();

const sulamaController=require('../controllers/sulamalarController.js');


// Tüm sulamaları getir
router.get('/', sulamaController.getAll);

//İlişkisel yapı için
//router.get('/create', sulamaController.createIliskisel);

// Sulama_id'ye göre sulamayı getir
router.get('/:_id', sulamaController.getById);

// il_id'ye göre sulamayı getir
router.get('/:il_id', sulamaController.getSulamaByIlId);

// Yeni sulama ekle
router.post('/add',sulamaController.addSulama);

// Sulama Guncelleme
router.put('/update/:id',sulamaController.updateSulama);

// Sulama Silme
router.delete('/del/:id',sulamaController.deleteSulama);

module.exports=router;