const Position = require('../models/positionModel');
const Student = require('../models/studentModel');
const Faculty = require('../models/facultyModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const gradeEnums = require('../enums/gradeEnums');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllPositions = catchAsync(async (req, res, next) => {
    //api/positions
    if (!req.baseUrl.includes('/positions')) return next();
    if (req.identity !== 'student') {
        const features = new APIFeatures(Position.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            total: doc.length,
            data: {
                Positions: doc,
            },
        });
    } else {
        const gradeValue = (await Student.findOne({ user: req.user.id })).grade;
        const features = new APIFeatures(
            Position.find({ target: gradeValue }),
            req.query
        )
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            total: doc.length,
            data: {
                Positions: doc,
            },
        });
    }
});

exports.getAllMyPositions = catchAsync(async (req, res, next) => {
    //api/faculties/myPositions
    if (!req.baseUrl.includes('/myPositions')) return next();
    const faculty = (await Faculty.findOne({ user: req.user.id })).id;

    const doc = await Position.find({ faculty });

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
    //delete duplicate values
    req.body.target = Array.from(new Set(req.body.target));
    req.body.faculty = (await Faculty.findOne({ user: req.user.id })).id;
    next();
});

exports.getPosition = catchAsync(async (req, res, next) => {
    //api/positions/:id
    if (!req.baseUrl.includes('/positions')) return next();
    const doc = await Position.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            Position: doc,
        },
    });
});

exports.getMyPosition = catchAsync(async (req, res, next) => {
    //api/faculties/myPositions/:id
    if (!req.baseUrl.includes('/myPositions')) return next();
    let query = Position.findById(req.params.id);
    query = query.populate('applications');
    const doc = await query;

    if (!doc) {
        return next(new AppError('Invalid Doc Id', 404));
    }

    const facultyId = (await Faculty.findOne({ user: req.user.id })).id;
    if (doc.faculty.id !== facultyId) {
        return next(
            new AppError('Can not access others positions from here', 404)
        );
    }

    res.status(200).json({
        status: 'success',
        total: doc.length,
        data: {
            position: doc,
        },
    });
});

exports.createPosition = catchAsync(async (req, res, next) => {
    const doc = await Position.create(req.body);
    const faculty = await Faculty.findById(req.body.faculty);
    faculty.positions.push(doc.id);
    faculty.save();
    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});

exports.deletePosition = factory.deleteOne(Position);

exports.updatePosition = factory.updateOne(Position);
