const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName : String,
    userEmail: String,
    password: String,
    role: String
});
module.exports= mongoose.model("user", UserSchema);