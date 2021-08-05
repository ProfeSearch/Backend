const Application = require('../models/applicationModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllApplications = factory.getAll(Application);

exports.setData = (req, res, next) => {
    //TODO
    next();
};

exports.getApplication = factory.getOne(Application);

exports.createApplication = factory.createOne(Application);

exports.deleteApplication = factory.deleteOne(Application);

exports.updateApplication = factory.updateOne(Application);
