const express = require("express");

const app = express();

app.use(express.json());

app.use('/', require('./routes'));

const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log('servidor rodando');
});