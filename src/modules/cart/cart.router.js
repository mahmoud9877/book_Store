import { Router } from "express";
// import * as validators from "../cart/cart.validation.js";
import * as cartController from "../cart/cart.js";
import endpoint  from "./cart.endPoint.js";
// import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Assuming auth middleware adds the authenticated user's info to req.user
router.get(
  "/",
  auth(endpoint.addToCart),
  cartController.getCart // Controller to handle the cart retrieval
);

router.post(
  "/add",
  auth(endpoint.addToCart),
  // validation(validators.addToCart),
  cartController.addToCart
);

// Route to clear the cart
router.delete("/clear", auth(endpoint.addToCart));

router.delete(
  "/:bookId",
  auth(endpoint.deleteFromCart),
  cartController.deleteCartItem
);

export default router;
