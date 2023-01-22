//entry point into backend logic ***

const express = require('express');
const bodyParser = require('body-parser');

const coordinatesRoutes = require('./routes/point-routes');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(bodyParser.json());

app.use('/api/coordinates',coordinatesRoutes);
app.use('/api/user', userRoutes);

app.listen(5000);