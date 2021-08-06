const express = require('express');
const positionController = require('../controllers/positionController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(authController.checkStatus, positionController.getAllPositions);
router.route('/:id').get(positionController.getPosition);

router.use(authController.protect, authController.restrictTo('faculty'));

router
    .route('/')
    .get(positionController.getAllPositions)
    .post(positionController.setData, positionController.createPosition);
router
    .route('/:id')
    .get(positionController.getPosition)
    .patch(positionController.updatePosition)
    .delete(positionController.deletePosition);

module.exports = router;
