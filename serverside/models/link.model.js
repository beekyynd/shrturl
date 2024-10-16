import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({

    url:{

        type: String,
        required: true
    },

    short:{

        type: String,
        required: true
    },

}, {

    timestamps: true // Created and Updated at
});

const Link = mongoose.model('Link', linkSchema);

export default Link;