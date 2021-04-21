<template>
  <div id="app">
    <div class="tab-page row">
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
        <div v-if="overviewLoaded" class="row count-wrap">
          <div class="col">
            <p class="count">{{ countData[0] }}</p>
            <p class="count-text">今日の完了数</p>
          </div>
          <div class="col">
            <p class="count">{{ countData[1] }}</p>
            <p class="count-text">全期間の完了数</p>
          </div>
          <div class="w-100 blank"></div>
          <div class="col">
            <p class="count">{{ countData[2] }}</p>
            <p class="count-text">今月の完了数</p>
          </div>
          <div class="col">
            <p class="count">{{ countData[3] }}</p>
            <p class="count-text">1日あたりの平均完了数</p>
          </div>
        </div>
      </div>

      <div class="graph col-6">
        <b-tabs content-class="mt-3" align="center" fill>
          <!-- 日グラフ -->
          <b-tab title="日" active @click="showDayGraph" class="tab">
            <div v-if="loaded">
              <b-button
                variant="outline-info"
                size="sm"
                @click="backDayGraph"
                :disabled="disableDayBackButton"
                >‹</b-button
              >
              <span class="term">{{ showDayTerm }}</span>
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardDayGraph"
                :disabled="disableDayForwardButton"
              >
                ›
              </b-button>
            </div>
          </b-tab>
          <!-- 週グラフ -->
          <b-tab title="週" @click="showWeekGraph" class="tab">
            <div v-if="loaded">
              <b-button
                variant="outline-info"
                size="sm"
                @click="backWeekGraph"
                :disabled="disableWeekBackButton"
                >‹</b-button
              >
              <span class="term">{{ showWeekTerm }}</span>
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardWeekGraph"
                :disabled="disableWeekForwardButton"
              >
                ›
              </b-button>
            </div>
          </b-tab>
          <!-- 月グラフ -->
          <b-tab title="月" @click="showMonthGraph" class="tab">
            <div v-if="loaded">
              <b-button
                variant="outline-info"
                size="sm"
                @click="backMonthGraph"
                :disabled="disableMonthBackButton"
                >‹</b-button
              >
              <span class="term">{{ showMonthTerm }}</span>
              <b-button
                variant="outline-info"
                size="sm"
                @click="forwardMonthGraph"
                :disabled="disableMonthForwardButton"
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

        <div class="graph-wrap">
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
import StatisticsChart from "../components/StatisticsChart";
import statisticsRepository from "../repositories/statisticsRepository";
import { mapState } from "vuex";
import $_createToday from "../helpers/utile";
import $_createSpecificDate from "../helpers/utile";
import $_createSpecificMonth from "../helpers/utile";

export default {
  components: {
    StatisticsChart,
  },
  data() {
    return {
      loading: false,
      loaded: true,
      overviewLoading: true,
      overviewLoaded: false,
      countData: [],
      userbeginDate: "",
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Todo完了数",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                callback: function(value) {
                  var format = "";
                  if (value.length === 10) {
                    format = "MM月DD日";
                  }
                  if (value.length === 7) {
                    format = "MM月";
                  }
                  const date = new Date(value);
                  format = format.replace(/MM/, date.getMonth() + 1);
                  format = format.replace(/DD/, date.getDate());

                  return format;
                },
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

    disableDayBackButton() {
      const begin = this.$_createSpecificDate(this.loginUser.created_at);

      return this.checkGraphBegin(begin, "$_createSpecificDate");
    },

    disableWeekBackButton() {
      const begin = this.createStartOfWeek(1, this.loginUser.created_at);

      return this.checkGraphBegin(begin, "$_createSpecificDate");
    },

    disableMonthBackButton() {
      const begin = this.$_createSpecificMonth(this.loginUser.created_at);

      return this.checkGraphBegin(begin, "$_createSpecificMonth");
    },

    disableDayForwardButton() {
      const today = this.$_createToday();
      const graphDate = this.$_createSpecificDate(this.chartData.labels[6]);
      if (today.getTime() === graphDate.getTime()) {
        return true;
      }
      return false;
    },

    disableWeekForwardButton() {
      return this.checkWeekGraphEnd();
    },

    disableMonthForwardButton() {
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
    this.getCountData();
  },

  methods: {
    ...$_createToday,
    ...$_createSpecificDate,
    ...$_createSpecificMonth,

    checkGraphBegin(begin, methodName) {
      for (let i = 0; i < this.chartData.labels.length; i++) {
        const graphDate = this[methodName](this.chartData.labels[i]);

        if (begin.getTime() === graphDate.getTime()) {
          return true;
        }
      }
      return false;
    },

    async getCountData() {
      const sendDate = {
        id: this.loginUser.id,
      };
      const resData = await statisticsRepository.getAllCountData(sendDate);
      this.countData = resData.data.data;
      this.overviewLoading = false;
      this.overviewLoaded = true;
    },

    checkWeekGraphEnd() {
      const startOfWeek = this.createStartOfWeek(0);
      const graphDate = this.$_createSpecificDate(this.chartData.labels[6]);

      if (startOfWeek.getTime() === graphDate.getTime()) {
        return true;
      }
      return false;
    },

    createStartOfWeek(type, value) {
      let date = "";
      if (type === 0) {
        date = new Date();
      }
      if (type === 1) {
        date = new Date(value);
      }
      const day = date.getDay(),
        diff = date.getDate() - day + (day == 0 ? -6 : 1);
      const startOfWeek = this.$_createSpecificDate(date.setDate(diff));
      return startOfWeek;
    },

    checkMonthGraphEnd() {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth());

      const graphMonth = this.$_createSpecificMonth(this.chartData.labels[6]);

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
      this.getGraphData(0, 0, "getDayGraph");
    },

    //日グラフ戻る
    backDayGraph() {
      this.getGraphData(1, 0, "getBackDayGraph");
    },

    //日グラフ進む
    async forwardDayGraph() {
      this.getGraphData(1, 6, "getForwardDayGraph");
    },

    //週グラフ
    async showWeekGraph() {
      this.getGraphData(0, 0, "getWeekGraph");
    },

    //週グラフ戻る
    async backWeekGraph() {
      this.getGraphData(1, 0, "getBackWeekGraph");
    },

    //週グラフ進む
    async forwardWeekGraph() {
      this.getGraphData(1, 6, "getForwardWeekGraph");
    },

    //月グラフ
    async showMonthGraph() {
      this.getGraphData(0, 0, "getMonthGraph");
    },

    //月グラフ戻る
    async backMonthGraph() {
      this.getGraphData(1, 0, "getBackMonthGraph");
    },

    //月グラフ進
    async forwardMonthGraph() {
      this.getGraphData(1, 6, "getForwardMonthGraph");
    },

    async getGraphData(type, index, methodName) {
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
.tab-page {
  height: 440px;
  padding: 20px;
  background: hsl(0 0% 100%);
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
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

.tab {
  text-align: center;
}

.graph-wrap {
  display: flex;
  justify-content: center;
}

.graph {
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
