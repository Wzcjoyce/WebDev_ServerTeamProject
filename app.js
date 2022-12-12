import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UsersController from "./controllers/users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import LikesController from "./controllers/likes/likes-controller.js";
import AuthenticationController from "./controllers/users/auth-controller.js";

import GamesController
    from "./controllers/games/games-controller.js";
import ReviewController
    from "./controllers/reviews/reviews-controller.js";
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import mongoose from "mongoose";


dotenv.config();

//const DbUrl = 'mongodb://127.0.0.1:27017/tuiter';
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING).then(() => console.log('DB started'))
    .catch(() => () => console.log(error.message));

const app = express()

// cross network region
app.use(cors(
    {
        // support cookie header
        credentials: true,
        // must whitelists allowed domains(if using credentials)
        // http://localhost:3000
        origin: ['http://localhost:3000', process.env.CORS_ORIGIN]
    }));

// Secret is used in hashing the session ID
const SECRET = 'process.env.SECRET';
//session configure
let sess = {
    secret: SECRET,
    // forces a new session to be saved.
    saveUninitialized: true,
    // enforces that the session is resaved against the server store on each request
    resave: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        // sameSite: none allows cookies to be sent in all contexts
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    }
}

if (process.env.NODE_ENV === 'production') {
    // must set for secure to work on HTTPs protocol
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session(sess))
app.use(express.json({
    limit: '50mb'
}));

GamesController(app);
ReviewController(app);
TuitsController(app);
HelloController(app);
UsersController(app);
LikesController(app);
AuthenticationController(app);
app.listen(process.env.PORT || 4000);
