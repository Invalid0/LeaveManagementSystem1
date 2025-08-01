const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, require: true},
    role:{type: String, enum:['employee', 'admin'], default: 'employee'}
});

module.exports = mongoose.model('User', UserSchema);