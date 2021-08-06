const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Atlas Database connection successful...');
    })
    .catch((err) => {
        console.log("Loading Atlas Database unsuccessful")
        console.error(err.message);
          // Exit process with failure
        process.exit(1);
    });

console.log(`Current environment is: ${process.env.NODE_ENV}`);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
