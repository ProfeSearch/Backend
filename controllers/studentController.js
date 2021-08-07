const multer = require('multer');
const Student = require('../models/studentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const getProfile = require('../linkedin/getProfile');
const universities = require('../enums/univEnums');

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

exports.getLinkedinProfile = async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.url) {
        console.log('Profile Setting with normal profile');
        return next();
    }
    console.log('Profile Setting with LinkedIn');
    try {
        const profile = await getProfile(
            req.body.username,
            req.body.password,
            req.body.url
        );
        req.body.linkedinWebsite = req.body.url;
        if (profile.profile && profile.profile.name) {
            req.body.name = profile.profile.name;
        }
        if (profile.educations && profile.educations.length > 0) {
            const university = universities.indexOf(
                profile.educations[0].title
            );
            if (university !== -1) {
                req.body.institution = university;
            }
        }
        if (profile.skills && profile.skills.length > 0) {
            let temp = '';
            profile.skills.forEach((el) => {
                temp += el.title;
                temp += ';';
            });
            req.body.skills = temp;
        }
        console.log(req.body);
        next();
    } catch (err) {
        return next(new AppError('LinkedIn Access Failed...', 400));
    }
};

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
