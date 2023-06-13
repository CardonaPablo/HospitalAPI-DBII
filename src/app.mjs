import './db.mjs';
import express from 'express';
import routes from './routes/router-index.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => console.log('listening on port 3000'));