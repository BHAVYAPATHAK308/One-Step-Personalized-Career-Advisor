const express = require('express');
const router = express.Router();
const { getCareers, getCareerById, getRecommendedCareers } = require('../controllers/careerController');

router.get('/', getCareers);
router.get('/recommendations', getRecommendedCareers);
router.get('/:id', getCareerById);

module.exports = router;
