//TODO
const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A student must have an account!"],
  },
  name: {
    type: String,
  },
  institution: {
    type: String,
    default: "University Of Southern California",
  },
  major: {
    type: String,
    default: "Computer Science",
  },
  grade: {
    type: String,
    enum: ["Freshman", "Sophomore", "Junior", "Senior", "Master", "Doctor"],
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
