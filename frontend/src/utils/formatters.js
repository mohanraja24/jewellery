/**
 * Indian Rupee Currency Formatter
 * Formats numbers into standard Indian numbering system (e.g. ₹1,25,000)
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatINRDecimal = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatWeight = (grams) => {
  if (!grams && grams !== 0) return '0.000 g';
  return `${Number(grams).toFixed(3)} g`;
};

export const formatCarat = (carat) => {
  if (!carat && carat !== 0) return '0.00 ct';
  return `${Number(carat).toFixed(2)} ct`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
