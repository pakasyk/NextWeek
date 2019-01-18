var fs = require('fs');
var Profile = require('../models/User');
profileController = {};



profileController.profile = (req, res) => {
    res.render('profile/profile');
};

profileController.createProfile = (req, res, next) => {
    console.log('createProfile');
    
    let newProfile = Profile({
      //modelName: req.body.htmlInputName  
        nickname: req.body.nickname,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        photo: req.body.photo,
        agree: req.body.check,
        goal: req.body.goal,
        problemArea: req.body.problemArea,
        alcohol: req.body.alcohol,
        smoke: req.body.smoke,
        traumas: req.body.traumas,
    })

    newProfile.save((err, profile) => {
        if (err) throw err;
        console.log(profile);
        res.redirect('/profileEnd/' + profile._id);
    })

}

profileController.profileEnd = (req, res) => {
    Profile.findById(req.params.id, (err, profile) => {
        if (err) throw err;
        res.render('profile/profileEnd', {userProfile: profile} );
    })
}

profileController.changePassword = (req, res) => {
    res.render('profile/newPassword');
};

profileController.resultTracker = (req, res) => {
    res.render('profile/resultTracker');
}


module.exports = profileController;