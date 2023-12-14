// SulamaController.js

const Sulama = require('../models/SulamaModel');

exports.getSulamaByBarajId = async (req, res) => {
  try {
    const sulamaVerileri = await Sulama.find({ baraj: req.params.barajId });
    res.status(200).json(sulamaVerileri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

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
