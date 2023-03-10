
const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
    sub: {
        type: String, 
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('GoogleUser', googleUserSchema);