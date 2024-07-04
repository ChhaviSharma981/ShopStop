const { default: mongoose } = require("mongoose")

const storeSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        contact: {
            type: String,
        },
        owner: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const store = mongoose.model('Store', storeSchema);

module.exports = store;