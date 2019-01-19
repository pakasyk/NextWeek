const Workout = require('../models/Workout');
let workoutController = {};


workoutController.showAll = (req, res) => {
res.render("workout/workout");
}



module.exports = workoutController;
