const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    uniqueCode: { type: String, default: () => uuidv4().slice(0, 6) },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true }
});

module.exports = mongoose.model('File', FileSchema);