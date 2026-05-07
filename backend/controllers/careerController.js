// Get Careers
const getCareers = async (req, res) => {
    res.json({ message: 'Get all careers' });
};

// Get Career By ID
const getCareerById = async (req, res) => {
    res.json({ message: `Get career ${req.params.id}` });
};

// Get Recommended Careers
const getRecommendedCareers = async (req, res) => {
    res.json({ message: 'Get recommended careers based on skills/interests' });
};

module.exports = {
    getCareers,
    getCareerById,
    getRecommendedCareers
};
