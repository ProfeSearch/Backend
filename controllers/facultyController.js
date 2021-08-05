const multer = require('multer');
const sharp = require('sharp');
const Faculty = require('../models/facultyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getMyProfile = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.createMyProfile = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});
