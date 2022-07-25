const mongoose = require("mongoose");
const c = require("colors");

module.exports = {
  start() {
    try {
      ("mongodb+srv://robrodric:50323432@cluster0.cko7y.mongodb.net/Robrocord?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log(c.red(`[DataBase] - Conectado ao Banco de Dados.`));
    } catch (err) {
      if (err) return console.log(c.red(`[DataBase] - ERROR:`, +err));
    }
  },
};