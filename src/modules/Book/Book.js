import bookModel from "../../../DB/modules/bookModel.js";
import BookModel from "../../../DB/modules/bookModel.js";
import { categoryModel } from "../../../DB/modules/categoryModel.js"; // Assuming you're using this model for categories
import cloudinary from "../../utils/cloudinary.js"; // Make sure you have cloudinary configured
import { asyncHandler } from "../../utils/errorHandling.js";

// Get a book from the database
export const getBook = asyncHandler(async (req, res, next) => {
  try {
    const checkBook = await BookModel.find({});
    if (!checkBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book: checkBook });
  } catch (error) {
    next(error);
  }
});

export const getBookDetails = asyncHandler(async (req, res, next) => {
  const { bookId } = req.params; // Assuming the book ID is passed in the URL

  // Find the book by its ID
  const book = await bookModel.findById({ _id: req.params.id });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // If found, return the book details
  return res.status(200).json({ message: "Done", book });
});

export const addBook = asyncHandler(async (req, res, next) => {
  try {
    const { bookTitle, author, description, price, category, quantity } =
      req.body;

    console.log({
      bookTitle,
      author,
      description,
      price,
      category,
      quantity,
    });

    // Check for required fields
    if (
      !bookTitle ||
      !author ||
      !description ||
      !price ||
      !category ||
      !quantity
    ) {
      return res.status(400).json({
        error:
          "All fields are required: book title, author, description, price, category name, quantity.",
      });
    }

    // Check if category exists by name
    const categoryData = await categoryModel.findOne({ name: category });
    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required",
      });
    }

    // Upload the image to Cloudinary
    let secure_url, public_id;
    try {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/book`,
      });
      secure_url = uploadResponse.secure_url;
      public_id = uploadResponse.public_id;
    } catch (uploadError) {
      return res.status(500).json({
        error: "Failed to upload image to Cloudinary",
      });
    }

    // Create new book
    const newBook = await BookModel.create({
      bookTitle,
      author,
      description,
      image: secure_url, // Save the image URL
      price,
      category: category, // Use the category name
      quantity,
    });

    return res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    next(error);
  }
});

export const updateBook = asyncHandler(async (req, res) => {
  try {
    const { bookTitle, author, description, price, category, quantity } =
      req.body;
    console.log(req.body);

    // Check for required fields
    if (
      !bookTitle ||
      !author ||
      !description ||
      !price ||
      !category ||
      !quantity
    ) {
      return res.status(400).json({
        error:
          "All fields are required: book title, author, description, price, category, quantity.",
      });
    }

    // Check if an image file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `${process.env.APP_NAME}/book`,
        }
      );
      console.log(secure_url, public_id);
    }

    // Check if category already exists
    let existingCategory = await categoryModel.findById({
      _id: category,
    });
    console.log(existingCategory);

    // let categoryId;
    // if (existingCategory) {
    //   categoryId = existingCategory._id; // Use the existing category
    // } else {
    //   // Create new category if it doesn't exist
    //   const createCategory = await categoryModel.create({
    //     name: category.toLowerCase(), // Save category in lowercase
    //     image: { secure_url, public_id },
    //   });
    //   categoryId = createCategory._id; // Store the new category ID
    // }
    if (req.file) {
      // Create new book
      const newBook = await BookModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          bookTitle,
          author,
          description,
          image: secure_url, // Save the image URL
          price,
          category: existingCategory._id, // Link to the existing or newly created category
          quantity,
        }
      );
      return res.status(201).json({
        message: "Book added successfully",
        book: newBook,
        existingCategory,
      });
    } else {
      // Create new book
      console.log(req.params.id);

      const newBook = await BookModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          bookTitle,
          author,
          description,
          price,
          //  category: existingCategory._id, // Link to the existing or newly created category
          quantity,
        }
      );
      return res.status(201).json({
        message: "Book updated successfully",
        book: newBook,
        existingCategory,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export const deleteBook = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);

    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});
