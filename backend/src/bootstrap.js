const cors = require('cors');
const express = require('express');
const router = require('./routers/router');


exports.bootstrapApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    // deberia ser otra ruta (ya q el test será para login y register respectivamente)?
    app.use('/', router);

    return app
}