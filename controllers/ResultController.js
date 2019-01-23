var BodyWeight = require('../models/User').BodyWeight;
var Measurments = require('../models/User').Measurments;


resultController = {};



resultController.addWeight = (req, res) => {
    
    let newWeight = new BodyWeight({
        user_id: req.user.id,
        weightDay: req.body.weightDay,
        bodyWeight: req.body.bodyWeight,
    })
 
    newWeight.save((err, weight) => {    
            if(err) throw err;
        res.redirect('/resultTracker' )// reikia likti puslapi be reloado
    })
}

resultController.addMeasurments = (req, res) => {

    let measurments = new Measurments({
        user_id: req.user.id,
        measurmentsDay: req.body.measurmentsDay,
        centimetrs: req.body.centimetrs,
    })

    measurments.save((err, centimetrs) => {
        if(err) throw err;
        res.redirect('/resultTracker')
    })
}


//Rezult tracker page
profileController.resultTracker = (req, res) => {
    BodyWeight.find({user_id: req.user.id}, (err, weight) => {
        if (err) throw err;
        res.render('profile/resultTracker', {userResult: weight,});
    })
    Measurments.find({user_id: req.user.id}, (err, centimetrs) => {
        if (err) throw err;
        res.render('profile/resultTracker', {userMeasurments: centimetrs});
    })
}


module.exports = resultController;