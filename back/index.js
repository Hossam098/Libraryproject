import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import query from './Database/DBConnection.js';
import user from './Router/userCRUD.js';
import userAuth from './Authentication/userAuth.js';



const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the origin of your client-side app
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

  
    next();
});
  
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    optionsSuccessStatus: 200
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/imgs'));


app.use('/auth', userAuth);



app.use('/user', user);







dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});