var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date, default: Date.now , required: true},
    content: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);