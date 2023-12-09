const express = require('express');
const mongoose = require('mongoose');
const app = express();

// JSON verilerini işlemek için middleware'leri eklendi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const IlSchema = new mongoose.Schema({
    plaka:{
        type:Number,
        require:true,
        max:81,
    },
    il_adi:{
        type:String,
        require:true,
    },
    barajlar:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Baraj",
        require:false,
    }]
},{timestamps:true});

const Il = mongoose.model('Il', IlSchema);

module.exports = Il;
