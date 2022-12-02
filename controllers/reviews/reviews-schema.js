import mongoose from 'mongoose';
const schema = mongoose.Schema({
    username : String,
    content: String,
    gameID: String,
    reviewScore: Number,
    time: String,
    userImage: String,
    gameImage: String

}, {collection: 'reviews'});
export default schema;