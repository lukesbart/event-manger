import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static('assets'));


const event = require("./routes/event.route");
app.use("/event", event);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/uuid', (req: Request, res: Response) => {
  res.send(uuidv4());
});

app.get('/uuid/:prefix/:ftype', (req: Request, res: Response) => {
  res.send(`${req.params.prefix}-${uuidv4()}.${req.params.ftype}`)
});

app.listen(port, () => {
  console.log(`event-manager is running at http://localhost:${port}`);
});
