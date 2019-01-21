const Workout = require('../models/Workout');
let workoutController = {};


workoutController.showAll = (req, res) => {
res.render("workout/workout");
}

/* saving new workout*/
workoutController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let workoutas = JSON.parse(req.body.data);
    let newWorkout = new Workout({
        ...workoutas  
    })
    console.log("before.save");
    
    newWorkout.save((err, workouts) => {
        if (err) throw err;
        console.log(workouts);
        next();
    })

}

module.exports = workoutController;
