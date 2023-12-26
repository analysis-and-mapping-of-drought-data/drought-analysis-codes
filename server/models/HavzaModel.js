const mongoose = require('mongoose');
//havzalar modeli oluşturuldu...
const HavzaSchema= new mongoose.Schema({
    havza_adi: {
        type: String,
        required: true,
    },
    havza_yagis: {
        type: Number,
        required: true,
    },
    havza_baraj:{
        type :Number,
        required :true,
    },
    havza_yil:{
        type :Date,
        required :true,
    },
    
}, { timestamps: true });
const Havza = mongoose.model('Havza', HavzaSchema);

module.exports = Havza;
