//TODO
const mongoose = require("mongoose");
const validator = require("validator");// validator is not used
const majorEnums = require("../enums/majorEnums");
const gradeEnums = require("../enums/gradeEnums");
const univEnums = require("../enums/univEnums");


const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A student must have an account!"],
  },
  name: {
    type: String,
    // Shouldn't name be required?
    default: "Tommy Trojan",
  },
  // changed for enum
  institution: {
    type: String,
    set: (el) => univEnums[el],
    default: "University Of Southern California",
  },
  // changed for enum
  major: {
    type: String,
    set: (el) => majorEnums[el],
    default: "Computer Science",
  },
  // changed for enum
  grade: {
    type: String,
    set: (el) => gradeEnums[el],
    default: "Freshman",
  },
  applications: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Application",
    },
  ],
});

studentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id email",
  });
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
