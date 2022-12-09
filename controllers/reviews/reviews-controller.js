import * as reviewsDao from "../../daos/reviews/reviews-dao.js";
import {findAllReviews, findReviewsByGameId} from "../../daos/reviews/reviews-dao.js";



export default (app) => {
    app.post('/api/reviews/:uid', createReview);
    app.get('/api/reviews', findReviews);
    app.get('/api/reviews/users/:uid', findAllReviewsPostedByUser);
    app.get('/api/reviews/games', findAllGamesReviewedByUser);
    app.get('/api/reviews/Rawg/:GameId', findReviewsByGame);
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

const findAllGamesReviewedByUser = async (req, res) => {

    const  reviews = await reviewsDao.findAllReviews()
    const gamesId = reviews.map(review => review.RawgId._id)
    const setOfGameId = new Set(gamesId)

    let ReviewedGameArray = [];
    for(const id of setOfGameId)
    {
        for(const review of reviews)
        {
            if(reviews.RawgId._id === id)
            {
                ReviewedGameArray.push(reviews.RawgId)
                break;
            }
        }
    }


    res.json(ReviewedGameArray);
}

const findReviewsByGame = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByGameId(req.params.GameId)
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


