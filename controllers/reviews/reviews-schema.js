import mongoose from 'mongoose';
const schema = mongoose.Schema({
    gameName: String,
    userName : String,
    userId: Number,
    content: String,
    RawgId: Number,
    GamePlayScore: Number,
    LastingAppealScore: Number,
    GraphicScore: Number,
    time: String,
    avatar: String,
    recommended: Boolean,
    playhours: String

}, {collection: 'reviews'});
export default schema;