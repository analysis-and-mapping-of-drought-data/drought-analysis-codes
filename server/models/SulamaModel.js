const express = require('express');
const mongoose = require('mongoose');
const app = express();

// JSON verilerini işlemek için middleware'leri eklendi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB şeması oluştur
const SulamaSchema = new mongoose.Schema({
  il:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Il',
    require:true,
  },
  plaka:{
    type:Number,
    require:true,
    max:81,
  },
  kuyu:{
    type:Number,
    require:true,
  },
  kaynak:{
    type:Number,
    require:true,
  },
  akarsu:{
    type:Number,
    require:true,
  },
  gol:{
    type:Number,
    require:true,
  },
  golet:{
    type:Number,
    require:true,
  },
  baraj:{
    type:Number,
    require:true,
  },
  diger:{
    type:Number,
    require:true,
  }
},{timestamps:true})

// Model oluştur
const SulamaModel  = mongoose.model('Sulama', SulamaSchema);
 
module.exports = SulamaModel;