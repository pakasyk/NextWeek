var User = require('../models/User');
var userController = {};


userController.allUsers = (req, res) => {
    var userList = [];
    User.find({}, (err, users)=>{
        res.map((user)=> userList.push({vardas:user.username, el_pastas:user.username}));
        users.render('users', {userList: userList, user: releaseEvents.user});
    })
    res.render('users', {userList: userList, user: req.user});
}

userController.myProfile = (req, res) => {
    res.render('profile');
}
module.exports = userController;