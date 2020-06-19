const express = require('express');
const bodyparser = require('body-parser');

const port = process.env.PORT || 3333
const app = express();

app.use(bodyparser.json());

require('./app/controller/controller_user')(app)
require('./app/controller/controller_friend')(app)
require('./app/controller/controller_movie')(app)

app.listen(port);