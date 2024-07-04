const { default: mongoose } = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        descrption: {
            type: String,
        },
        image: {
            type: String,
        },
        qty: {
            type: Number,
        },
        price: {
            type: Number,
        },
        category: {
            type: String,
        },
        status: {
            type: String,
        },
        storeid: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const product = mongoose.model('Product', productSchema);

module.exports = product;