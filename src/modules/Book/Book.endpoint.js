import { roles } from "../../middleware/auth.js";
export const endpoint = {
  addBook: [roles.Admin],
  deleteBook: [roles.Admin],
  updateBook: [roles.Admin],
  getBook: [roles.User],
};
