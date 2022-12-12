import reviewsModel from './reviews-model.js';
export const findReviews = () => reviewsModel.find();

export const findReviewsByUser = async (uid) =>
    reviewsModel
        .find({postedBy: uid})
        .populate("postedBy")
      .populate('GameComponent')
      .exec();

export const findAllReviews = async () =>
    reviewsModel
        .find()
        .lean()
        .populate("GameComponent")
        .exec();

export const findReviewsByRawgId = (RawgId) => reviewsModel.find({RawgId: RawgId}).populate('postedBy').exec();


export const createReviewByUser = async (uid, Review) =>
    await reviewsModel.create({...Review, postedBy: uid});


export const deleteReview = (rid) => reviewsModel.deleteOne({_id: rid});
export const updateReview = (rid) => reviewsModel.updateOne({_id: rid}, {$set: review})
