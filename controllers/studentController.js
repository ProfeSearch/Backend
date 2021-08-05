const multer = require('multer');
const Student = require('../models/studentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getMyCommonApp = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.createMyCommonApp = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.updateMyCommonApp = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.getMyFavorites = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.createFavorite = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});

exports.deleteFavorite = catchAsync(async (req, res, next) => {
    //TODO
    res.status(200).json({
        status: 'success',
        data: {
            data: null,
        },
    });
});
