const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const barajRoutes = require('./routes/Barajlar');
const ilRoutes = require('./routes/Iller');
const cors = require('cors');
dotenv.config();
const app = express();
const port =3001;

app.use(cors());
app.use(express.json());

// MongoDB'ye bağlanma
mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('DB baglandi '))
    .catch((err) => console.log(err));

// Baraj rotalarını kullan
app.use('/baraj', barajRoutes);
app.use('/il', ilRoutes);

// Server'ı dinle
app.listen(port, () => {
  console.log(`Server is listening on ${port}.`);
});
