const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const router = require('./routers/router');

app.use(cors());
app.use(express.json());

connectDB().then(() => console.log('Connected to database!'));

app.use('/', router)

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
