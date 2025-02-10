import getRootVariableValue from './getRootVariableValue';

export default () => {
  const rootFontSizePx = parseFloat(getRootVariableValue('--font-size')) || 0;
  const nonCanvasElementsHeightRem =
    parseFloat(getRootVariableValue('--secondary-elements-height')) || 0;
  const viewportHeightRem =
    document.documentElement.clientHeight / rootFontSizePx;
  const canvasHeight = viewportHeightRem - nonCanvasElementsHeightRem;

  const canvasWidth = canvasHeight * 2 + 10;

  document.documentElement.style.setProperty(
    '--canvas-wrapper-width',
    `${canvasWidth}rem`,
  );
};
