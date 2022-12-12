import TuitModel from './tuits-model.js';

/**
 * Retrieve all tuit documents from tuits collection
 */
export const findAllTuits = async () =>
    // use lean to return plain objects(for modification) instead of mongoose documents
    TuitModel.find()
        .sort({postedOn: -1})
        .lean()
        .populate("postedBy")
        .exec();

//Populated paths are no longer set to their original _id ,
//their value is replaced with the mongoose document returned from the database
//by performing a separate query before returning the results.
/**
 * Retrieve single user document from tuits collection
 * @param {string} tid Tuit's primary key
 */
export const findTuitById = async (tid) =>
    TuitModel
        .findById(tid)
        .populate("postedBy")
        .exec();

/**
 * Retrieve one user's all tuits documents from tuits collection
 * @param {string} uid User's primary key
 */
export const findTuitsByUser = async (uid) =>
    TuitModel
        .find({postedBy: uid})
        .sort({postedOn: -1})
        .lean() //use lean() tells Mongoose to skip instantiating a full Mongoose document and just
                // give you the plain object
        .populate("postedBy")
        .exec();

/**
 * Inserts tuit instance into the database
 * @param {string} uid User's primary key
 * @param {object} tuit Instance to be inserted into the database
 *
 */
export const createTuitByUser = async (uid, tuit) =>
//use "...tuit" to parse object into key-value pair instead of casting tuit to string
    await TuitModel.create({...tuit, postedBy: uid});

/**
 * Removes tuit from the database.
 * @param {string} tid Primary key of tuit to be removed
 */
export const deleteTuit = async (tid) =>
    TuitModel.deleteOne({_id: tid});

/**
 * Updates tuit with new values in database
 * @param {string} tid Primary key of tuit to be modified
 * @param {object} tuit Tuit object containing properties and their new values
 */
export const updateTuit = async (tid, tuit) =>
    TuitModel.updateOne(
        {_id: tid},
        {$set: tuit});

/**
 * Updates the stats nested schema for a particular tuit
 * @param {string} tid Primary key of tuit to be modified
 * @param {object} newStats Nested schema representing tuits stats
 */
export const updateStats = async (tid, newStats) =>
    TuitModel.updateOne(
        {_id: tid},
        {$set: {stats: newStats}}
    );

// just for test, delete tuit by content
export const deleteTuitByContent = async (tuit) =>
    TuitModel.deleteMany({tuit: tuit});
