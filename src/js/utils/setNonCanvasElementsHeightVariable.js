import getRootVariableValue from './getRootVariableValue';

export default (elements) => {
  if (!Array.isArray(elements)) {
    console.error('Invalid arguments: elements should be an array');
    return;
  }

  let totalHeight = 0;
  const layoutGapRem = parseFloat(getRootVariableValue('--layout-gap')) || 0;
  const rootFontSizePx = parseFloat(getRootVariableValue('--font-size')) || 0;

  elements.forEach((element, index) => {
    if (element instanceof HTMLElement) {
      const elementHeightRem = element.offsetHeight / rootFontSizePx;

      totalHeight += elementHeightRem;
      totalHeight += layoutGapRem;
    } else {
      console.warn(`Element at index ${index} is not a valid HTML element.`);
    }
  });

  document.documentElement.style.setProperty(
    '--secondary-elements-height',
    `${totalHeight}rem`,
  );
};
