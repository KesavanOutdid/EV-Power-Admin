const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const app = express();
const logger = require('./logger');
const router = require('./routes');


dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);


const HTTP_PORT = process.env.HTTP_PORT;
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server listening on port ${HTTP_PORT}`);
  logger.info(`HTTP Server listening on port ${HTTP_PORT}`);
});