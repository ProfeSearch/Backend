const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Faculty = require('../models/facultyModel');
const Position = require('../models/positionModel');
const Application = require('../models/applicationModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Atlas Database connection successful...'));

// READ JSON FILE
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);
const faculties = JSON.parse(
    fs.readFileSync(`${__dirname}/faculties.json`, 'utf-8')
);
const students = JSON.parse(
    fs.readFileSync(`${__dirname}/students.json`, 'utf-8')
);
const positions = JSON.parse(
    fs.readFileSync(`${__dirname}/positions.json`, 'utf-8')
);
const applications = JSON.parse(
    fs.readFileSync(`${__dirname}/applications.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await User.create(users);
        await Faculty.create(faculties, { validateBeforeSave: false });
        await Student.create(students, { validateBeforeSave: false });
        await Position.create(positions, { validateBeforeSave: false });
        //await Application.create(applications, { validateBeforeSave: false });
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Faculty.deleteMany();
        await Student.deleteMany();
        await Position.deleteMany();
        //await Application.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
