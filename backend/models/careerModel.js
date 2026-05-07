const mongoose = require('mongoose');

const careerSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    averageSalary: { type: String },
    futureDemand: { type: String },
    category: { type: String }
});

module.exports = mongoose.model('Career', careerSchema);
