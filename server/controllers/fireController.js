const { calculateFIRE } = require('../utils/fireCalculator');

// @desc    Calculate FIRE projections
// @route   POST /api/profile/fire
// @access  Private
exports.getFIREProjections = async (req, res) => {
  try {
    const fireInputs = req.body;
    
    // Validate required fields
    if (!fireInputs.currentAge || !fireInputs.monthlyExpenses) {
      return res.status(400).json({ message: 'Current age and monthly expenses are required' });
    }

    const projections = calculateFIRE(fireInputs);
    
    res.status(200).json(projections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
