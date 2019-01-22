var User = require('../models/User');

var chatController = {};

chatController.chatHome = (req, res) => {
	console.log("eikia>>>>>>>>>>>>>>>>>>>>>>>>>")
	var userList = [];
    User.find({}, (err, users)=>{
		console.log(users);
        users.map((user) => userList.push({nickname:user.nickname, el_pastas:user.username}));    
		res.render('chat/chat', {userList: userList, user: req.user});
		console.log("user>>>>>>>", req.user);
	});
}

// chatController.loadData = (req, res) => {
// 	console.log("eikia>>>>>>>>>>>>>>>>>>>>>>>>>")
// 	var userList = [];
//     User.find({}, (err, users)=>{
//         users.map((user) => userList.push({nickname:user.nickname, el_pastas:user.username}));    
//         res.render('auth/users', {userList: userList, user: req.user});
//     });
// }

module.exports = chatController;