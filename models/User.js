var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    
    username: String, //email
    password: String,
    
    //Privalomi laukeliai
    nickname: String, 
    year: String,
    month: String,
    day: String,
    gender: String,
    height: String,
    weight: String,
    photo: String, 
    agree: String, //Cia tik paspausti varnele, klausimas string ar kazkas kito?

    //Neprivalomi laukeliai
    goal: String,
    problemArea: String,
    alcohol: String,
    smoke: String,
    traumas: String,

})


UserSchema.plugin(passportLocalMongoose);

var User =  mongoose.model('User', UserSchema);

module.exports = User;
