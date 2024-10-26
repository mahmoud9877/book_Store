import * as dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  api_key: 666485453323836,
  api_secret: "q2p2KwELWmlwOXERZqmVC4Jt9TU",
  cloud_name: "ecommerce1911",
  secure: true,
});

export default cloudinary;
