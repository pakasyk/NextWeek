var fs = require('fs');
var Profile = require('../models/User');
profileController = {};



profileController.profile = (req, res) => {
    res.render('profile/profile');
};

profileController.createProfile = (req, res, next) => {
    console.log('createProfile');
    
    let newProfile = Profile({
        nick: req.body.nickName,//neveikia
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        photo: req.body.photo,
        agree: req.body.check,
        goal: req.body.goal,
        alcohol: req.body.alcohol,
        smoke: req.body.smoke,
        traumas: req.body.traumas,
    })

    newProfile.save((err, profile) => {
        if (err) throw err;
        console.log(profile);
        next();
    })
    // let newProfile = req.body;

    // let openDB = fs.readFileSync('./database/profileDb.json');
    // let textDB = JSON.parse(openDB);

    // textDB.push(newProfile);
    // fs.writeFileSync('./database/profileDb.json', JSON.stringify(textDB));

    // res.redirect('profile/profileEnd',{userProfile: profile} );

}

profileController.profileEnd = (req, res) => {
    Profile.find({}, (err, profile) => {
        if (err) throw err;
        res.render('profile/profileEnd', {userProfile: profile} )
    })
}



module.exports = profileController;