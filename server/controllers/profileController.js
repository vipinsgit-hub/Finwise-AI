const FinancialProfile = require('../models/FinancialProfile');
const { calculateFinHealthScore, generateSWOT } = require('../utils/calculator');

// @desc    Get user financial profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or Update user financial profile
// @route   POST /api/profile
// @access  Private
exports.upsertProfile = async (req, res) => {
  try {
    const { income, expenses, debts, assets, fireData } = req.body;

    const finHealthScore = calculateFinHealthScore({ income, expenses, debts, assets });
    const swot = generateSWOT({ income, expenses, debts, assets });

    let profile = await FinancialProfile.findOne({ user: req.user._id });

    if (profile) {
      // Update
      profile.income = income;
      profile.expenses = expenses;
      profile.debts = debts;
      profile.assets = assets;
      profile.fireData = fireData;
      profile.finHealthScore = finHealthScore;
      profile.swot = swot; // Note: We should add swot to the model if we want to persist it, or just return it.
      
      await profile.save();
    } else {
      // Create
      profile = await FinancialProfile.create({
        user: req.user._id,
        income,
        expenses,
        debts,
        assets,
        fireData,
        finHealthScore
      });
    }

    res.status(200).json({ profile, swot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
