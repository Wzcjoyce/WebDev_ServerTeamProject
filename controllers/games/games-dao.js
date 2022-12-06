import gamesModel from './games-model.js';
export const findGames = () => gamesModel.find();

export const IsGameExist = (RawgId) => gamesModel.find({RawgId: RawgId});

export const findGameByRawgId = (RawgId) => gamesModel.find({RawgId: RawgId});
export const createGame = (game) => gamesModel.create(game);
export const deleteGame = (gid) => gamesModel.deleteOne({_id: gid});
export const updateGame = (gid, game) => gamesModel.updateOne({_id: gid}, {$set: game})
