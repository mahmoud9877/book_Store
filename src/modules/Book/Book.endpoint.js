import { roles } from "../../middleware/auth.js";
export const endpoint = {
  addBook: [roles.User],
  deleteBook: [roles.Admin],
  updateBook: [roles.Admin],
  getBook: [roles.User],
};
