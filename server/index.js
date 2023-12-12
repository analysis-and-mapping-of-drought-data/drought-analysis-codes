const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const barajRoutes = require('./routes/Barajlar');
const ilRoutes = require('./routes/Iller');
const cors = require('cors');

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

app.use('/baraj', barajRoutes);
app.use('/il', ilRoutes);

app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
});
