const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: String, // Bench Press
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise'},[Schema.Types.Mixed]]
});



const Workout = mongoose.model('Workout', WorkoutSchema);


module.exports = {
    Workout,   
};