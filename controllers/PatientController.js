const patientModel = require('../models/PatientModel')
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
require('dotenv').config();
const ValidateRegister = require('../validation/registerValid')
const ValidateLogin = require('../validation/loginValid')
function signToken(patientID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: patientID
    }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

}
module.exports = {

    register: (req, res) => {
        const { email, password, role } = req.body;

        patientModel.findOne({ email }, function (err, patient) {
            if (err)
                return res.status(500).json({ msg: err.message, error: true })
            if (patient)
                return res.status(400).json({ msg: "patient already exist", error: true })
            else {
                const newpatient = new patientModel(req.body)

                newpatient.save((err, patient) => {
                    if (err)
                        return res.status(500).json({ msg: err.message, error: true })
                    else {
                        const token = signToken(patient.id);
                        //httpOnly prevents XSS (read in my authentication doc for more info)
                        res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });

                        return res.status(200).json({ isAuthenticated: true, patient: { email, role }, error: false })
                    }
                })
            }
        })
    },
    


    getAllpatients: function (req, res) {

        patientModel.find({}, (err, patients) => {
            if (err) {
                res.json({ message: 'error get all patients' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'all patients in system', size: patients.length, data: patients, status: 200 })

            }
        })

    },

    getpatientById: function (req, res) {

        patientModel.findById({ _id: req.params.id })

            .exec((err, patient) => {
                if (err) {
                    res.json({ message: 'error get one patient' + err, data: null, status: 500 })
                }
                else {
                    res.json({ message: ' patient in system', data: patient, status: 200 })


                }
            })
    },

    getpatientbyRole: function (req, res) {

        patientModel.find({ role: req.params.role }, (err, patient) => {
            if (err) {
                res.json({ message: 'error get one patient' + err, data: null, status: 500 })
            } else {
                res.json({ message: ' patients in system', data: patient, status: 200 })
            }
        })
    },


    deletepatientById: function (req, res) {

        patientModel.findByIdAndDelete({ _id: req.params.id }, (err, patient) => {

            if (err) { res.json({ message: 'error delete  one patient' + err, data: null, status: 500 }) }
            else { res.json({ message: 'one patient delete system', data: patient, status: 200 }) }

        })

    },


    uploadavatar: (req, res) => {
        //let avatar= req.file.filename;
        const avatar = {
            avatar: req.file.filename, //  filename: Le nom du fichier dans le destination
        };
        console.log('fiiiiiiilllleee', req.file);
        //console.log('params', req.params);

        if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/png') {
            patientModel.findByIdAndUpdate({ _id: req.params.id }, avatar, (err, patient) => {
                if (err) {
                    res.status(500).json({ message: "avatar not uploaded" });
                } else {
                    patientModel.findById({ _id: patient.id }, (err, patient) => {
                        if (err) {
                            res.json("error");
                        } else {
                            res.status(200).json({
                                message: "patient updated",
                                data: patient,
                            });
                        }
                    });
                }
            });
        }
        else {
            res.json({ msg: 'please enter a valid extention' })
        }
    },

    /*patientModel.findByIdAndUpdate({ _id: req.params.id }, avatar,{ new: true }, (err, patient) => {
            if (err) {
                res.status(500).json({ message: "avatar not uploaded" });
            } else {
                patientModel.findById({ _id: patient.id }, (err, patient) => {
                    if (err) {
                        res.json("error");
                    } else {
                        if (avatar.mimetype!=='image/jpg') {
                            res.json('please enter a valid extention')
                        }
                        else{
                        res.status(200).json({
                            message: "patient updated",
                            data: patient,
                        });
                    }
                }});
            }
        });*/

    getme: (req, res) => {

        patientModel.findById({ _id: req.patient._id }, (err, patient) => {


            if (err) {
                res.status(500).json({
                    message: 'no patientdetails',
                    data: null,

                })
                console.log('reqspatient', req.patient)
            } else {
                res.status(200).json({
                    message: 'patientdetails',
                    data: patient,


                })
                console.log('reqspatient', req.patient)
            }
        })
    }

}


