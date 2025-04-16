import express from 'express'
import router from './controller.js';
const app = express();
const PORT = 3000;

app.use('/', router);

app.listen(PORT)
