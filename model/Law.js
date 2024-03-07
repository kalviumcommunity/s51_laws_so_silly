const mongoose = require("mongoose");

const LawSchema = mongoose.Schema({
    Country: {
        required: true,
        type: String
    },
    State_Region_if_applicable: {
        required: true,
        type: String
    },
    Law: {
        required: true,
        type: String
    },
    Penalty: {
        required: true,
        type: String
    },
    Continent: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('dumblaws', LawSchema);