const { default: mongoose } = require("mongoose")

const orderSchema = mongoose.Schema(
    {
        ordered: {
            type: String,
        },
        shipped: {
            type: String,
        },
        shipto: {
            type: String,
        },
        status: {
            type: String,
        },
        total: {
            type: Number,
        },
        userid: {
            type: String,
        },
        contact: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const order = mongoose.model('Order', orderSchema);

module.exports = order;