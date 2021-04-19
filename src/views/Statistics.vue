<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="container row">
        <div class="overview col-6">
          <p class="overview-title">概要</p>
          <div class="spinner-wrap">
            <b-spinner
              class="loading"
              v-if="overviewLoading"
              label="Loading..."
              variant="info"
            ></b-spinner>
          </div>
          <b-row v-if="overviewLoaded" class="count-wrap">
            <b-col>
              <p class="count">{{ dayCount }}</p>
              <p class="count-text">今日の完了数</p>
            </b-col>
            <b-col>
              <p class="count">{{ allCount }}</p>
              <p class="count-text">全期間の完了数</p>
            </b-col>
            <div class="w-100 blank"></div>
            <b-col>
              <p class="count">{{ monthCount }}</p>
              <p class="count-text">今月の完了数</p>
            </b-col>
            <b-col>
              <p class="count">{{ dayAvg }}</p>
              <p class="count-text">1日あたりの平均完了数</p>
            </b-col>
          </b-row>
        </div>
        <div class="graph col-6">
          <b-tabs content-class="mt-3">
            <!-- 日グラフ -->
            <b-tab title="日" active @click="showDayGraph">
              <div v-if="loaded">
                <b-button variant="outline-info" size="sm" @click="backDayGraph"
                  >‹</b-button
                >
                <span class="term">{{ showDayTerm }}</span>
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="forwardDayGraph"
                  :disabled="disabledDayButton"
                >
                  ›
                </b-button>
              </div>
            </b-tab>
            <!-- 週グラフ -->
            <b-tab title="週" @click="showWeekGraph">
              <div v-if="loaded">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="backWeekGraph"
                  >‹</b-button
                >
                <span class="term">{{ showWeekTerm }}</span>
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="forwardWeekGraph"
                  :disabled="disabledWeekButton"
                >
                  ›
                </b-button>
              </div>
            </b-tab>
            <!-- 月グラフ -->
            <b-tab title="月" @click="showMonthGraph">
              <div v-if="loaded">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="backMonthGraph"
                  >‹</b-button
                >
                <span class="term">{{ showMonthTerm }}</span>
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="forwardMonthGraph"
                  :disabled="disabledMonthButton"
                >
                  ›
                </b-button>
              </div>
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
      overviewLoading: true,
      overviewLoaded: false,
      allCount: "",
      dayCount: "",
      monthCount: "",
      dayAvg: "",
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

    disabledWeekButton() {
      return this.checkWeekGraphEnd();
    },

    disabledMonthButton() {
      return this.checkMonthGraphEnd();
    },

    showDayTerm() {
      const begin = this.createTermDate(0);
      const end = this.createTermDate(6);
      return `${begin} ~ ${end}`;
    },

    showWeekTerm() {
      const begin = this.createTermDate(0);
      var end = "";
      if (this.checkWeekGraphEnd() === true) {
        end = this.createTermToday();
      }
      if (this.checkWeekGraphEnd() === false) {
        const graphEnd = new Date(this.chartData.labels[6]);
        const weekEnd = new Date(
          graphEnd.getFullYear(),
          graphEnd.getMonth(),
          graphEnd.getDate() + 6
        );
        console.log(weekEnd);
        end = this.convertDateFormat(weekEnd, "YYYY年MM月DD日");
      }
      return `${begin} ~ ${end}`;
    },

    showMonthTerm() {
      const begin = this.createTermDate(0);
      var end = "";
      if (this.checkMonthGraphEnd() === true) {
        end = this.createTermToday();
      }
      if (this.checkMonthGraphEnd() === false) {
        const graphNow = new Date(this.chartData.labels[6]);
        const graphMonth = new Date(
          graphNow.getFullYear(),
          graphNow.getMonth() + 1,
          graphNow.getDate() - 1
        );
        end = this.convertDateFormat(graphMonth, "YYYY年MM月DD日");
      }
      return `${begin} ~ ${end}`;
    },
  },

  created() {
    this.showDayGraph();
    this.showCountData();
  },

  methods: {
    ...$_createToday,
    ...$_createSpecificDate,

    async showCountData() {
      // await this.wrapGetCountData();
      this.getCountData("getDayCount", "dayCount");
      this.getCountData("getAllCount", "allCount");
      this.getCountData("getMonthCount", "monthCount");
      await this.getCountData("getDayAvg", "dayAvg");
      this.overviewLoading = false;
      this.overviewLoaded = true;
    },

    async getCountData(methodName, dataName) {
      const sendDate = {
        id: this.loginUser.id,
      };
      const resData = await statisticsRepository[methodName](sendDate);
      this[dataName] = resData.data.data;
    },

    checkWeekGraphEnd() {
      const now = new Date();
      var day = now.getDay(),
        diff = now.getDate() - day + (day == 0 ? -6 : 1);
      const startOfWeek = this.$_createSpecificDate(now.setDate(diff));
      const graphDate = this.$_createSpecificDate(this.chartData.labels[6]);

      if (startOfWeek.getTime() === graphDate.getTime()) {
        return true;
      }
      return false;
    },

    checkMonthGraphEnd() {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth());

      const graphNow = new Date(this.chartData.labels[6]);
      const graphMonth = new Date(graphNow.getFullYear(), graphNow.getMonth());

      if (thisMonth.getTime() === graphMonth.getTime()) {
        return true;
      }
      return false;
    },

    createTermDate(index) {
      const date = this.convertDateFormat(
        new Date(this.chartData.labels[index]),
        "YYYY年MM月DD日"
      );
      return date;
    },

    createTermToday() {
      const date = this.convertDateFormat(new Date(), "YYYY年MM月DD日");
      return date;
    },

    convertDateFormat(date, format) {
      format = format.replace(/YYYY/, date.getFullYear());
      format = format.replace(/MM/, date.getMonth() + 1);
      format = format.replace(/DD/, date.getDate());

      return format;
    },

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

.overview-title {
  font-size: 30px;
  color: #666666;
}

.count-wrap {
  margin: 60px 0 0 0px;
  text-align: center;
}

.blank {
  height: 20px;
}

.count {
  font-size: 30px;
  margin-bottom: 0;
}

.count-text {
  color: #666666;
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

.term {
  padding: 0 25px;
  color: #666666;
}
</style>
