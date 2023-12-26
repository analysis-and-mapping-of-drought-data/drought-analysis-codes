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

exports.getHavzalarWithYearByName = async (req, res) => {
  try {
    const havzalar = await Havza.find({ havza_adi: req.params.havza_adi });
    const gruplandirilmisVeri = {};

    havzalar.forEach(veriOge => {
      const { havza_adi, havza_yil, havza_yagis, havza_baraj } = veriOge;

      if (!gruplandirilmisVeri[havza_adi]) {
        gruplandirilmisVeri[havza_adi] = { havza_adi };
      }

      const havza_yilKey = (new Date(havza_yil)).getFullYear().toString();
      gruplandirilmisVeri[havza_adi]["havza_yil_" + havza_yilKey] = havza_baraj;
      gruplandirilmisVeri[havza_adi]["havza_yil_" + havza_yilKey + "_yagis"] = havza_yagis;
    });

    const grupVeri = Object.values(gruplandirilmisVeri);

    // Gerekirse, eksik yılları eklemek için aşağıdaki blok eklenmiştir.
    
    grupVeri.forEach(ogr => {
      // Tüm yılları kapsayan bir döngü
      for (let yilKey in ogr) {
        // Yıl anahtarlarını kontrol et
        if (yilKey.startsWith("havza_yil_")) {
          const yilYagisKey = yilKey + "_yagis";
          if (!ogr[yilKey]) {
            ogr[yilKey] = null;
            ogr[yilYagisKey] = null;
          }
        }
      }
    });

    res.status(200).json(grupVeri);
  } catch (error) {
    res.status(500).json({ hata: error.message });
  }
};

