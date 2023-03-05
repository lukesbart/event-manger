import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middleware
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan("tiny"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/assets", express.static('assets'));
app.use("/public", express.static('public'));

const event = require("./routes/event.route");
app.use("/event", event);

const uploadtest = require("./routes/uploadtest.route")
app.use("/upload", uploadtest);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`event-manager is running at http://localhost:${port}`);
});
