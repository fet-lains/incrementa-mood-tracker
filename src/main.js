import './style.css';

import { Chart } from 'chart.js';
import { data } from './js/data';
import { setupChartDefaults, getChartConfig } from './js/chart';

document.addEventListener('DOMContentLoaded', () => {
  setupChartDefaults();
  new Chart(document.getElementById('graph'), getChartConfig(data));
});
