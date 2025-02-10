export default (actualValue, referenceValue = 72) => {
  if (typeof actualValue !== 'number' || typeof referenceValue !== 'number') {
    throw new Error('Both actualValue and referenceValue should be numbers.');
  }
  if (referenceValue <= 0 || actualValue <= 0) {
    throw new Error('Reference value should be greater than zero.');
  }
  const percentage = (actualValue / referenceValue) * 100;
  return Math.round(percentage);
};
