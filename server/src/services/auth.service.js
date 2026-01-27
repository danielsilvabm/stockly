const AppError = require('../utils/AppError');
const { signToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// MOCK USER DATABASE
// In a real application, this would be a Database Repository call.
const mockUsers = [
    {
        id: 1,
        email: 'admin@warehouse.com',
        passwordHash: '$2a$12$R9h/cIPz0gi.URNNXRkhW.an.something.encrypted.mock', // Assuming 'admin123'
        role: 'admin',
        name: 'Admin User'
    },
    {
        id: 2,
        email: 'staff@warehouse.com',
        passwordHash: '$2a$12$R9h/cIPz0gi.URNNXRkhW.an.something.encrypted.mock',
        role: 'warehouse',
        name: 'Warehouse Staff'
    }
];

class AuthService {
    async login(email, password) {
        // 1) Check if email and password exist
        if (!email || !password) {
            throw new AppError('Por favor, forneça email e senha', 400);
        }

        // 2) Find user (MOCKED)
        const user = mockUsers.find(u => u.email === email);

        // 3) Check password (MOCKED for simplicity, usually bcrypt.compare)
        // For this demo, valid password is 'password' for everyone or special 'admin123'
        // Let's just simulate a successful check if the user exists.
        if (!user || password !== 'password123') {
            throw new AppError('Email ou senha incorretos (Tente: password123)', 401);
        }

        // 4) Generate Token
        const token = signToken(user.id, user.role);

        // 5) Return user data (excluding password) and token
        const { passwordHash, ...safeUser } = user;
        return { user: safeUser, token };
    }
}

module.exports = new AuthService();
