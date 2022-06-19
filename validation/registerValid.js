const isEmpty = require('./isEmpty');
const validator = require('validator');

module.exports = function ValidateRegister(data) {
    let error = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.adresse = !isEmpty(data.adresse) ? data.adresse : "";


    if (validator.isEmpty(data.firstName)) {
        error.firstName = "Required firstName";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Required format email";
    }
    if (validator.isEmpty(data.email)) {
        error.email = "Required email";
    }
    /*if (validator.isEmpty(data.role)) {
        errors.role = "Required role";
    }*/
    /*if (validator.isEmpty(data.adress)) {
        errors.adress = 'Required adress'
    }*/
    if (validator.isEmpty(data.password)) {
        errors.password = "Required password";
    }
    /*if (validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Required phoneNumber";
    }*/
    /*if (validator.isEmpty(data.avatar)){
        errors.avatar= "Required avatar";
    }*/

    return {
        error,
        isValid: isEmpty(error)
    }


};