const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        default: ''
    },
    age: {
        type: 'string',
        default: ''
    },
    id: {
        type: 'string',
        default: ''
    }
})

module.exports = mongoose.model("User", userSchema, "User");