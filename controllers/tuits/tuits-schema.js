import mongoose from 'mongoose';
const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    replies: Number,
    retuits: Number,
    image: String,
    userName: String,
    handle: String,
    time: String,
}, {collection: 'tuits'});
export default schema;