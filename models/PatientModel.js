const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const userModel = require('./UserModel')

const patientschema = new mongoose.Schema({
    /* email: {
        type: String,
        unique: true,
        required: true },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true

    }, 
    phoneNumber: {
        type: Number,
        required: true

    },*/
    birthDate: {
        type: Date,
    },
   /*  adresse: {
        type: String,
        required: true
    }, */
    gender: {
        enum: ["Male", "Female"],
        type:String
    },

    
   /*  avatar: {
        type: String,
        default: 'avatar.png'
      } */

}
,
{timestamps:true})



module.exports = userModel.discriminator('Patient', patientschema);