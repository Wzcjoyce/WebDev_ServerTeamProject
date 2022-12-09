import * as reviewsDao from "../../daos/reviews/reviews-dao.js";



export default (app) => {
    app.post('/api/reviews/:uid', createReview);
    app.get('/api/reviews', findReviews);
    app.get('/api/reviews/users/:uid', findAllReviewsPostedByUser);
    app.get('/api/reviews/Rawg/:RawgId', findReviewsByRawgId);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);
}
const findReviews = async (req, res) => {
    const reviews = await reviewsDao.findReviews()
    res.json(reviews);
}

const findAllReviewsPostedByUser = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByUser(req.params.uid)
    res.json(reviews);
}

const findReviewsByRawgId = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByRawgId(req.params.RawgId)
    res.json(reviews);
}


const createReview =  async  (req, res) => {

    let userId = req.params.uid;
    let newReviews = req.body;
    reviewsDao.createReviewByUser(userId, newReviews)
        .then(ReviewToPost => res.json(ReviewToPost));


}

const deleteReview = async (req, res) => {
    const reviewIdToDelete  = req.params.rid;
    const status = await reviewsDao
        .deleteReview(reviewIdToDelete);
    res.json(status);
}


const updateReview  = async  (req, res) => {
    const reviewIdToUpdate  = req.params.rid;
    const updates = req.body;

    const status = await reviewsDao
        .updateReview(reviewIdToUpdate,
            updates);
    res.json(status);
}


