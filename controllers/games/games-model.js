import mongoose from 'mongoose';
import gamesSchema from './games-schema.js'
const gamesModel = mongoose
    .model('GameModel', gamesSchema);
export default gamesModel;