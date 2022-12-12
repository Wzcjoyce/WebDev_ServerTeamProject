import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        firstName: String,
            bannerPicture: String,
            avatar: String,
        lastName: String,
            website: String,
        phone: String,
        profilePhoto: String,
        headerImage: String,
        accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'TUITER-ADMIN', 'GAME-ADMIN']},
        biography: String,
        dateOfBirth: Date,
        joined: {type: Date, default: Date.now},
        location: String,
    }, {collection: 'users'});
export default UserSchema;
