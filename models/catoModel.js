const { default: mongoose } = require("mongoose")

const catoModelSchema = mongoose.Schema(
    {
        name: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Cato = mongoose.model('Cato', catoModelSchema);

module.exports = Cato;