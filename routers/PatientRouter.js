const Route = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const upload = require('../midleWare/uploadFile')
const patientController = require('../controllers/PatientController')

Route.post("/register", patientController.register)

Route.get('/allpatient', patientController.getAllpatients)
Route.get('/getpatientbyid/:id', passport.authenticate('jwt', { session: false }), patientController.getpatientById)
Route.get('/getpatientbyrole/:role', patientController.getpatientbyRole)
Route.delete('/deletepatientbyid/:id',  patientController.deletepatientById)
Route.put('/avatar/:id', passport.authenticate('jwt', { session: false }), upload.single("avatar"), patientController.uploadavatar);
Route.get("/getme", passport.authenticate('jwt', { session: false }), patientController.getme)




module.exports = Route;