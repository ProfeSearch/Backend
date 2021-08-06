const express = require('express');
const facultyController = require('../controllers/facultyController');
const authController = require('../controllers/authController');
// const positionRouter = require('./positionRoutes');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('faculty'));

// router.use('/myPositions', positionRouter);

router
    .route('/myProfile')
    .get(facultyController.getMyProfile)
    //.post(facultyController.createMyProfile)
    .patch(facultyController.updateMyProfile);

module.exports = router;
