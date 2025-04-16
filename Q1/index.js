import express from 'express';
import { handleNumberRequest } from './controller.js';

const app = express();

app.get('/numbers/:id', handleNumberRequest)
const PORT  = 3000

app.listen(PORT);
