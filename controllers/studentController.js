const multer = require('multer');
const Student = require('../models/studentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getMyCommonApp = catchAsync(async (req, res, next) => {
    const student = await Student.findOne({ user: req.user.id }).select(
        '-__v -applications'
    );

    res.status(200).json({
        status: 'success',
        data: {
            CommonApp: student,
        },
    });
});

exports.createMyCommonApp = factory.createOne(Student);

exports.updateMyCommonApp = catchAsync(async (req, res, next) => {
    const studentId = (await Student.findOne({ user: req.user.id })).id;
    const student = await Student.findByIdAndUpdate(studentId, req.body, {
        new: true,
        runValidators: true,
        select: '-__v -applications',
    });

    res.status(200).json({
        status: 'success',
        data: {
            CommonApp: student,
        },
    });
});

// exports.getMyFavorites = catchAsync(async (req, res, next) => {
//
//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: null,
//         },
//     });
// });

// exports.createFavorite = catchAsync(async (req, res, next) => {
//
//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: null,
//         },
//     });
// });

// exports.deleteFavorite = catchAsync(async (req, res, next) => {
//
//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: null,
//         },
//     });
// });
