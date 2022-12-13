import * as TuitDao from "../../daos/tuits/tuits-dao.js";
import * as LikeDao from "../../daos/likes/likes-dao.js";


export default (app) => {
    //define HTTP request address
    app.get("/api/tuits", findAllTuits);
    app.get("/api/tuits/:tid", findTuitById);
    app.get("/api/users/reviewer/:reviewerId/poster/:posterId/tuits", findTuitsByUser);
    app.post("/api/users/:uid/tuits", createTuitByUser);
    app.put("/api/tuits/:tid", updateTuit);
    app.delete("/api/tuits/:tid", deleteTuit);

    //for testing, not RESTful
    app.delete("/api/tuits/content/:content", deleteTuitByContent);
}

/**
 * Retrieves all tuits from the database and returns an array of tuits.
 * @param {Request} req Represents request from client
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the tuit objects
 */
const findAllTuits = async (req, res) => {
    const tuits = await TuitDao.findAllTuits()
    // @ts-ignore
    // user already login
    if (req.session['profile']) {
        // @ts-ignore
        const userId = req.session['profile']._id;
        //update isLiked/isDisliked/isBookmarked property
        await addProperty(tuits, userId);
    }
    res.json(tuits);
}

/**
 * Retrieves all tuits from the database for a particular user and returns
 * an array of tuits.
 * @param {Request} req Represents request from client
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON arrays containing the tuit objects
 */
const findTuitsByUser = async (req, res) => {
    const reviewerId = req.params.reviewerId;
    const posterId = req.params.posterId;
    const tuits = await TuitDao.findTuitsByUser(posterId);
    //update isLiked/isDisliked/isBookmarked property
    await addProperty(tuits, reviewerId);
    res.json(tuits);
}

/**
 * @param {Request} req Represents request from client, including path
 * parameter tid identifying the primary key of the tuit to be retrieved
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON containing the tuit that matches the tid
 */
const findTuitById = (req, res) =>
    TuitDao.findTuitById(req.params.tid)
        .then(tuit => res.json(tuit));


/**
 * @param {Request} req Represents request from client, including body
 * containing the JSON object for the new tuit to be inserted in the
 * database
 * @param {Response} res Represents response to client, including the
 * body formatted as JSON containing the new tuit that was inserted in the
 * database
 */
const createTuitByUser = (req, res) => {

    // retrieve _id from session or parameter's uid
    // @ts-ignore
    let userId = req.params.uid === "my" && req.session['profile'] ?
        // @ts-ignore
                 req.session['profile']._id : req.params.uid;
    // avoid server crash
    if (userId === "my") {
        res.sendStatus(503);
        return;
    }
    let tuit = req.body;
    // a tag must start with #, following at least one (letter/number/_)
    const reg = /#\w+/
    const result = reg.exec(tuit.tuit);
    // result[0] is the matched string
    if(result){
        // remove # from result[0]
        tuit.tag = result[0].substring(1);
    }
    TuitDao.createTuitByUser(userId, tuit)
        .then(tuit => res.json(tuit));
}


/**
 * @param {Request} req Represents request from client, including path
 * parameter tid identifying the primary key of the tuit to be modified
 * @param {Response} res Represents response to client, including status
 * on whether updating a tuit was successful or not
 */
const updateTuit = (req, res) =>
    TuitDao.updateTuit(req.params.tid, req.body)
        .then(status => res.json(status));


/**
 * @param {Request} req Represents request from client, including path
 * parameter tid identifying the primary key of the tuit to be removed
 * @param {Response} res Represents response to client, including status
 * on whether deleting a tuit was successful or not
 */
const deleteTuit = (req, res) => {
    const tid = req.params.tid;
    const deleteTuit = TuitDao.deleteTuit(tid);
    const deleteLikes = LikeDao.deleteAllLikesRelated(tid);
    // when user delete a tuit, also need to delete all records related to this tuit
    Promise.all([deleteTuit, deleteLikes])
        .then(status => res.json(status));
}


// just for test, delete tuit by content
const deleteTuitByContent = (req, res) =>
    TuitDao.deleteTuitByContent(req.params.content)
        .then(status => res.json(status));

// iterate tuits array, update isLiked property for each tuit
const addProperty = async (tuits, userId) => {
    for (let i = 0; i < tuits.length; i++) {
        const userAlreadyLikedTuit = await LikeDao.findUserLikesTuit(userId, tuits[i]._id);
        //add isliked property
        tuits[i].isLiked = Boolean(userAlreadyLikedTuit);
    }
};


