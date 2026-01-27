const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const globalErrorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api', routes);

// Handle Unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
const port = config.port;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

module.exports = app;
