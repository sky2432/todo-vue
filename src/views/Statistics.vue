<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="container row">
        <div class="overview col-6">
          <p>概要</p>
        </div>
        <div class="graph col-6">
          <b-tabs content-class="mt-3">
            <b-tab title="日" active @click="showDayGraph"></b-tab>
            <b-tab title="週"></b-tab>
            <b-tab title="月" @click="showMonthGraph"></b-tab>
          </b-tabs>
          <div class="spinner-wrap">
            <b-spinner
              class="loading"
              v-if="loading"
              label="Loading..."
              variant="info"
            ></b-spinner>
          </div>
          <StatisticsChart
            class="chart"
            v-if="loaded"
            :chartData="chartData"
            :options="chartOptions"
          ></StatisticsChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import StatisticsChart from "../components/StatisticsChart";
import utilRepository from "../repositories/utilRepository";

export default {
  components: {
    TheHomeHeader,
    StatisticsChart,
  },
  data() {
    return {
      loading: true,
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Todo完了数",
            data: [],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10,
              },
            },
          ],
        },
      },
    };
  },

  created() {
    this.showDayGraph();
  },

  methods: {
    async showDayGraph() {
      this.resetData();
      const sendDate = {
        id: this.$store.state.loginUser.id,
      };
      const resData = await utilRepository.getDayGraph(sendDate);
      const Data = resData.data.data;
      this.insertData(Data);
      this.changeLoad();
    },

    async showMonthGraph() {
      this.resetData();
      const sendDate = {
        id: this.$store.state.loginUser.id,
      };
      const resData = await utilRepository.getMonthGraph(sendDate);
      const Data = resData.data.data;
      this.insertData(Data);
      this.changeLoad();
    },

    resetData() {
      this.loading = true;
      this.loaded = false;
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
    },

    insertData(Data) {
      for (let key in Data) {
        this.chartData.labels.push(key);
        this.chartData.datasets[0].data.push(Data[key]);
      }
    },

    changeLoad() {
      this.loading = false;
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.overview {
  height: 400px;
}

.graph {
  height: 400px;
  position: relative;
}

.chart {
  width: 60%;
}

.spinner-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
