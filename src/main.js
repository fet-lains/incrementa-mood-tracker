import './style.css';

import { Chart } from 'chart.js';
import { data } from './js/data';
import { setupChartDefaults, getChartConfig } from './js/chart';
import calculateProportion from './js/utils/calculateProportion';

document.addEventListener('DOMContentLoaded', () => {
  const graph = document.getElementById('graph');
  const modifiedData = data.map((entry) => {
    const weightPercentage = calculateProportion(entry.weight);

    return {
      ...entry,
      weight: weightPercentage,
    };
  });

  setupChartDefaults();

  new Chart(graph, getChartConfig(modifiedData));
});
