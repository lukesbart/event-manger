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
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/assets", express.static('assets'));
app.use("/public", express.static('public'));

function authenticate(req: Request, res: Response, next: any) {
  const auth = req.headers.authorization;
  if (auth === 'secret') {
    next();
  } else {
    res.status(401);
    res.send('Access forbidden');
  }
}

const event = require("./routes/event.route");
app.use("/event", event);

const uploadtest = require("./routes/uploadtest.route")
app.use("/upload", uploadtest);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/uuid', (req: Request, res: Response) => {
  res.send(uuidv4());
});

app.get('/uuid/:prefix', (req: Request, res: Response) => {
  let guid = uuidv4();

  interface fileNames {
    mp3: string,
    mp4: string,
    pdf: string
  };

  let fileNamesObj: fileNames = {
    mp3: `${req.params.prefix}-${guid}.mp3`,
    mp4: `${req.params.prefix}-${guid}.mp4`,
    pdf: `${req.params.prefix}-${guid}.pdf`,
  }


  res.json(fileNamesObj);
});

app.post('/pdf', authenticate, upload.single('pdffile'), (req: Request, res: Response, next: any) => {
  res.send("File uploaded.");
});

app.listen(port, () => {
  console.log(`event-manager is running at http://localhost:${port}`);
});
