const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
    date: {
        type: String
    },
    jobStatus: {
        type: String,
        default: 'nothing'
    }
},{
    timestamps:true
});

const hobbySchema = new mongoose.Schema({
    nameOfHobby: {
        type: String,
        required: true
    },
    dates: [dateSchema]
});

// Collection
const Hobby = mongoose.model('Hobby', hobbySchema);
module.exports = Hobby;