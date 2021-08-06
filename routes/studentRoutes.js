const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
// const applicationRouter = require('./applicationRoutes');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('student'));

// router.use('/myApplications', applicationRouter);

router
    .route('/myCommonApp')
    .get(studentController.getMyCommonApp)
    // .post(studentController.createMyCommonApp)
    .patch(studentController.updateMyCommonApp);

// router
//     .route('/myFavorites')
//     .get(studentController.getMyFavorites)
//     .post(studentController.createFavorite)
//     .delete(studentController.deleteFavorite);

module.exports = router;
