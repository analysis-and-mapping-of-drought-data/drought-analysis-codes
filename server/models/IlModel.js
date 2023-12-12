const mongoose = require('mongoose');

const IlSchema = new mongoose.Schema({
    plaka: {
        type: Number,
        required: true,
        max: 81,
    },
    il_adi: {
        type: String,
        required: true,
    },
    barajlar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Baraj",
        required: false,
    }]
}, { timestamps: true });

const Il = mongoose.model('Il', IlSchema);

module.exports = Il;
