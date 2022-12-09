import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    GameName : String,
    RawgId: Number,
    Description: String,
    Metacritic: Number,
    ReleaseDate: String,
    Image: String,
    Website: String,
    Platforms: [],
    Genres : [],
    Developers : []

}, {collection: 'games'});
export default schema;