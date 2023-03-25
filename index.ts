import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middleware
app.use(morgan("tiny"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Static Routes
app.use("/assets", express.static('assets'));
app.use("/public", express.static('public'));
app.use("/docs", express.static('docs/docs.json'))

// Dynamic Routes
const event = require("./routes/event.route");
app.use("/event", event);

const auth = require("./routes/auth.route");
app.use("/auth", auth);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Event Manager. To see events GET /event. To see docs GET /docs');
});

// App setup
app.listen(port, () => {
  console.log(`event-manager is running at http://localhost:${port}`);
});
