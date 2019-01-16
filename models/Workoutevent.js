const mongoose = require("mongoose");

const WorkouteventSchema = new mongoose.Schema({
    text: {
      type: String     
    },
    start_date: {
      type: String
    },
    end_date: {
      type: String
    },
    id: {
      type: String
    }
  });
  
  const Workoutevent = mongoose.model("Workoutevent", WorkouteventSchema);
  
  module.exports = Workoutevent;