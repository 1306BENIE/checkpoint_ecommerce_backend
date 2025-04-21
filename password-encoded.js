require("dotenv").config();

const PASSWORD = process.env.PASSWORD;
const encodepasswords = encodeURIComponent(PASSWORD);

console.log("[] password encoded: ", encodepasswords);
