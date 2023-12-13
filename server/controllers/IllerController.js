const Il = require('../models/IlModel');

exports.getAllIller = async (req, res) => {
    try {
        const iller = await Il.find().populate({ path: 'barajlar', select: ['baraj_adi', 'oran', 'yil'] });
        res.status(200).json(iller);
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
};

exports.getIlWithId = async (req, res) => {
 
    try {
        const ilId = req.params.plaka;
        const plakaNumber = Number(ilId);
        
        if (isNaN(plakaNumber)) {
            return res.status(400).json({ error: 'gecersiz plaka degeri ' });
        }

        const il = await Il.findOne({ plaka: plakaNumber });

        if (!il) {
            return res.status(404).json({ error: 'Il not found' });
        }

        res.json(il);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getBarajlarWithPlaka = async (req, res) => {
    try {
        const ilId = req.params.plaka;

        if (isNaN(Number(ilId))) {
            return res.status(400).json({ error: 'gecersiz plaka degeri ' });
        }

        const il = await Il.findOne({ plaka: ilId }).populate({path:'barajlar', select:['baraj_adi']});

        if (!il) {
            return res.status(404).json({ error: 'Il not found' });
        }

        const baraj_adlari = [];

        // Use forEach to iterate over barajlar and create a unique list
        il.barajlar.forEach(baraj => {
            if (!baraj_adlari.includes(baraj.baraj_adi)) {
                baraj_adlari.push(baraj.baraj_adi);
            }
        });

        res.json({il_adi:il.il_adi,plaka:il.plaka,barajlar:baraj_adlari});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};
