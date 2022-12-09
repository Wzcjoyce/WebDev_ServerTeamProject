import reviewsModel from './reviews-model.js';
import TuitModel from "../tuits/tuits-model.js";
export const findReviews = () => reviewsModel.find();

export const findReviewsByUser = async (uid) =>
    reviewsModel
        .find({postedBy: uid})
        .populate("postedBy")
        .exec();

export const findAllReviews = async () =>
    reviewsModel
        .find()
        .lean()
        .populate("gameId")
        .exec();

export const findReviewsByGameId = (gameId) => reviewsModel.find()
    .populate({
            path: "GameComponent",
            match: {'_id': {$eq: gameId}}

        }
    )
    .populate('postedBy')
    .exec();


export const createReviewByUser = async (uid, Review) =>
    await reviewsModel.create({...Review, postedBy: uid});


export const deleteReview = (rid) => reviewsModel.deleteOne({_id: rid});
export const updateReview = (rid, game) => reviewsModel.updateOne({_id: rid}, {$set: review})
