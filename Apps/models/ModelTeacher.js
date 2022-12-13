var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelTeacher = new Schema({
    fullname: { 
        type: String, 
        required: true 
    },
    idTeacher: { 
        type: String, 
        required: true 
    },
    class: [{ 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "ModelClass" 
    }],
});

module.exports = mongoose.model("ModelTeacher", ModelTeacher);