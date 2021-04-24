<template>
  <div id="app">
    <div class="tab-page">
      <div class="spinner-wrap">
        <b-spinner
          class="loading"
          v-if="loading"
          label="Loading..."
          variant="info"
        ></b-spinner>
      </div>
      <div v-if="loaded" class="row view-wrap">
        <div class="overview col-6">
          <div class="row count-wrap">
            <div class="col">
              <p class="count">{{ currentCount }}</p>
              <p class="count-text">現在の継続日数</p>
            </div>
            <div class="col">
              <p class="count">{{ highestCount }}</p>
              <p class="count-text">最高継続日数</p>
            </div>
          </div>
        </div>
        <div class="check-calender col-6">
          <v-calendar class="calender" :min-date="minDate" :max-date="new Date()">
            <template slot="day-content" slot-scope="props">
              <div :style="dateClass(props.day.date)">
                {{ props.day.day }}
              </div>
              <div v-if="checkClass(props.day.date)" class="check">
                ✔︎
              </div>
            </template>
          </v-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import statisticsRepository from "../repositories/statisticsRepository";
import $_createToday from "../helpers/utile";
import $_convertDateToString from "../helpers/utile";

export default {
  data() {
    return {
      loading: true,
      loaded: false,
      currentCount: "",
      highestCount: "",
      doneDateLists: [],
    };
  },

  computed: {
    ...mapState(["loginUser"]),

    dateClass() {
      return function(date) {
        const day = this.$_convertDateToString(date);
        const judge = this.doneDateLists.indexOf(day);
        if(date.getTime() === this.$_createToday().getTime()) {
          return "color: red";
        }
        if (judge !== -1) {
          return "color: #16a2b8";
        }
        return "color: black";
      };
    },

    checkClass() {
      return function(date) {
        const day = this.$_convertDateToString(date);
        const judge = this.doneDateLists.indexOf(day);
        if (judge !== -1) {
          return true;
        }
        return false;
      };
    },

    minDate() {
      const begin = new Date(this.loginUser.created_at);
      return begin; 
    }
  },

  created() {
    this.getDoneDate();
    this.getContinuousData();
  },

  methods: {
    ...$_createToday,
    ...$_convertDateToString,

    async getDoneDate() {
      const sendData = {
        id: this.$store.state.loginUser.id,
      };
      const resData = await statisticsRepository.getDoneDate(sendData);
      this.doneDateLists = resData.data.data;
    },

    async getContinuousData() {
      const sendData = {
        id: this.$store.state.loginUser.id,
      };
      const resData = await statisticsRepository.getContinuousData(sendData);
      this.currentCount = resData.data.current;
      this.highestCount = resData.data.highest;
      this.loading = false;
      this.loaded = true;
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
  position: relative;
}

.spinner-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.view-wrap {
  height: 100%;
}

.check-calender {
  display: flex;
  justify-content: center;
  align-items: center;
}

.calender {
  width: 80%;
  text-align: center;
}

.check {
  color: #16a2b8;
}

.overview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.count-wrap {
  width: 80%;
  text-align: center;
}

.count {
  font-size: 30px;
  margin-bottom: 0;
}

.count-text {
  color: #666666;
}
</style>
