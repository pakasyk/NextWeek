var mongoose = require('mongoose');
<<<<<<< HEAD

var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

//kaip atrodys musu user lentele duombazeje
var UserSchema = new Schema({
    username: String, //email
    password: String,
    name: String, //vartotojo vardas
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
=======
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    //Privalomi laukeliai
    nickname: String, // neveikia
    year: String,
    month: String,
    day: String,
    gender: String,
    height: String,
    weight: String,
    photo: String, // Kaip su nuotraukom? Beja nuotrauka irgi neprivaloma
    agree: String, //Cia tik paspausti varnele, klausimas string ar kazkas kito?

    //Neprivalomi laukeliai
    goal: String,
    problemArea: String,
    alcohol: String,
    smoke: String,
    traumas: String,

})

var Profile =  mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
>>>>>>> c94045399c0bd52bc7493a48dc3a1ba3aeacdb5b
