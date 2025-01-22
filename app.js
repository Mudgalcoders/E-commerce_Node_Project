import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config() // Make availble all variable created on .env file to access to this page
import db from './models/index.js'
import registerRoutes from './registerRoutes.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());


// By server fetch file path 

const filepath = app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests from this domain
  credentials: true, 
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
  // allowedHeaders: ['Content-Type'], // Allow specific headers
}));

registerRoutes(app);
  
db.sequelize.sync({alter : true})
.then(() => {
  console.log("Synced db success...");
}).catch((err) => {
  console.log("Failed to sync db...", err.message)
});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

