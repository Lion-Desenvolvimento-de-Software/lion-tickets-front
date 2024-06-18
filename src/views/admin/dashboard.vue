<template>
  <div class="custom-principal mb-2">
    <div class="layout">
      <div class="grid-item">
        <DoughnutChart style="width: 100%; height: 100%;" :options="options" :chartData="testData" />
      </div>
      <div class="grid-item">
        <BarChart style="width: 100%; height: 100%;" :options="options" :chartData="testData" />
      </div>
      <div class="grid-item">
        <BubbleChart style="width: 100%; height: 100%;" :options="options" :chartData="testData" />
      </div>
      <div class="grid-item">
        <LineChart style="width: 100%; height: 100%;" :options="options" :chartData="testData" />
      </div>
    </div>
  </div>
</template>

<script>
import { DoughnutChart, BarChart, BubbleChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'dashboard',
  components: {
    DoughnutChart,
    BarChart,
    BubbleChart,
    LineChart
  },
  setup() {
    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    const options = {
      responsive: true
    }

    return { testData, options };
  },
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 15px;
}

.layout .grid-item {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
  background-color: rgba(var(--bs-light-rgb),var(--bs-bg-opacity)) !important;
}

.grid-item {
  padding: 1em;
  width: 100% !important;
  height: 360px !important;
}
</style>