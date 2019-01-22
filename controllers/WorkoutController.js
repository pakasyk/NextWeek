const Workout = require('../models/Workout');
let workoutController = {};


workoutController.showAll = (req, res) => {
    console.log("showAll");    

    Workout.find({status: true})
        
        .exec((err, workouts) => {
            if (err) throw err;

            // console.log(workouts[13].name);
            res.render('workout/workout', {
                workoutList: workouts,
               
            });

})
}

/* saving new workout*/
workoutController.onCreate = (req, res, next) => {
    console.log("onCreate");
    console.log(req.body.data);
    
    let workoutas = JSON.parse(req.body.data);
    let newWorkout = new Workout({
        ...workoutas  
    })
    console.log("before.save");
    
    newWorkout.save((err, workouts) => {
        if (err) throw err;
        console.log(workouts);
        
    })

}

module.exports = workoutController;
