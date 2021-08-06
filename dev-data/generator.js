const fs = require('fs');
const mongoose = require('mongoose');

const createIds = (count) => {
    let idLists = [];
    for (let i = 0; i < count; i++) {
        const id = mongoose.Types.ObjectId();
        idLists.push(id);
    }
    const output = idLists.toString().split(',').join('\n');
    fs.writeFileSync(`${__dirname}/mongooseIds.txt`, output, 'utf-8');
};

const deleteIds = () => {
    fs.writeFileSync(`${__dirname}/mongooseIds.txt`, '', 'utf-8');
};

//run the script below to generate
//node .\dev-data\generator.js --create 100
if (process.argv[2] === '--create') {
    let count = 20;
    if (process.argv[3]) {
        count = process.argv[3];
    }
    createIds(count);
} else if (process.argv[2] === '--delete') {
    deleteIds();
}
