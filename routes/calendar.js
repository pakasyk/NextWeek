var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
const Workoutevent = require('../models/Workoutevent')

// var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0});
// 	db.bind('event');


router.get('/', function(req, res, next) {
    console.log("veikia>>>>>>>>>>>>>>>>>>>");
    res.render('calendar/calendar');
  });

router.get('/data', function(req, res){
    console.log("veikia>>>>>>>>>>>>>>>>>>>>");
	Workoutevent.find({}, function(err, data){
        console.log(data)
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});


router.post('/data', function(req, res){
    console.log(req.body);
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err) {
			mode = "error";
        } else if (mode == "inserted") {
			tid = data._id;
        }    
		res.setHeader("Content-Type","application/json");
		res.send({action: mode, sid: sid, tid: tid});
	}

	if (mode == "updated") {
    Workoutevent.findByIdAndUpdate( sid, data, update_response);
    } else if (mode == "inserted") {
        console.log(" iki cia daejo >>>>>>");
		let newEvent = new Workoutevent({
            start_date: data.start_date,
            end_date: data.end_date,
            text: data.text
        });
        newEvent.save();
    } else if (mode == "deleted") {
		Workoutevent.findByIdAndRemove( sid, update_response);
    } else {
        res.send("Not supported operation");
    }    
});

module.exports = router;