/**
 * Formats a raw number in INR (Lakhs and Crores)
 * e.g., 5000000 -> ₹50L
 * 25000000 -> ₹2.5Cr
 * 500000 -> ₹5L
 */
export const formatCurrencyINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  const num = Number(amount);
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(1);
    return `₹${cr.endsWith('.0') ? cr.slice(0, -2) : cr}Cr`;
  }
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(1);
    return `₹${lakh.endsWith('.0') ? lakh.slice(0, -2) : lakh}L`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
};

/**
 * Formats full numeric values with Indian comma notation
 */
export const formatNumberIN = (amount) => {
  if (!amount) return '0';
  return Number(amount).toLocaleString('en-IN');
};

/**
 * Formats date into readable string e.g. 15 Jun 2026
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
