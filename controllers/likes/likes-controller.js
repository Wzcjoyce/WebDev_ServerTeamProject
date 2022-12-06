import * as LikeDao from "../../daos/likes/likes-dao.js";
import * as TuitDao from "../../daos/tuits/tuits-dao.js";

export default (app) => {
    app.get("/api/users/:uid/likes", findAllTuitsLikedByUser);
    app.get("/api/likes/tuits/:tid", findAllUsersThatLikedTuit);
    app.get("/api/users/:uid/likes/:tid", findIfUserLikesTuit);
    app.put("/api/users/:uid/likes/:tid", userTogglesTuitLikes);
}

/**
 * Retrieves all users that liked a tuit from the database
 * @param {Request} req Represents request from client, including the path
 * parameter tid representing the liked tuit
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the user objects
 */
const findAllUsersThatLikedTuit = (req, res) =>
    LikeDao.findAllUsersThatLikedTuit(req.params.tid)
        .then(likes => res.json(likes));

/**
 * Retrieves all tuits liked by a user from the database
 * @param {Request} req Represents request from client, including the path
 * parameter uid representing the user liked the tuits
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the tuit objects that were liked
 */
const findAllTuitsLikedByUser = (req, res) => {
    const uid = req.params.uid;
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
                   profile._id : uid;
    // avoid server crash
    if (userId === "me") {
        res.sendStatus(503);
        return;
    }
    LikeDao.findAllTuitsLikedByUser(userId)
        .then(async likes => {
            // filter out likes with null tuit
            const likesNonNullTuits = likes.filter(like => like.tuit);
            // extract tuit objects and assign them to elements in the new array
            const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
            //update isLiked properties
            await addProperty(tuitsFromLikes, userId)
            res.json(tuitsFromLikes);
        });
}

/**
 * Retrieves the like data with particular user and tuit
 * @param {Request} req Represents request from client, including the path
 * parameter uid representing the user liked the tuit,
 * and the path parameter tid representing the tuit being liked
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the tuit objects that were liked
 */
const findIfUserLikesTuit = (req, res) => {
    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
                   profile._id : uid;
    // avoid server crash
    if (userId === "me") {
        res.sendStatus(503);
        return;
    }
    LikeDao.findUserLikesTuit(userId, tid)
        .then(likes => res.json(likes))
}

/**
 * Update tuit stats based on user's click event
 * @param {Request} req Represents request from client, including the
 * path parameters uid and tid representing the user that is liking the tuit
 * and the tuit being liked
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON containing the new likes that was inserted in the
 * database
 */
const userTogglesTuitLikes = async (req, res) => {

    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session['profile'];
    // if logged in, get ID from profile, otherwise use parameter
    const userId = uid === "me" && profile ?
                   profile._id : uid;
    // avoid server crash
    if (userId === "me") {
        res.sendStatus(503);
        return;
    }
    try {
        // check if user has already liked tuit
        const userAlreadyLikedTuit = await LikeDao.findUserLikesTuit(userId, tid);
        const likeNumber = await LikeDao.countHowManyLikedTuit(tid);
        let tuit = await TuitDao.findTuitById(tid);
        if (userAlreadyLikedTuit) {
            // user unlikes tuit
            await LikeDao.userUnlikesTuit(userId, tid);
            tuit.stats.likes = likeNumber - 1;
        } else {
            // user likes tuit
            await LikeDao.userLikesTuit(userId, tid);
            tuit.stats.likes = likeNumber + 1;
        }
        // update tuit stats
        await TuitDao.updateStats(tid, tuit.stats);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
}

// iterate tuits array, update isLiked property for each tuit
const addProperty = async (tuits, userId) => {
    for (let i = 0; i < tuits.length; i++) {
        const userAlreadyLikedTuit = await LikeDao.findUserLikesTuit(userId, tuits[i]._id);
        //add isliked property
        tuits[i].isLiked = Boolean(userAlreadyLikedTuit);
    }
};