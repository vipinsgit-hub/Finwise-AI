/**
 * Calculates FIRE (Financial Independence Retire Early) metrics
 * @param {Object} data - User's financial and FIRE inputs
 * @returns {Object} FIRE projections and metrics
 */
const calculateFIRE = (data) => {
  const { currentAge, monthlyExpenses, currentSavings, expectedReturnRate, monthlyInvestment } = data;
  
  // Basic inputs validation and defaults
  const age = Number(currentAge) || 30;
  const expenses = Number(monthlyExpenses) || 0;
  const savings = Number(currentSavings) || 0;
  const returnRate = (Number(expectedReturnRate) || 7) / 100;
  const investment = Number(monthlyInvestment) || 0;

  // 1. FIRE Number (Safe Withdrawal Rate of 4% = 25x Annual Expenses)
  const annualExpenses = expenses * 12;
  const fireNumber = annualExpenses * 25;

  if (fireNumber === 0) {
    return {
      fireNumber: 0,
      yearsToRetirement: 0,
      retirementAge: currentAge,
      projectedSavings: [],
      isAchievable: true
    };
  }

  let currentWealth = savings;
  let years = 0;
  const projectedSavings = [{ age: age, balance: Math.round(currentWealth) }];
  const MAX_YEARS = 80; // Cap calculations to prevent infinite loops

  // Calculate compound growth until wealth >= FIRE number or MAX_YEARS reached
  while (currentWealth < fireNumber && years < MAX_YEARS) {
    years++;
    // Annual compounding for simplicity, adding 12 months of investments
    currentWealth = (currentWealth + (investment * 12)) * (1 + returnRate);
    
    projectedSavings.push({
      age: age + years,
      balance: Math.round(currentWealth)
    });
  }

  // Calculate required SIP if current path fails
  let requiredMonthlySIP = investment;
  if (years >= MAX_YEARS) {
    // Basic estimation formula for required monthly PMT to reach FV
    // FV = PMT * (((1 + r/n)^(nt) - 1) / (r/n)) + PV * (1 + r/n)^(nt)
    // Assuming t = 30 years as a standard target if current path fails
    const targetYears = 30;
    const monthlyRate = returnRate / 12;
    const months = targetYears * 12;
    
    const futureValueOfCurrentSavings = savings * Math.pow(1 + monthlyRate, months);
    const shortfall = fireNumber - futureValueOfCurrentSavings;
    
    if (shortfall > 0 && monthlyRate > 0) {
      requiredMonthlySIP = (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    }
  }

  return {
    fireNumber: Math.round(fireNumber),
    yearsToRetirement: years,
    retirementAge: age + years,
    projectedSavings,
    isAchievable: years < MAX_YEARS,
    requiredMonthlySIP: Math.round(requiredMonthlySIP)
  };
};

module.exports = { calculateFIRE };
