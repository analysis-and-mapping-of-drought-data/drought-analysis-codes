// HavzaController.js

const Havza = require('../models/HavzaModel');

exports.getHavzalar = async (req, res) => {
  try {
    const havzalar = await Havza.find();
    res.status(200).json(havzalar);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.getHavzaById = async (req, res) => {
  try {
    const havza = await Havza.findById(req.params.havzaId);
    if (!havza) {
      res.status(404).json({ hata: 'Havza Bulunamadı' });
    }
    res.status(200).json(havza);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.addHavza = async (req, res) => {
  try {
    const { ad } = req.body;
    const yeniHavza = new Havza({ ad, ...req.body });
    await yeniHavza.save();
    res.status(201).json(yeniHavza);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.updateHavza = async (req, res) => {
  try {
    const guncellemeler = req.body;
    const guncellenenHavza = await Havza.findByIdAndUpdate(
      req.params.havzaId,
      guncellemeler,
      { new: true, runValidators: true }
    );
    if (!guncellenenHavza) {
      return res.status(404).json({ hata: 'Havza Bulunamadı' });
    }
    res.json(guncellenenHavza);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

exports.deleteHavza = async (req, res) => {
  try {
    const silinenHavza = await Havza.findByIdAndDelete(req.params.havzaId);
    if (!silinenHavza) {
      return res.status(404).json({ hata: 'Havza Bulunamadı' });
    }
    res.json(silinenHavza);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};
