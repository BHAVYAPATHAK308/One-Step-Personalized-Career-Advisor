// Submit Quiz
const submitQuiz = async (req, res) => {
    res.json({ message: 'Quiz submitted and results calculated' });
};

// Get Quiz Questions
const getQuizQuestions = async (req, res) => {
    res.json({ message: 'Get quiz questions' });
};

module.exports = {
    submitQuiz,
    getQuizQuestions
};
