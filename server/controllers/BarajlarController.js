const Baraj=require('../models/BarajModel')

exports.getBarajlar=async(req,res)=>{
    try{
        const barajlar= await Baraj.find().populate({path:'il',select:'il_adi'});
        res.status(200).json(barajlar);
    }catch (error) {
        res.status(500).json({ hata: error.message });
    }
};

exports.getBarajlarWithId=async(req,res)=>{
    try{
        const baraj= await Baraj.findById(req.params._id).populate({path:'il',select:'il_adi'});
        if(!baraj){
            res.status(400).json({error_message:'Baraj verisi bulunamadi!'});
        }
        res.status(200).json(baraj);
    }catch (error) {
        res.status(400).json({ hata: error.message });
    }
};

exports.getBarajlarWithIlId=async(req,res)=>{
    try{
        const barajlar= await Baraj.find({plaka:req.params.il_id}).populate({path:'il', select:'il_adi'});
        if(!barajlar){
            res.status(400).json({error_message:'Baraj verisi bulunamadi!'});
        }
        res.status(200).json(barajlar);
    }catch (error) {
        res.status(400).json({ hata: error.message });
    }
};

exports.barajEkle=async(req,res)=>{
    try{
        const il = await il.findById(req.body._id);
        if(!il){
            res.status(400).json({error_message:'il bulunamadi!'})
        }
        const yenibaraj = new Baraj(req.body);
        await yenibaraj.save();
        res.status(201).json(yenibaraj);
    }catch(error){
        res.status(400).json({hata:error.message});
    }
};


exports.barajGuncelle = async (req, res) => {
    const guncellemeler = req.body;
    try {
      const guncellenenBaraj = await Baraj.findByIdAndUpdate(
        req.params.id,
        guncellemeler,
        { new: true, runValidators: true }
      );
      if (!guncellenenBaraj) {
        return res.status(404).json({ hata: 'Baraj Bulunamadi ... ' });
      }
      res.json(guncellenenBaraj);
    } catch (error) {
      res.status(400).json({ hata: error.message });
    }
};

exports.barajSil=async (req,res)=>{
    try{
        const silinenBaraj=await Baraj.findByIdAndDelete(req.params.id);
        if(!silinenBaraj){
            return res.status(404).json({hata:'Baraj bulunamadi ...'});
        }
        res.json(silinenBaraj);

    }catch(error){
        req.status(400).json({hata:error.message});
    }
};