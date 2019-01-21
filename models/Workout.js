const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: String, // Bench Press
    exercises: [
        {
            // id: String,
            // sets: [{
            //     rep:Number,
            //     weight:Number
            // }]
        }
    ],
});



const Workout = mongoose.model('Workout', WorkoutSchema);


module.exports = Workout;