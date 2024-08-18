const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add name"]
    },
    phone:{
        type: Number,
        required: [true, "Please add number"]
  },
        address:{
        type: String,
        required: [true, "Please add email"]
  },
            notes:{
        type: String,
        required: [true, "Please add email"]
  },
                updateBy:{
        type: String,
        default:null
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Contact",contactSchema);
