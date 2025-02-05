import './style.css';

import { Chart } from 'chart.js';
import { data } from './js/data';
import { setupChartDefaults, getChartConfig } from './js/chart';

document.addEventListener('DOMContentLoaded', () => {
  const graph = document.getElementById('graph');

  setupChartDefaults();

  new Chart(graph, getChartConfig(data));
});
