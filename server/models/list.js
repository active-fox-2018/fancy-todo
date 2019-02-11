const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const ListSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    members: [{type: ObjectId, ref: 'User'}],
    master: {type: ObjectId, ref: 'User'}
})

const List = mongoose.model('List', ListSchema)

module.exports = List