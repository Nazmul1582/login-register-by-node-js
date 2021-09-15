const Student = require('../model/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "afsdp05iadgvok32ditjreifgr345nfv"

const getById = (req, res) => {
    let id = req.params.id;
    res.send(`Your id is ${id}`)
}

const getAll = async(req, res) => {
    const data = await Student.find();
    if(data.length){
        return res.status(200).send(data);
    }else{
        return res.send(`Student not found`);
    }
};

const register = async (req, res) => {
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const student = new Student(req.body);
    const data = await student.save();
    return res.status(201).send({
        message: 'Student added successfully.',
        data
    });
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const student =  await Student.findOne({email});

    if(student){
        const isValid = await bcrypt.compare(password, student.password)
        if(isValid){
            const data = {
                user : student.user,
                email : student.email
            }
            const token = jwt.sign(data, secretKey, {expiresIn: "1h"})
            res.json({
                message: 'Login successful',
                token
            })
        }else{
            res.json({
                message:`Password doesn't match`
            })
        }

    }else{
        res.json({
            message : 'Student not found'
        })
    }
}

module.exports = {
    getById, 
    getAll,
    register,
    login
}