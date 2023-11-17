const Baraj=require('../models/BarajModel')

exports.getBarajlar=async(req,res)=>{
    try{
        const barajlar= await Baraj.find();
        res.json(barajlar);
    }catch (error) {
        res.status(500).json({ hata: error.message });
    }
};

exports.barajEkle=async(req,res)=>{
    try{
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