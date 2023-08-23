const express = require("express");
//const cors = require('cors');

const app = express();

app.use(express.json());

// app.use(cors());

// app.use('/', require('./routes'));
app.get('/health', (req, res) => {
    return res.json("up");
});

const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log('servidor rodando');
});