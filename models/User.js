var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    
    username: String, //email
    password: String,
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
