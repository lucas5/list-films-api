const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());

require('./app/controller/controller_user')(app)
require('./app/controller/controller_friend')(app)
require('./app/controller/controller_movie')(app)

app.listen(3333)