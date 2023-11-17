const express = require('express');
const mongoose = require('mongoose');
const app = express();

// JSON verilerini işlemek için middleware'leri ekleyin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB şeması oluştur
const BarajSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  il:{
    type:Number,
    require:true,
    max:81
  },
  yil_2010:{
    type:Number,
    require:true,
  },
  yil_2011:{
    type:Number,
    require:true,
  },
  yil_2012:{
    type:Number,
    require:true,
  },
  yil_2013:{
    type:Number,
    require:true,
  },
  yil_2014:{
    type:Number,
    require:true,
  },
  yil_2015:{
    type:Number,
    require:true,
  },
  yil_2016:{
    type:Number,
    require:true,
  },
  yil_2017:{
    type:Number,
    require:true,
  },
  yil_2018:{
    type:Number,
    require:true,
  },
  yil_2019:{
    type:Number,
    require:true,
  },
  yil_2020:{
    type:Number,
    require:true,
  },
  yil_2021:{
    type:Number,
    require:true,
  },

},{timestamps:true})

// Model oluştur
const BarajModel  = mongoose.model('Baraj', BarajSchema);
 
module.exports = BarajModel;