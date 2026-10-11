const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    Date: {
        type: Date,
        default: Date.now
    },

    content: String,

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

});

module.exports=mongoose.model('post',postSchema);

