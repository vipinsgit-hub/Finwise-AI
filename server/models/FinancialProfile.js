const mongoose = require('mongoose');

const financialProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  income: {
    monthlyIncome: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 }
  },
  expenses: {
    monthlyExpenses: { type: Number, default: 0 },
    rentOrEmi: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    otherExpenses: { type: Number, default: 0 }
  },
  debts: {
    totalDebts: { type: Number, default: 0 },
    monthlyDebtPayments: { type: Number, default: 0 }
  },
  assets: {
    emergencyFund: { type: Number, default: 0 },
    investments: { type: Number, default: 0 },
    insuranceCover: { type: Number, default: 0 },
    currentSavings: { type: Number, default: 0 }
  },
  fireData: {
    currentAge: { type: Number },
    expectedReturnRate: { type: Number, default: 7 },
    monthlyInvestment: { type: Number, default: 0 }
  },
  finHealthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FinancialProfile', financialProfileSchema);
