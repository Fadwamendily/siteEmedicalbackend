const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const userModel = require('./UserModel')


const laboSchema = new mongoose.Schema({
/*     email: {
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

    },
    
    adresse: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'avatar.png'
      } */
},
{timestamps:true})



module.exports = userModel.discriminator('Labo', laboSchema);