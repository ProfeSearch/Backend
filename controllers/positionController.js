const Position = require('../models/positionModel');
const Student = require('../models/studentModel');
const Faculty = require('../models/facultyModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const gradeEnums = require('../enums/gradeEnums');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// distinguishes between faculty and student
// and acts different accordingly

// TODO  make it omit sending "description"
exports.getAllPositions = catchAsync(async (req, res, next) => {
    if (!req.baseUrl.includes('/positions')) return next();
    // if it is a student, only allow access to materials of his grade
    if (req.identity === 'student'){
        let gradeValue = (await Student.findOne({ user: req.user.id })).grade;
        // console.log("The student has grade: "+ gradeValue);
        gradeValue = gradeEnums.indexOf(gradeValue);
        // console.log("The student has grade: "+ gradeValue);
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
        // if it is a faculty, only queries the positions he/she posted
    } else if (req.identity === 'faculty') {
        const faculty = (await Faculty.findOne({ user: req.user.id })).id;

        const features = new APIFeatures(
            Position.find({ faculty }),
            req.query
        )
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;

        // const doc = await Position.find({ faculty });

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            total: doc.length,
            data: {
                Positions: doc,
            },
        });
    } else {
        return next(new AppError('Cannot get "req.identity"... ', 404));
    }
});

// exports.getAllMyPositions = catchAsync(async (req, res, next) => {
//     //api/faculties/myPositions
//     if (!req.baseUrl.includes('/myPositions')) return next();
//     const faculty = (await Faculty.findOne({ user: req.user.id })).id;

//     const doc = await Position.find({ faculty });

//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         total: doc.length,
//         data: {
//             Positions: doc,
//         },
//     });
// });

// very good helper function, still necessary
exports.setData = catchAsync(async (req, res, next) => {
    //delete duplicate values
    req.body.target = Array.from(new Set(req.body.target));
    req.body.faculty = (await Faculty.findOne({ user: req.user.id })).id;
    next();
});

// Distinguishes between student and faculty
// visibilities rules apply similarly as above
exports.getPosition = catchAsync(async (req, res, next) => {
    if (req.identity === 'student') {
        // where does req.user.id come from?
        const gradeValue = (await Student.findOne({ user: req.user.id })).grade;
        if (!req.baseUrl.includes('/positions')) return next();
        const doc = await Position.findById(req.params.id); // why request params? not body?

        if (!doc) {
            return next(new AppError('Invalid Doc Id', 404));
        }

        if (doc.target !== gradeValue) {
            return next(
                new AppError(
                    'Can not access to position for another grade',
                    404
                )
            );
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                Position: doc,
            },
        });
    } else if (req.identity === 'faculty') {
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
    } else {
        return next(new AppError('Cannot get "req.identity"... ', 404));
    }
});

// exports.getMyPosition = catchAsync(async (req, res, next) => {
//     //api/faculties/myPositions/:id
//     if (!req.baseUrl.includes('/myPositions')) return next();
//     let query = Position.findById(req.params.id);
//     query = query.populate('applications');
//     const doc = await query;

//     if (!doc) {
//         return next(new AppError('Invalid Doc Id', 404));
//     }

//     const facultyId = (await Faculty.findOne({ user: req.user.id })).id;
//     if (doc.faculty.id !== facultyId) {
//         return next(
//             new AppError('Can not access others positions from here', 404)
//         );
//     }

//     res.status(200).json({
//         status: 'success',
//         total: doc.length,
//         data: {
//             position: doc,
//         },
//     });
// });

// create position works just fine

exports.createPosition = catchAsync(async (req, res, next) => {
    const doc = await Position.create(req.body);
    // const faculty = await Faculty.findById(req.user.id);
    const faculty = await Faculty.findOne({ user: req.user.id });
    console.log('finding faculty by id: ', req.user.id);

    faculty.positions.push(doc.id);
    faculty.save();
    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});

// // TODO
// exports.close = catchAsync(async (res, req, next) => {

// })

exports.deletePosition = factory.deleteOne(Position);

// TODO might have to customize
exports.updatePosition = factory.updateOne(Position);
