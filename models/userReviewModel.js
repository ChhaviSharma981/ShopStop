const { default: mongoose } = require("mongoose")

const userReviewSchema = mongoose.Schema(
    {
        productid: {
            type: String,
        },
        review: {
            type: String,
        },
        userid: {
            type: String,
        },
        userName: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const userReview = mongoose.model('userReview', userReviewSchema);

module.exports = userReview;