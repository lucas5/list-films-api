const express = require('express');
const bodyparser = require('body-parser');

const port = process.env.PORT || 3333
const app = express();

app.use(bodyparser.json());

app.get('/', (request, result) => {
    return response.status(200).send({
        info: "Api em desenvolvimento...",
        authors: "Guilherme Ventura, Lucas Expedito"
    })
})

require('./app/controller/controller_user')(app)
require('./app/controller/controller_friend')(app)
require('./app/controller/controller_movie')(app)

app.listen(port);