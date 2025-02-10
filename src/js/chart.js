import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
);

const CHART_FONT_FAMILY =
  "'Roboto', Helvetica, 'Trebuchet MS', Tahoma, sans-serif";
const CHART_FONT_SIZE = 17;
const POINT_RADIUS = 4;
const POINT_HOVER_RADIUS = 5;
const LINE_TENSION = 0.3;
const LEGEND_BOX_WIDTH = 20;
const LEGEND_PADDING = 25;
const LEGEND_BORDER_RADIUS = 9;

const CHART_COLOR = '#fbfbfb';
const TOOLTIP_BACKGROUND_COLOR = '#6b6b6b';

const DATASET_COLORS = {
  SLEEP_QUALITY: '#599ff4',
  ANXIETY: '#ff9abf',
  DEPRESSION: '#f9f871',
  FATIGUE: '#ffb091',
  NEGATIVE_THOUGHTS: '#ffd36f',
  GUT_CONCERNS: '#cfa0ff',
  WEIGHT: '#00eabf',
};

const DATASET_LABELS = {
  SLEEP_QUALITY: 'Сон',
  ANXIETY: 'Тревожность',
  DEPRESSION: 'Подавленность',
  FATIGUE: 'Утомляемость',
  NEGATIVE_THOUGHTS: 'Пессимизм',
  GUT_CONCERNS: 'Озабоченность ЖКТ',
  WEIGHT: 'Вес',
};

const DATASET_KEYS = {
  SLEEP_QUALITY: 'sleepQuality',
  ANXIETY: 'anxiety',
  DEPRESSION: 'depression',
  FATIGUE: 'fatigue',
  NEGATIVE_THOUGHTS: 'negativeThoughts',
  GUT_CONCERNS: 'gutConcerns',
  WEIGHT: 'weight',
};

export const getChartConfig = (data) => ({
  type: 'line',
  options: {
    scales: {
      x: {
        max: 57,
        ticks: {
          callback: (value) => `неделя ${value + 1}`,
        },
      },
      y: {
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    color: CHART_COLOR,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: getTooltipTitle,
          beforeBody: getTooltipBeforeBody(data),
          label: getCustomLabel,
        },
      },
    },
  },
  data: {
    labels: data.map((row) => row.week),
    datasets: Object.keys(DATASET_COLORS).map((key) => ({
      label: DATASET_LABELS[key],
      data: data.map((row) => row[DATASET_KEYS[key]]),
      borderColor: DATASET_COLORS[key],
      backgroundColor: DATASET_COLORS[key],
    })),
  },
});

const getTooltipTitle = (tooltipItems) => {
  if (!Array.isArray(tooltipItems) || tooltipItems.length === 0) {
    console.warn('Invalid tooltipItems provided');
    return '';
  }

  const label = tooltipItems[0]?.label ?? '';
  return `Неделя: ${label}`;
};

const getTooltipBeforeBody = (data) => (tooltipItems) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Invalid data provided');
    return '';
  }

  if (!Array.isArray(tooltipItems) || tooltipItems.length === 0) {
    console.warn('Invalid tooltipItems provided');
    return '';
  }

  const dataIndex = tooltipItems[0]?.dataIndex;

  if (dataIndex == null || dataIndex < 0 || dataIndex >= data.length) {
    console.warn('Invalid dataIndex');
    return '';
  }

  return data[dataIndex]?.meds ?? '';
};

const getCustomLabel = (context) => {
  let label = context.dataset.label || '';

  if (label) {
    label += ': ';
  }
  if (context.parsed.y !== null) {
    label += `${context.parsed.y}%`;
  }
  return label;
};

export const setupChartDefaults = () => {
  Chart.defaults.font.family = CHART_FONT_FAMILY;
  Chart.defaults.font.size = CHART_FONT_SIZE;
  Chart.defaults.elements.point.radius = POINT_RADIUS;
  Chart.defaults.elements.point.hoverRadius = POINT_HOVER_RADIUS;
  Chart.defaults.elements.line.tension = LINE_TENSION;
  Chart.defaults.plugins.legend.labels.boxWidth = LEGEND_BOX_WIDTH;
  Chart.defaults.plugins.legend.labels.padding = LEGEND_PADDING;
  Chart.defaults.plugins.legend.labels.useBorderRadius = true;
  Chart.defaults.plugins.legend.labels.borderRadius = LEGEND_BORDER_RADIUS;
  Chart.defaults.plugins.tooltip.backgroundColor = TOOLTIP_BACKGROUND_COLOR;
};
