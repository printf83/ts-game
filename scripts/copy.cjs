var fs = require("fs");

console.log("Copy static file...");
fs.cpSync("./static", "./dist", { recursive: true });
console.log("Successfully copy static file!");
