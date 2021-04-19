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
            <b-tab title="日" active @click="showDayGraph">
              <b-button
                class="mr-3"
                variant="outline-info"
                size="sm"
                @click="backDayGraph"
                >‹</b-button
              >
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardDayGraph"
                :disabled="disabledDayButton"
              >
                ›
              </b-button>
            </b-tab>
            <b-tab title="週" @click="showWeekGraph">
              <b-button
                class="mr-3"
                variant="outline-info"
                size="sm"
                @click="backWeekGraph"
                >‹</b-button
              >
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardWeekGraph"
                :disabled="disabledWeekButton"
              >
                ›
              </b-button>
            </b-tab>
            <b-tab title="月" @click="showMonthGraph">
              <b-button
                class="mr-3"
                variant="outline-info"
                size="sm"
                @click="backMonthGraph"
                >‹</b-button
              >
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardMonthGraph"
                :disabled="disabledMonthButton"
              >
                ›
              </b-button>
            </b-tab>
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
import statisticsRepository from "../repositories/statisticsRepository";
import { mapState } from "vuex";
import $_createToday from "../helpers/utile";
import $_createSpecificDate from "../helpers/utile";

export default {
  components: {
    TheHomeHeader,
    StatisticsChart,
  },
  data() {
    return {
      loading: false,
      loaded: true,
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

  computed: {
    ...mapState(["loginUser"]),

    disabledDayButton() {
      const today = this.$_createToday();
      const graphDate = this.$_createSpecificDate(this.chartData.labels[6]);
      if (today.getTime() === graphDate.getTime()) {
        return true;
      }
      return false;
    },

    disabledMonthButton() {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth());

      const graphNow = new Date(this.chartData.labels[6]);
      const graphMonth = new Date(graphNow.getFullYear(), graphNow.getMonth());

      if (thisMonth.getTime() === graphMonth.getTime()) {
        return true;
      }
      return false;
    },

    disabledWeekButton() {
      const now = new Date();
      var day = now.getDay(),
        diff = now.getDate() - day + (day == 0 ? -6 : 1);
      const starOfWeek = this.$_createSpecificDate(now.setDate(diff));
      const graphDate = this.$_createSpecificDate(this.chartData.labels[6]);

      if (starOfWeek.getTime() === graphDate.getTime()) {
        return true;
      }
      return false;
    },
  },

  created() {
    this.showDayGraph();
  },

  methods: {
    ...$_createToday,
    ...$_createSpecificDate,

    //日グラフ
    async showDayGraph() {
      this.multipleMethods(0, 0, "getDayGraph");
    },

    //日グラフ戻る
    backDayGraph() {
      this.multipleMethods(1, 0, "getBackDayGraph");
    },

    //日グラフ進む
    async forwardDayGraph() {
      this.multipleMethods(1, 6, "getForwardDayGraph");
    },

    //週グラフ
    async showWeekGraph() {
      this.multipleMethods(0, 0, "getWeekGraph");
    },

    //週グラフ戻る
    async backWeekGraph() {
      this.multipleMethods(1, 0, "getBackWeekGraph");
    },

    //週グラフ進む
    async forwardWeekGraph() {
      this.multipleMethods(1, 6, "getForwardWeekGraph");
    },

    //月グラフ
    async showMonthGraph() {
      this.multipleMethods(0, 0, "getMonthGraph");
    },

    //月グラフ戻る
    async backMonthGraph() {
      this.multipleMethods(1, 0, "getBackMonthGraph");
    },

    //月グラフ進
    async forwardMonthGraph() {
      this.multipleMethods(1, 6, "getForwardMonthGraph");
    },

    async multipleMethods(type, index, methodName) {
      this.changeLoading();
      var sendDate = "";
      if (type === 0) {
        sendDate = {
          id: this.loginUser.id,
        };
      }
      if (type === 1) {
        sendDate = {
          id: this.loginUser.id,
          data: this.chartData.labels[index],
        };
      }
      const resData = await statisticsRepository[methodName](sendDate);
      const Data = resData.data.data;

      this.resetData();
      this.insertData(Data);
      this.changeLoading();
    },

    resetData() {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
    },

    insertData(Data) {
      for (let key in Data) {
        this.chartData.labels.push(key);
        this.chartData.datasets[0].data.push(Data[key]);
      }
    },

    changeLoading() {
      this.loading = !this.loading;
      this.loaded = !this.loaded;
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
