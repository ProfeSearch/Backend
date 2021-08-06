const multer = require('multer');
const Faculty = require('../models/facultyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getMyProfile = catchAsync(async (req, res, next) => {
    const faculty = await Faculty.findOne({ user: req.user.id }).select(
        '-__v -positions'
    );

    res.status(200).json({
        status: 'success',
        data: {
            profile: faculty,
        },
    });
});

exports.createMyProfile = factory.createOne(Faculty);

exports.updateMyProfile = catchAsync(async (req, res, next) => {
    const facultyId = (await Faculty.findOne({ user: req.user.id })).id;
    const faculty = await Faculty.findByIdAndUpdate(facultyId, req.body, {
        new: true,
        runValidators: true,
        select: '-__v -positions',
    });

    res.status(200).json({
        status: 'success',
        data: {
            profile: faculty,
        },
    });
});
