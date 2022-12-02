import reviewsModel from './reviews-model.js';
export const findReviews = () => reviewsModel.find();
export const createReview = (review) => reviewsModel.create(review);
export const deleteReview = (rid) => reviewsModel.deleteOne({_id: rid});
export const updateReview = (rid, game) => reviewsModel.updateOne({_id: rid}, {$set: review})
