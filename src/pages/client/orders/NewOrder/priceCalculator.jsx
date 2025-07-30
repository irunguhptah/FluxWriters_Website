// components/NewOrder/priceCalculator.js

export function calculatePrice(formData) {
  const levelPrices = {
    'high-school': 8,
    'college': 10,
    'university': 12,
    'masters': 15,
    'phd': 20,
  };
  const basePagePrice = levelPrices[formData.academicLevel] || 10;
  let basePrice = formData.pages * basePagePrice;

  const deadlineMultipliers = {
    '14': 1.0,
    '7': 1.1,
    '3': 1.25,
    '1': 1.5,
  };

  const writerMultipliers = {
    'any': 1.0,
    'top-rated': 1.15,
    'subject-expert': 1.2,
    'preferred': 1.1,
  };

  const typeMultipliers = {
    'essay': 1.0,
    'research-paper': 1.1,
    'case-study': 1.15,
    'dissertation': 1.3,
    'thesis': 1.25,
  };

  basePrice *= deadlineMultipliers[formData.deadline] || 1.0;
  basePrice *= writerMultipliers[formData.writerPreference] || 1.0;
  basePrice *= typeMultipliers[formData.type] || 1.0;

  return Math.round(basePrice);
}

export function formatDeadlineDate(deadline) {
  const days = parseInt(deadline, 10);
  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + days);
  return deadlineDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
