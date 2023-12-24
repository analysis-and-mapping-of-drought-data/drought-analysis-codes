// SulamaController.js

const Sulama = require('../models/SulamaModel');
const Il = require('../models/SulamaModel');

exports.getAll = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.find();
    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.findById(req.params._id);
    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.getSulamaByIlId = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.findOne({ il: req.params.il_id });
    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.getSulamaByPlaka = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.findOne({ plaka: req.params.plaka });
    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};


//İlişkisel yapı için
/* exports.createIliskisel = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.find();

    for (const item of sulamaVerileri) {
      const il = await Il.findOne({ plaka: item.plaka }); // findOne kullanmalısınız, çünkü bir il bekliyorsunuz
      il.sulama = item._id;
      item.il = il._id;
      await item.save();
      await il.save();
    }

    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
}; */

exports.addSulama = async (req, res) => {
  try {
    const { barajId, yil, miktar } = req.body;
    const yeniSulama = new Sulama({ baraj: barajId, yil, miktar });
    await yeniSulama.save();
    res.status(201).json(yeniSulama);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.updateSulama = async (req, res) => {
  try {
    const { yil, miktar } = req.body;
    const updatedSulama = await Sulama.findByIdAndUpdate(
      req.params.sulamaId,
      { yil, miktar },
      { new: true, runValidators: true }
    );
    if (!updatedSulama) {
      return res.status(404).json({ hata: 'Sulama Verisi Bulunamadı' });
    }
    res.json(updatedSulama);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.deleteSulama = async (req, res) => {
  try {
    const deletedSulama = await Sulama.findByIdAndDelete(req.params.sulamaId);
    if (!deletedSulama) {
      return res.status(404).json({ hata: 'Sulama Verisi Bulunamadı' });
    }
    res.json(deletedSulama);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};
