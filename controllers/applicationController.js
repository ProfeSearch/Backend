const Application = require('../models/applicationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Student = require('../models/studentModel');
const factory = require('./handlerFactory');
const Position = require('../models/positionModel');

// TODO only needs to work for students
exports.getAllApplications = catchAsync(async (req, res, next) => {
    const student = (await Student.findOne({ user: req.user.id })).id;

    const doc = await Application.find({ student })
        .select('-student -__v')
        .populate({
            path: 'position',
            select: '-description -target -released -deadline -status -__v',
            populate: { path: 'faculty', select: 'name' },
        });

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        total: doc.length,
        data: {
            Positions: doc,
        },
    });
});

exports.setData = catchAsync(async (req, res, next) => {
    const position = await Position.findById(req.params.id);
    if (!position) {
        return next(new AppError('Invalid Position Id', 404));
    }
    req.body.position = req.params.id;
    req.body.student = (await Student.findOne({ user: req.user.id })).id;
    req.body.status = 1;
    next();
});

// TODO
// finds a specified application through id
exports.getApplication = catchAsync(async (req, res, next) => {
    if (req.identity === 'student') {
        const doc = await Application.findById(req.params.id).select('-student -__v')
        .populate({
            path: 'position',
            select: '-target -released -deadline -status -__v',
            populate: { path: 'faculty', select: 'name' },
        });

        if (!doc) {
            return next(new AppError('Invalid Application Id', 404));
        }

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                Application: doc,
            },
        });
    }
    else if (req.identity === 'faculty') {
        const doc = await Application.findById(req.params.id).select('-__v')
        .populate({
            path: 'position',
            select: '-target -released -deadline -status -__v',
            populate: { path: 'faculty', select: 'name' },
        });

        if (!doc) {
            return next(new AppError('Invalid Application Id', 404));
        }

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                Application: doc,
            },
        });
    } else {
        return next(new AppError('Cannot get "req.identity"... ', 404));
    }
});

//request data already handled with setData
exports.createApplication = factory.createOne(Application);

exports.deleteApplication = factory.deleteOne(Application);

// TODO might have to customize
exports.updateApplication = factory.updateOne(Application);
