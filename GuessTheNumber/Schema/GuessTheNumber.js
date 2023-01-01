const { model, Schema } = require("mongoose")

module.exports = model("guessthenumber", new Schema({
    
    Guild: String,
    Channel: String,
    number: Number

}))