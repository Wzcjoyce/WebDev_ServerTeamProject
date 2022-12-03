import mongoose from 'mongoose';
const schema = mongoose.Schema({
    GameName : String,
    RawgId: Number,
    Description: String,
    Metacritic: Number,
    ReleaseDate: String,
    Image: String,

}, {collection: 'games'});
export default schema;