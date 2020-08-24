const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecipeBook = new Schema(
    {
        createdBy: { type: String },
        title: { type: String, required: true },
        notes: { type: String },
        coverImage: { type: String }

    },
    { timestamps: true }
)

module.exports = mongoose.model("recipe-books", RecipeBook)