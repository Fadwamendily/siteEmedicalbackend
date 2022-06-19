const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let error = {};


  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";



  if (validator.isEmpty(data.email)) {
    error.email = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "Required password";
  }



  return {
    error,
    isValid: isEmpty(error)
  }
};