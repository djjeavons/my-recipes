const RecipeBook = require("../models/recipe-book")

createRecipeBook = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide data to create a recipe book",
        })
    }

    const recipeBook = new RecipeBook(body)

    if (!recipeBook) {
        return res.status(400).json({
            success: false, error: err
        })
    }

    recipeBook
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: recipeBook._id,
                message: "Recipe book created!"
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Recipe book not created!",
            })
        })
}

updateRecipeBook = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide data to update",
        })
    }

    RecipeBook.findOne({ _id: req.params.id }, (err, recipeBook) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "Recipe book not found!",
            })
        }
        recipeBook.createdBy = body.createdBy
        recipeBook.title = body.title
        recipeBook.notes = body.notes
        recipeBook.coverImage = body.coverImage
        recipeBook
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipeBook._id,
                    message: "Recipe book updated!",
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: "Recipe book not updated!",
                })
            })
    })
}

deleteRecipeBook = async (req, res) => {
    await RecipeBook.findOneAndDelete({ _id: req.params.id }, (err, recipeBook) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err,
            })
        }

        if (!recipeBook) {
            return res.status(404).json({
                success: false,
                error: "Recipe book not found!"
            })
        }

        return res.status(200).json({
            success: true,
            data: recipeBook
        })
    })
        .catch(err => console.log(err))
}

getRecipeBookById = async (req, res) => {
    await RecipeBook.findOne({ _id: req.params.id }, (err, recipeBook) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!recipeBook) {
            return res.status(404).json({
                success: false,
                error: "Recipe book not found!"
            })
        }

        return res.status(200).json({
            success: true,
            data: recipeBook
        })
    })
        .catch(err => console.log(err))
}

getRecipeBooks = async (req, res) => {
    await RecipeBook.find({}, (err, recipeBooks) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!recipeBooks.length) {
            return res.status(400).json({
                success: false,
                error: "Recipe book not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: recipeBooks
        })
    })
        .catch(err => console.log(err))
}

module.exports = {
    createRecipeBook,
    updateRecipeBook,
    deleteRecipeBook,
    getRecipeBookById,
    getRecipeBooks
}