import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// Middleware
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, './assets')
  },
  filename: function (req: Request, file: any, cb: any) {
    const uniqueSuffix = uuidv4()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
  }
})
const upload = multer({ dest: 'assets/', storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static('assets'));
app.use("/public", express.static('public'));


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

app.post('/pdf', upload.single('pdffile'), (req: Request, res: Response, next: any) => {
  res.send("File uploaded.");
});

app.listen(port, () => {
  console.log(`event-manager is running at http://localhost:${port}`);
});
