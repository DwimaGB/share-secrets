
const mongoose = require('mongoose');
const encryption = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.plugin(encryption, {secret: process.env.ENCRYPTION_KEY, encryptedFields: ['password']});

module.exports = mongoose.model('User', userSchema);