/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import LikeSchema from "./likes-schema.js";
//create LikeModel to interact with mongoose database
//name of model can be used as ref name in another Schema
const LikeModel = mongoose.model('LikeModel', LikeSchema);
export default LikeModel;