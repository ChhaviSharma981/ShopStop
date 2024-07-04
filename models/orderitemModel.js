const { default: mongoose } = require("mongoose")

const orderitemSchema = mongoose.Schema(
    {
        productid: {
            type: String,
        },
        productName: {
            type: String,
        },
        productPrice: {
            type: String,
        },
        quantity: {
            type: String,
        },
        orderid: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const orderitem = mongoose.model('OrderItem', orderitemSchema);

module.exports = orderitem;