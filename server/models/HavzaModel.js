const mongoose = require('mongoose');
//havzalar modeli oluşturuldu...
const HavzaSchema= new mongoose.Schema({
    havza_adi: {
        type: String,
        required: true,
    },
    havza_yagisAlani: {
        type: Number,
        required: true,
    },
    baraj_dolulukOrani:{
        type :Number,
        required :true,
    },
    yil:{
        type :Number,
        required :true,
    },
    
}, { timestamps: true });
const Havza = mongoose.model('Havza', HavzaSchema);

module.exports = Havza;
