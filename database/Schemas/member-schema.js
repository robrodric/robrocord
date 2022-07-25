const mongoose = require('mongoose');

const schema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    default: 0
  },
  daily:{
    type: Number
  }


})

module.exports = mongoose.model("member-data", schema)
