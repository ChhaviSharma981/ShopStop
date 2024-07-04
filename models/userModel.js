const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
        state: {
            type: String,
        },
        role: {
            type: String,
        },
        password:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('User', userSchema);

module.exports = user;