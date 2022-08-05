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
  },
  sobre:{
    type: String,
    default: "Conte mais sobre você aqui!"
  }


})

module.exports = mongoose.model("member-data", schema)
