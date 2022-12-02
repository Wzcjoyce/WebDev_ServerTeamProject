import * as reviewsDao from "./reviews-dao.js";


export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findReviews);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);
}
const findReviews = async (req, res) => {
    const reviews = await reviewsDao.findReviews()
    res.json(reviews);
}


const createReview =  async  (req, res) => {
    const newReviews = req.body;
    const insertReview = await reviewsDao.createReview(newReviews)
    res.json(insertReview);
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


