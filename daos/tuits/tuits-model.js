import mongoose from 'mongoose';
import TuitSchema from './tuits-schema.js'
const TuitModel = mongoose
    .model('TuitModel', TuitSchema);
export default TuitModel;