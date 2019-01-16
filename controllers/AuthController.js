var User = require('../models/User');
var passport = require('passport');
authController = {};


authController.home = function(req, res){
   res.render('index', {user: req.user});
}

authController.login = function(req, res){
   res.render('login');
}
///////////////////////////////////////////////////////////////login tikrinimas
authController.login = function(req, res){
    res.render('passwordChange');
 }
//////////////////////////////////////////////////////////////login tikrinimas
authController.register = (req, res) =>{
    res.render('register');
}

authController.doRegister = (req, res)=>{
    //ateityje pasidarysime validacijas....
    User.register(new User(
        {
            username: req.body.username, //vatotojo el. pastas
            name: req.body.name //vartotojo vardas
            // gender: req.body.gender //vartotojo lytis
        }), req.body.password, (error, user)=>{
            
            if(error){
                return res.render('register')
            }
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/login')
            })
        }
    )
}

authController.doLogin = (req, res)=>{
    console.log(req);
    passport.authenticate('local')(req, res, function () {

        res.redirect('/');
      });
}

authController.doLogout = (req, res)=>{
    req.logout();
    res.redirect('/');
}

module.exports = authController;