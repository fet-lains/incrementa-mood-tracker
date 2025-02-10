import './style.css';

import { Chart } from 'chart.js';
import { data } from './js/data';
import { setupChartDefaults, getChartConfig } from './js/chart';
import calculateProportion from './js/utils/calculateProportion';
import setNonCanvasElementsHeightVariable from './js/utils/setNonCanvasElementsHeightVariable';
import setCanvasWrapperWidth from './js/utils/setCanvasWrapperWidth';

document.addEventListener('DOMContentLoaded', () => {
  const nonCanvasElements = [
    document.querySelector('.header'),
    document.querySelector('.footer'),
  ];

  setNonCanvasElementsHeightVariable(nonCanvasElements);
  setCanvasWrapperWidth();

  const graph = document.getElementById('graph');
  const modifiedData = data.map((entry) => {
    const weightPercentage = calculateProportion(entry.weight);

    return {
      ...entry,
      weight: weightPercentage,
    };
  });

  setupChartDefaults();

  const chart = new Chart(graph, getChartConfig(modifiedData));

  window.addEventListener('resize', () => {
    setNonCanvasElementsHeightVariable(nonCanvasElements);
    setCanvasWrapperWidth();
    chart.reset();
  });
});
