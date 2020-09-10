const Dotenv = require("dotenv-webpack");

const env = new Dotenv({
  systemvars: true,
});

console.log(env);
console.log("bill");
