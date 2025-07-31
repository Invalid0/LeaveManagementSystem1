const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const LeaveScema = new mangoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    from: Date,
    to: Date,
    reason: String,
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});
module.exports = mongoose.model('Leave', LeaveScema);