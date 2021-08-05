const mongoose = require('mongoose');
const Add=require('./address')
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: Add

});

module.exports = mongoose.model('User', userSchema);