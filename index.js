import { verifyEmail } from "./src/core/verifyEmail.js";

const result = await verifyEmail("test@gmail.com");

console.log(result);