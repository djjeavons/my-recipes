const express = require("express")
const RecipeBookCtrl = require("../controllers/recipe-book-ctrl")
const router = express.Router()

router.post("/recipebook", RecipeBookCtrl.createRecipeBook)
router.put("/recipebook/:id", RecipeBookCtrl.updateRecipeBook)
router.delete("/recipebook/:id", RecipeBookCtrl.deleteRecipeBook)
router.get("/recipebook/:id", RecipeBookCtrl.getRecipeBookById)
router.get("/recipebooks", RecipeBookCtrl.getRecipeBooks)

module.exports = router