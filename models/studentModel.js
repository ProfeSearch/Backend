//TODO
const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A student must have an account!'],
    },
    name: {
        type: String,
        required: [true, 'A student must have a name!'],
    },
    institution: {
        type: String,
        required: [true, 'A student must have an institution!'],
        default: 'University Of Southern California',
    },
    major: {
        type: String,
        required: [true, 'A student must have a major!'],
        default: 'Computer Science',
    },
    grade: {
        type: String,
        required: [true, 'A student must have a grade!'],
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Master', 'Doctor'],
        default: 'Freshman',
    },
    applications: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Application',
        },
    ],
});

studentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: '_id email',
    });
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
