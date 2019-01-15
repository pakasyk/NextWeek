var Muscle = require('../models/Exercise').Muscle;
var muscleController = {};


muscleController.allMuscles = (req, res)=>{
    var muscleList = [];
    Muscle.find({}, (err, muscle)=>{
        muscle.map((muscle) => muscleList.push({pavadinimas:muscle.name}));    
        res.render('muscle', {muscleList: muscleList});
    });
}

userController.myProfile =  (req, res) => {
    User.findOne({name: req.params.name}, (err, userFromDB)=>{        
      res.render('profile', {user: userFromDB});
    })
}

module.exports = userController;