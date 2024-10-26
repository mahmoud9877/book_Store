import { roles } from "../../middleware/auth.js";
const endpoint = {
  addToCart: [roles.Admin],
  deleteFromCart: [roles.Admin],
};
export default endpoint
