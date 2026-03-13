/**
 * Calculates a Financial Health Score from 0 to 100
 * Factors:
 * 1. Savings Rate (Target: 20%+) - 30 points
 * 2. Emergency Fund (Target: 6 months of expenses) - 25 points
 * 3. Debt-to-Income Ratio (Target: < 30%) - 20 points
 * 4. Investment Ratio (Target: 15%+) - 15 points
 * 5. Insurance Cover - 10 points
 */
const calculateFinHealthScore = (data) => {
  const { income, expenses, debts, assets } = data;
  
  const monthlyIncome = (income.monthlyIncome || 0) + (income.otherIncome || 0);
  const monthlyExpenses = (expenses.monthlyExpenses || 0) + (expenses.rentOrEmi || 0) + (expenses.utilities || 0) + (expenses.otherExpenses || 0);
  const totalDebts = debts.totalDebts || 0;
  const monthlyDebtPayments = debts.monthlyDebtPayments || 0;
  const emergencyFund = assets.emergencyFund || 0;
  const investments = assets.investments || 0;
  const insuranceCover = assets.insuranceCover || 0;

  if (monthlyIncome === 0) return 0;

  let score = 0;

  // 1. Savings Rate
  const savings = monthlyIncome - monthlyExpenses - monthlyDebtPayments;
  const savingsRate = (savings / monthlyIncome) * 100;
  if (savingsRate >= 20) score += 30;
  else if (savingsRate > 0) score += (savingsRate / 20) * 30;

  // 2. Emergency Fund
  const monthsOfExpenses = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 6;
  if (monthsOfExpenses >= 6) score += 25;
  else score += (monthsOfExpenses / 6) * 25;

  // 3. Debt-to-Income (DTI)
  const dti = (monthlyDebtPayments / monthlyIncome) * 100;
  if (dti <= 30) score += 20;
  else if (dti < 50) score += (1 - (dti - 30) / 20) * 20;

  // 4. Investment Ratio
  const investmentRatio = (investments / (assets.currentSavings + investments || 1)) * 100;
  if (investmentRatio >= 50) score += 15;
  else score += (investmentRatio / 50) * 15;

  // 5. Insurance
  if (insuranceCover >= monthlyIncome * 12 * 10) score += 10; // 10 years of income
  else if (insuranceCover > 0) score += 5;

  return Math.round(Math.min(100, Math.max(0, score)));
};

const generateSWOT = (data) => {
  const { income, expenses, debts, assets } = data;
  const monthlyIncome = (income.monthlyIncome || 0) + (income.otherIncome || 0);
  const monthlyExpenses = (expenses.monthlyExpenses || 0) + (expenses.rentOrEmi || 0) + (expenses.utilities || 0) + (expenses.otherExpenses || 0);
  const monthlyDebtPayments = debts.monthlyDebtPayments || 0;
  const emergencyFund = assets.emergencyFund || 0;

  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];

  // Logic for SWOT
  if (monthlyIncome > monthlyExpenses + monthlyDebtPayments) {
    strengths.push('Positive cash flow');
  } else {
    weaknesses.push('Negative or zero cash flow');
  }

  if (emergencyFund > monthlyExpenses * 3) {
    strengths.push('Healthy emergency fund');
  } else {
    weaknesses.push('Inadequate emergency fund');
    opportunities.push('Build 3-6 months of emergency savings');
  }

  if (monthlyDebtPayments / monthlyIncome > 0.4) {
    threats.push('High debt-to-income ratio');
    weaknesses.push('Heavy debt burden');
  }

  if (assets.investments === 0) {
    opportunities.push('Start investing in low-cost index funds');
  } else {
    strengths.push('Active investment portfolio');
  }

  return { strengths, weaknesses, opportunities, threats };
};

module.exports = { calculateFinHealthScore, generateSWOT };
