import mongoose from "mongoose";
import UserSchema from "./user-schema.js";
//create UserModel to interact with mongoose database
//name of model can be used as ref name in another Schema
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;