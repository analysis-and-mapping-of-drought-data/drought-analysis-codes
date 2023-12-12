const express=require('express')
const router =express.Router();

const barajController=require('../controllers/BarajlarController');


router.get('/', barajController.getAllBarajlar);
// Tüm barajları getir
router.get('/', barajController.getBarajlar);

// Id'ye göre barajı getir
router.get('/:_id', barajController.getBarajlarWithId);

// il_id'ye göre barajı getir
router.get('/:il_id', barajController.getBarajlarWithIlId);

// Yeni baraj ekle
router.post('/add',barajController.barajEkle);

//Guncellme
router.put('/update/:id',barajController.barajGuncelle);

// barajSilme
router.delete('/del/:id',barajController.barajSil);

module.exports=router;