import mongoose from 'mongoose';
const schema = mongoose.Schema({
    GameName : String,
    Description: String,
    Platforms: String,
    GameType: String,
    Metacritic: Number,
    ReleaseDate: String,
    Image: String,

}, {collection: 'games'});
export default schema;