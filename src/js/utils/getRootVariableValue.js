export default (property) => {
  if (typeof property !== 'string') {
    console.error('The property must be a string');
    return null;
  }

  const root = document.documentElement;
  if (!root) {
    console.error('Root element (document.documentElement) not found');
    return null;
  }

  let style;
  try {
    style = getComputedStyle(root);
  } catch (error) {
    console.error('Failed to get computed styles:', error);
    return null;
  }

  if (!style || typeof style.getPropertyValue !== 'function') {
    console.error('Computed style object is invalid');
    return null;
  }

  const value = style.getPropertyValue(property);

  if (value === '') {
    console.error(`Property "${property}" not found in computed styles`);
  }

  return value;
};
