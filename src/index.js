import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));
// cors
app.use(cors());
// body parser
app.use(bodyParser.json());

// api router
app.use('/api', api);

const PORT = process.env.PORT || 8080;

app.server.listen(PORT, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;
