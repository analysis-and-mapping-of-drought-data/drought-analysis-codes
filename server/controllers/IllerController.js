const { populate } = require('../models/BarajModel');
const Il = require('../models/IlModel');

exports.getIller = async(req,res)=>{
    try{
        const iller = await Il.find().populate({path:'barajlar',select:['baraj_adi','oran','yil']});
        res.status(200).json(iller);   
    }catch(error){
        res.status(500).json({error_message:error.message});
    }
};

exports.getIllerWithId = async(req,res)=>{
    try{
        const il = await Il.Find({plaka:req.params.il_id}).populate({path:'barajlar',select:['baraj_adi','oran','yil']});
        if(!il){
            res.status(400).json({error_message:'Il bulunamadi!'});
        }
        res.status(201).json(Il);
    }catch(error){
        res.status(400).json({error_message:error.message});
    }  
};