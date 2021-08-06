const express = require('express');
const positionController = require('../controllers/positionController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// Not allowing access to not-signed-in users for now

// ---------- updated routing


router.use(authController.protect, authController.checkStatus);

// displays all positions for both faculty and students
// queries can be applied? 
router
    .route('/')
    .get(positionController.getAllPositions);

// displays single position by id
router
    .route('/:id')
    .get(positionController.getPosition);

// creates a new position
router
    .route('/new')
    .post(positionController.setData, positionController.createPosition);

// update OR delete a position by id
// only "faculty" are granted access

// router.use(authController.restrictTo('faculty'));
router
    .route('/:id')
    .patch(authController.restrictTo('faculty'), positionController.updatePosition)
    .delete(authController.restrictTo('faculty'), positionController.deletePosition);
    

// ------------------------
// ------------ old routing
// router
//     .route('/')
//     .get(authController.checkStatus, positionController.getAllPositions);
// router.route('/:id').get(positionController.getPosition);

// router.use(authController.protect, authController.restrictTo('faculty'));

// router
//     .route('/')
//     .get(positionController.getAllMyPositions)
//     .post(positionController.setData, positionController.createPosition);
// router
//     .route('/:id')
//     .get(positionController.getMyPosition)
//     .patch(positionController.updatePosition)
//     .delete(positionController.deletePosition);

module.exports = router;
