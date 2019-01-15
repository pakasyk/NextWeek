var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    name: String, // Bench Press
    category: String,  //from schema
    muscle: String, //from schema
    equipment: String, //from schema
    image: String, //url
    status: Boolean, //true - active, false - deleted
    description: String,
    // date_created: Date,
    // date_updated: Date,
    // date_deleted: Date,
    // user_created: String,
    // user_updated: String,
    // user_deleted: String,
});

var ExerciseCategorySchema = new Schema({
    name: String, // Cardio, Streching, Lifting Weights
});

var ExerciseMuscleSchema = new Schema({
    name: String, // Chest, Legs, Back, Shoulders
});

var ExerciseEquipmentSchema = new Schema({
    name: String, // Dumbells, Barbell, Bodyweight
});

module.exports.Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports.Category = mongoose.model('Category', ExerciseCategorySchema);
module.exports.Muscle = mongoose.model('Muscle', ExerciseMuscleSchema);
module.exports.Equipment = mongoose.model('Equipment', ExerciseEquipmentSchema);