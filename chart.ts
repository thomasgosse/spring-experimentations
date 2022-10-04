import { Chart, ChartConfiguration, registerables } from 'chart.js'

Chart.register(...registerables);

export function createChart(values: number[]): Chart {

  const labels = Array.from(Array(200).keys()).map(v => v / 100)

  const data = {
    labels: labels,
    datasets: [{
      label: 'Plot',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: values,
    }]
  };

  const config: ChartConfiguration = {
    type: 'line',
    data: data,
    options: {}
  };

  return new Chart(
    document.getElementById('myChart') as HTMLCanvasElement,
    config
  );
}

export function addData(chart: Chart, data: number[]) {
  chart.data.datasets[0].data = data
  chart.update();
}

export function removeData(chart: Chart) {
  chart.data.datasets[0].data = []
  chart.update();
}