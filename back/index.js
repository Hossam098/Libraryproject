import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import query from './Database/DBConnection.js';
import user from './Router/userCRUD.js';
import userAuth from './Authentication/userAuth.js';
import managerAuth from './Authentication/managerAuth.js';
import adminAuth from './Authentication/adminAuth.js';
import serPayment from './Router/serPayment.js';
import serviceStepTwo from './Router/serviceStepTwo.js';
import manager from './Router/manager.js';
import Admin from './Router/Admin.js';
import path from 'path';
import { fileURLToPath } from 'url';
// import corsMiddleware from 'cors'



const app = express();
app.use(express.json());




app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  optionsSuccessStatus: 200
}));
// app.use(corsMiddleware());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  key: 'user',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
  }
}));

dotenv.config({ path: './.env' });

app.use(bodyParser.json());
app.use(express.static('public/imgs'));

app.use('', serPayment);
app.use('', serviceStepTwo);

app.use('/auth', userAuth);
app.use('/authmanager', managerAuth);
app.use('/authadmin', adminAuth);


app.use('/user', user);
app.use('/manager', manager);
app.use('/admin', Admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});