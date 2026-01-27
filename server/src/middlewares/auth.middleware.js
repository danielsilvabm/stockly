const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');

// Middleware to protect routes ensuring user is authenticated
exports.protect = async (req, res, next) => {
    try {
        let token;

        // 1) Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        // 2) Verify token
        const decoded = verifyToken(token);

        // 3) Check if user still exists (MOCKED: assume yes for now as we have no DB)
        // In a real app, you would query the DB here.
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (err) {
        return next(new AppError('Invalid token. Please log in again.', 401));
    }
};

// Middleware to restrict access based on roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles is an array, e.g. ['admin', 'manager']
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
