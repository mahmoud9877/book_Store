import express from "express";
import * as categoryController from "./category.js";

const router = express.Router();

// Route for creating a new category
router.post("/", categoryController.createCategory);

// Route for getting all categories
router.get("/", categoryController.getCategories);

// Route for getting predefined category options
router.get("/options", categoryController.getCategoryOptions);

// Route for getting a single category by ID
router.get("/:id", categoryController.getCategoryById);

// Route for updating a category by ID
router.put("/:id", categoryController.updateCategory);

// Route for deleting a category by ID
router.delete("/:id", categoryController.deleteCategory);

export default router;
