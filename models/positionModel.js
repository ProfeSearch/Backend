//TODO
const mongoose = require('mongoose');
const Faculty = require('./facultyModel');

const positionSchema = new mongoose.Schema({
    //TODO
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty',
        required: [true, 'A position must be posted by a faculty!'],
    },
    title: {
        type: String,
        required: [true, 'A position must have a title!'],
    },
    description: {
        type: String,
        required: [true, 'A position must have a description!'],
        minlength: [50, 'Description should have at least 50 words!'],
    },
    positionType: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: [true, 'A position must have a type!'],
    },
    field: {
        type: String,
    },
    location: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    target: [
        {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
        },
    ],
    deadline: {
        type: Date,
        default: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        required: [true, 'A position must have a deadline!'],
    },
    released: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: [true, 'A position must have a status!'],
    },
});

positionSchema.virtual('applications', {
    ref: 'Application',
    foreignField: 'position',
    localField: '_id',
});

positionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'faculty',
        select: '-__v -user -positions',
    });
    next();
});

const Position = mongoose.model('position', positionSchema);

module.exports = Position;
