import express from 'express'
// import HelloController
//     from "./controllers/hello-controller.js"
// import UserController
//     from "./controllers/users/users-controller.js"
// import TuitsController
//     from "./controllers/tuits/tuits-controller.js";
import GamesController
    from "./controllers/games/games-controller.js";
import ReviewController
    from "./controllers/reviews/reviews-controller.js";
import cors from 'cors'
import mongoose from "mongoose";
import * as dotenv from "dotenv";


const app = express()

//const DbUrl = 'mongodb://127.0.0.1:27017/tuiter';

dotenv.config();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING ;
mongoose.connect(CONNECTION_STRING).then(() => console.log('DB started')).catch(() => () => console.log(error.message));


app.use(cors())
app.use(express.json());
// TuitsController(app);
// HelloController(app);
// UserController(app);
GamesController(app);
ReviewController(app);
app.listen(process.env.PORT || 4000);
