const mongoose = require('mongoose');
const Faculty = require('./facultyModel');
const AreaEnums = require('../enums/areaEnums');
const PositionTypeEnums = require('../enums/positionTypeEnums');
const locationEnums = require('../enums/locationEnums');
const targetEnums = require('../enums/targetAudienceEnums');
const posStatusEnums = require('../enums/posStatusEnums');

const positionSchema = new mongoose.Schema(
    {
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
        // changed for enum
        positionType: {
            type: String,
            set: (el) => PositionTypeEnums[el], // starts from -1
            default: 'Unspecified',
            required: [true, 'A position must have a type!'],
        },
        area: {
            type: String,
            set: (el) => AreaEnums[el],
            default: 'Unspecified',
        },
        // changed for enum
        location: {
            type: String,
            set: (el) => locationEnums[el], // starts from -1
            default: 'Unspecified',
        },
        // changed for enum
        target: [
            {
                type: String,
                set: (el) => targetEnums[el],
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
        // changed for enum
        status: {
            type: String,
            set: (el) => posStatusEnums[el], // starts from -1
            default: 'all',
            required: [true, 'A position must have a status!'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

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
