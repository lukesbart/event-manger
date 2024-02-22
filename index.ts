import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middleware Config
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


// Middleware
app.use(morgan("tiny"))
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
  crossOriginResourcePolicy: {policy: "cross-origin"},
}))
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
