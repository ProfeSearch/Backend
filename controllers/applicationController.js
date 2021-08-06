const Application = require('../models/applicationModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// TODO only needs to work for students
// Should also be able to search according to input parameters
exports.getAllApplications = factory.getAll(Application);

exports.setData = (req, res, next) => {
    //TODO
    next();
};

// TODO
// finds a specified application through id
exports.getApplication = factory.getOne(Application);

// TODO
exports.createApplication = factory.createOne(Application);

exports.deleteApplication = factory.deleteOne(Application);

// TODO might have to customize
exports.updateApplication = factory.updateOne(Application);
