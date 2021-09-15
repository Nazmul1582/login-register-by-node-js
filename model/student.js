const mongoose = require("mongoose")
const {Schema} = mongoose;

const studentSchema = new Schema({
    firstName : String,
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    }, 
    password : String,
    user : String,
    isDeleted : {
        type : Boolean, 
        default : false
    }
});

module.exports = mongoose.model('student', studentSchema);