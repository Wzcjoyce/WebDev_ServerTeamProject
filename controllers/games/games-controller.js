import * as gamesDao from "./games-dao.js";
import mongoose from "mongoose";


export default (app) => {
    app.post('/api/games', createGame);
    app.get('/api/games', findGames);
    app.put('/api/games/:gid', updateGame);
    app.delete('/api/games/:gid', deleteGame);
}

const findGames = async (req, res) => {
    const games = await gamesDao.findGames()
    res.json(games);
}


const createGame =  async  (req, res) => {
    const newGames = req.body;
    const count = await gamesDao.IsGameExist(newGames.RawgId).count();
    if(count === 0)
    {
        const insertGame = await gamesDao.createGame(newGames)
        res.json(insertGame);
    }
    else {
        res.json("Game Already Existed")
    }
}

const deleteGame = async (req, res) => {
    const gameIdToDelete  = req.params.gid;
    const status = await gamesDao
        .deleteGame(gameIdToDelete);
    res.json(status);
}


const updateGame  = async  (req, res) => {
    const gameIdToUpdate  = req.params.gid;
    const updates = req.body;

    const status = await gamesDao
        .updateGame(gameIdToUpdate,
            updates);
    res.json(status);
}


