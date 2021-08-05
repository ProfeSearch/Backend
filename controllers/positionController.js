const Position = require('../models/positionModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllPositions = factory.getAll(Position);

exports.setData = (req, res, next) => {
    //TODO
    next();
};

exports.getPosition = factory.getOne(Position);

exports.createPosition = factory.createOne(Position);

exports.deletePosition = factory.deleteOne(Position);

exports.updatePosition = factory.updateOne(Position);
