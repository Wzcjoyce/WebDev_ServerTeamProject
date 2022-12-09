import mongoose, {Schema} from 'mongoose';
const schema = mongoose.Schema({
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    content: String,
    GameComponent: {type: Schema.Types.ObjectId, ref: "GameModel"},
    GamePlayScore: Number,
    LastingAppealScore: Number,
    GraphicScore: Number,
    time: String,
    recommended: Boolean,
    playhours: String

}, {collection: 'reviews'});
export default schema;