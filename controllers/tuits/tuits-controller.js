import * as tuitsDao from "./tuits-dao.js";


export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}


const createTuit =  async  (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 100;
    newTuit.liked = false;
    newTuit.dislikes = 10;
    newTuit.replies = 20;
    newTuit.retuits = 30;
    newTuit.image = '/images/spacexlogo.jpg';
    newTuit.userName = "SpaceX";
    newTuit.handle = "@spacex";
    newTuit.time = "1h";

    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete  = req.params.tid;
    const status = await tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.json(status);
}


const updateTuit  = async  (req, res) => {
    const tuitdIdToUpdate  = req.params.tid;
    const updates = req.body;

    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);
    res.json(status);
}


