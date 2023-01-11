//entry point into backend logic ***

const express = require('express');
const bodyParser = require('body-parser');

const coordinatesRoutes = require('./routes/coordinates-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/coordinates',coordinatesRoutes);




app.listen(5000);