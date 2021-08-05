const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect, authController.restrictTo('student'));

router
    .route('/')
    .get(applicationController.getAllApplications)
    .post(
        applicationController.setData,
        applicationController.createApplication
    );
router
    .route('/:id')
    .get(applicationController.getApplication)
    .patch(applicationController.updateApplication)
    .delete(applicationController.deleteApplication);

module.exports = router;
