/* Controller includes Exercise, Muscle, Equipment, Category */

const {Exercise, Muscle, Category, Equipment} = require('../models/Exercise');
let exerciseController = {};
let muscleController = {};
let categoryController = {};
let equipmentController = {};

/* saving new exercise*/
exerciseController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newExercise = Exercise({
        name: req.body.name,
        muscle: req.body.muscle,
    })
   
    newExercise.save((err, exercise) => {
        if (err) throw err;
        console.log(exercise);
        next();
    })
    
}

/* showing all exercises on exercises/exercises */
exerciseController.showAll = (req, res) =>{
    console.log("showAll");
    let muscles;
    Muscle.find({}, (err, muscleList)=>{ 
        if (err) throw err; 
        muscles = muscleList;
    })
    Exercise.find({}, (err, exercises)=>{ 
        if (err) throw err; 
        console.log(exercises[0].muscle);
        console.log(typeof(exercises[0].muscle));
        JSON.stringify(exercises.muscle);
        
        res.render('exercise/exercise', {exerciseList: exercises, muscleList: muscles});
    })
}

/* saving new muscle*/
muscleController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newMuscle = Muscle({
        name: req.body.name,
    })
   
    newMuscle.save((err, muscle) => {
        if (err) throw err;
        console.log(muscle);
        next();
    })
    
}

/* showing all muscles on exercises/muscles */
muscleController.showAll = (req, res) =>{
    console.log("showAll");
    Muscle.find({}, (err, muscles)=>{ 
        if (err) throw err; 
        res.render('exercise/muscle', {muscleList: muscles});
    })
}

/* saving new equipment*/
equipmentController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newEquipment = Equipment({
        name: req.body.name,
    })
   
    newEquipment.save((err, equipment) => {
        if (err) throw err;
        console.log(equipment);
        next();
    })
    
}

/* showing all equipments on exercises/equipments */
equipmentController.showAll = (req, res) =>{
    console.log("showAll");
    Equipment.find({}, (err, equipments)=>{ 
        if (err) throw err; 
        console.log("equipments: "+equipments);
        res.render('exercise/equipment', {equipmentList: equipments});
    })
}


/* saving new category*/
categoryController.onCreate = (req, res, next) => {
    console.log("onCreate");
    let newCategory = Category({
        name: req.body.name,
    })
   
    newCategory.save((err, category) => {
        if (err) throw err;
        console.log(category);
        next();
    })
    
}

/* showing all categories on exercises/categories */
categoryController.showAll = (req, res) =>{
    console.log("showAll");
    Category.find({}, (err, categories)=>{ 
        if (err) throw err; 
        res.render('exercise/category', {categoryList: categories});
    })
}



module.exports = {exerciseController, muscleController, categoryController, equipmentController};