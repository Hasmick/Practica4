"use strict";

const express = require('express');
const app = express();
const port = 8080;
const datahandler = require('./app/controllers/data_handler');
const router = require('./app/controllers/router');


app.use(express.json()); 
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})