const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const barajRoutes = require('../server/routes/Barajlar');
const cors = require('cors');

dotenv.config();

const app = express();
const port =3001;

app.use(cors());
app.use(express.json());

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('Veri tabanına baglandı '))
    .catch((err) => console.log(err));

// Baraj rotalarını kullan
app.use('/api', barajRoutes);

// Server'ı dinle
app.listen(port, () => {
  console.log(`Server ${port} portunda calisiyore`);
});
