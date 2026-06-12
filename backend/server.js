const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// declaração da PORT e instanciação do app
const port = process.env.PORT;
const app = express();

const authRoute = require('./routes/auth.route.js');
const profileRoute = require('./routes/profile.route.js');

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use('/api', authRoute);
app.use('/api', profileRoute);

app.listen(port, (err) => {
    if (err) process.exit(1);

    console.log(`Server running on port: ${port}`);
});