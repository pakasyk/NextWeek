var User = require('../models/User').User;
var passport = require('passport');
authController = {};


authController.home = function(req, res){
    console.log(req.user)
   res.render('index', {user: req.user, title: ''});
}

authController.login = function(req, res){
   res.render('auth/login');
}
///////////////////////////////////////////////////////////////login tikrinimas
authController.passwordChange = function(req, res){
    res.render('auth/passwordChange');
 }

 authController.forgotPassword = function(req, res){
    res.render('auth/forgot');
 }
 authController.doForgot = (req, res)=>{
     //veliau nurodysiu puslapi 
    res.redirect('/');
}



//////////////////////////////////////////////////////////////login tikrinimas
authController.register = (req, res) =>{
    res.render('auth/register');
}

authController.doRegister = (req, res)=>{
    User.register(new User(
        {
            username: req.body.username, //vatotojo el. pastas
            nickname: req.body.name //vartotojo vardas
        }), req.body.password, (error, user)=>{
            
            if(error){
                return res.render('auth/register')
            }
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/login')
            })
        }
    )
}

authController.doLogin = (req, res)=>{
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
}

authController.doLogout = (req, res)=>{
    req.logout();
    res.redirect('/');
}


module.exports = authController;