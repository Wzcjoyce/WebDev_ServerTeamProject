import LikeModel from "./likes-model.js";

/**
 * Retrieve all users documents from likes collection
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when the users are retrieved from database
 */
export const findAllUsersThatLikedTuit = async (tid) =>
    LikeModel
        .find({tuit: tid})
        .populate("likedBy")
        .exec();

/**
 * Retrieve all tuits documents from likes collection
 * @param {string} uid User's primary key
 * @returns {Promise} To be notified when the tuits are retrieved from database
 */
export const findAllTuitsLikedByUser = async (uid) =>
    LikeModel
        .find({likedBy: uid})
        .lean()
        .populate({
                      path: "tuit",
                      populate: {
                          path: "postedBy"
                      }
                  })
        .exec();

/**
 * Inserts like instance into the database
 * @param {string} uid User's primary key
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when like is inserted into the database
 */
export const userLikesTuit = async (uid, tid) =>
    LikeModel.create({tuit: tid, likedBy: uid});

/**
 * Removes like instance from the database
 * @param {string} uid User's primary key
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when like is removed from the database
 */
export const userUnlikesTuit = async (uid, tid) =>
    LikeModel.deleteOne({tuit: tid, likedBy: uid});

/**
 * Removes likes instances related to one particular tuit from the database
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when likes are removed from the database
 */
export const deleteAllLikesRelated = async (tid) =>
    LikeModel.deleteMany({tuit: tid});

/**
 * Counts the total likes a particular tuit has
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when total count is calculated
 */
export const countHowManyLikedTuit = async (tid) =>
    LikeModel.count({tuit: tid});

/**
 * Find out if a user has liked a particular tuit
 * @param {string} uid User's primary key
 * @param {string} tid Tuit's primary key
 * @returns {Promise} To be notified when data is retrived from the database
 */
export const findUserLikesTuit = async (uid, tid) =>
    LikeModel.findOne({tuit: tid, likedBy: uid});

