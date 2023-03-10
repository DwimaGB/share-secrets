
const mongoose = require('mongoose');
const mongooseEncryption = require('mongoose-encryption');

const secretSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
})

secretSchema.plugin(mongooseEncryption, {secret: process.env.ENCRYPTION_KEY, encryptedFields: ['content']});

module.exports = mongoose.model('Secret', secretSchema);