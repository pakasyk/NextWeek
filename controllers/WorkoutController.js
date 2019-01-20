const Workout = require('../models/Workout');
let workoutController = {};


workoutController.showAll = (req, res) => {
res.render("workout/workout");
}

/* saving new workout*/
workoutController.onCreate = (req, res, next) => {
    console.log("onCreate");
    console.log(req.body);

    let newWorkout = Workout({
        name: req.body.name,
        exercises: req.body.exercise,
        sets: req.body.sets,
        
    })
    console.log("before.save");
    
    newWorkout.save((err, workouts) => {
        if (err) throw err;
        console.log(workouts);
        next();
    })

}

module.exports = workoutController;
