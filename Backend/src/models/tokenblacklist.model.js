const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    }
});

const tokenBlacklistModel =  mongoose.model("tokenBlacklist",tokenBlacklistSchema);

module.exports = tokenBlacklistModel;