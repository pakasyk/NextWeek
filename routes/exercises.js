const express = require('express');
const router = express.Router();
const {exerciseController, muscleController, equipmentController, categoryController} = require('../controllers/ExerciseContoller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


/* GET exercises listing. */
router.get('/', exerciseController.showAll);
router.post('/', exerciseController.onCreate, exerciseController.showAll);

router.get('/muscles', muscleController.showAll);
router.post('/muscles', muscleController.onCreate, muscleController.showAll);

router.get('/equipments', equipmentController.showAll);
router.post('/equipments', equipmentController.onCreate, equipmentController.showAll);

router.get('/categories', categoryController.showAll);
router.post('/categories', categoryController.onCreate, categoryController.showAll);


module.exports = router;