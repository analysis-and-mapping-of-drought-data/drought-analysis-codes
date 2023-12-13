const Baraj=require('../models/BarajModel')
const Il=require('../models/IlModel')

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
        res.status(500).json({ hata: error.message });
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
        res.status(500).json({ hata: error.message });
    }
};

exports.getBarajlarWithYear = async (req, res) => {
    try {
        const barajlar = await Baraj.find().populate({ path: 'il', select: 'il_adi' });
        
        const grupVeri = [];
        const gruplandirilmisVeri = {};

        barajlar.forEach(veriOge => {
            const { baraj_adi, yil, oran } = veriOge;

            if (!gruplandirilmisVeri[baraj_adi]) {
                gruplandirilmisVeri[baraj_adi] = { baraj_adi };
            }

            const yilKey = (new Date(yil)).getFullYear().toString();
            gruplandirilmisVeri[baraj_adi]["yil_" + yilKey] = oran;
        });

        for (const dam in gruplandirilmisVeri) {
            grupVeri.push(gruplandirilmisVeri[dam]);
        }

        res.status(200).json(grupVeri);
    } catch (error) {
        res.status(500).json({ hata: error.message });
    }
}



exports.barajEkle=async(req,res)=>{
    try {
        const ilId = req.body._id; // Change this line
        console.log(ilId);
        if (!ilId) {
            return res.status(400).json({ error_message: 'Il id not provided in the request body' });
        }

        const il = await Il.findById(ilId);

        if (!il) {
            return res.status(400).json({ error_message: 'Il not found' });
        }

        const yenibaraj = new Baraj({ il: ilId, ...req.body });

        // Push the newly created baraj's _id to the il's barajlar array
        il.barajlar.push(yenibaraj._id);

        // Save both the il and the yeni baraj
        await Promise.all([il.save(), yenibaraj.save()]);

        res.status(201).json(yenibaraj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ hata: error.message });
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

exports.getAllBarajlar = async (req, res) => 
{
    try {
      const barajlar = await Baraj.find();
      res.status(200).json(barajlar);
    } catch (error) {
      res.status(500).json({ error_message: error.message });
    }
};
  