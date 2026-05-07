const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'adviseai_fallback_secret_key_123';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

// Register User (Mocked for testing)
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please include all fields' });
        }

        // Simulating a successful creation
        res.status(201).json({
            _id: 'mock_user_id_123',
            name: name,
            email: email,
            token: generateToken('mock_user_id_123')
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login User (Mocked for testing)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please include all fields' });
        }

        // Accept any credentials for testing the UI flow
        // Generate a friendly name from the email (e.g. john@test.com -> John)
        const nameFromEmail = email.split('@')[0];

        res.status(200).json({
            user: {
                _id: 'mock_user_id_123',
                name: nameFromEmail,
                email: email
            },
            token: generateToken('mock_user_id_123')
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = {
    registerUser,
    loginUser
};

