import mongoose, {Schema} from 'mongoose';
const schema = new mongoose.Schema(
    {
        tuit: {type: String, required: true},
        tag: {type: String, default: ""},
        postedOn: {type: Date, default: Date.now},
        postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
        stats: {
            replies: {type: Number, default: 0},
            retuits: {type: Number, default: 0},
            likes: {type: Number, default: 0}
        }
    }, {collection: 'tuits'});
export default schema;