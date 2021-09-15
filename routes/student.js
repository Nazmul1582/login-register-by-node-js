const express = require('express');
const router = express.Router();
const {getById, getAll, register, login} = require('../controller/student');
const isAuth = require('../middleware');

router.get('/student/:id([0-9]{4})', getById);
router.get('/all-student', isAuth, getAll);
router.post('/student/register', register);
router.post('/student/login', login);


module.exports = router;
