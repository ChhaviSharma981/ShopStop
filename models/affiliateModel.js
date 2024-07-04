const { default: mongoose } = require("mongoose")

const affiliateModelSchema = mongoose.Schema(
    {
        product_id: {
            type: String,
        },
        product_name: {
            type: String,
        },
        username: {
            type: String,
        },
        affiliate_code: {
            type: String,
        },
        count: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
)

const Affiliate = mongoose.model('Affiliate', affiliateModelSchema);

module.exports = Affiliate;