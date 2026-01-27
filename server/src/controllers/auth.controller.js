const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Delegate business logic to service
        const { user, token } = await authService.login(email, password);

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                token,
                user
            }
        });
    } catch (err) {
        next(err);
    }
};
