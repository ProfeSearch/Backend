//const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const studentRouter = require('./routes/studentRoutes');
const facultyRouter = require('./routes/facultyRoutes');
const positionRouter = require('./routes/positionRoutes');
const applicationRouter = require('./routes/applicationRoutes');

const app = express();

//access static files
//app.use(express.static(path.join(__dirname, 'public')));

//set security HTTP headers
app.use(helmet());

//development tool
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//limit requests from same IP
const limiter = rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

//body parser
app.use(express.json({ limit: '10kb' }));
// TODO  is 10kb enough? 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//data sanitization against NoSQL query injections
app.use(mongoSanitize());

//data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            //TODO
        ],
    })
);

//test middleware
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     console.log(req.cookies);
//     next();
// });

app.use('/api/users', userRouter);
app.use('/api/students', studentRouter);
app.use('/api/faculties', facultyRouter);
app.use('/api/positions', positionRouter);
app.use('/api/applications', applicationRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
