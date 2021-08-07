const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect, authController.restrictTo('student'));
// Shouldn't restrict to 'student' because faculty can also accept or reject an application
router.use(authController.protect, authController.checkStatus);

router
    .route('/')
    // only student will need to check for all of his applications
    // professors check applications per each of their positions
    .get(
        authController.restrictTo('student'),
        applicationController.getAllApplications
    )
router
    .route('/positions/:id')
    .post(
        authController.restrictTo('student'), // only a student can create an application
        applicationController.setData,
        applicationController.createApplication
    );

router
    .route('/:id')
    // both faculty and student should be able to see an application given its id
    // in terms of getting info regarding a single application, faculty and student DON'T DIFFER
    .get(applicationController.getApplication)

    // only a faculty can accept or reject
    .patch(
        authController.restrictTo('faculty'),
        applicationController.updateApplication
    )
    .delete(applicationController.deleteApplication);

module.exports = router;
