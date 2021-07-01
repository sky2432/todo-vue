<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="spinner-wrap" v-if="loading">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
      <div class="container" v-show="loaded">
        <b-tabs>
          <b-tab title="完了数" active>
            <StatisticsDoneCount @loaded="changeloading"></StatisticsDoneCount>
          </b-tab>
          <b-tab title="継続記録">
            <StatisticsContinuousRecord
              @loaded="changeloading"
            ></StatisticsContinuousRecord>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import StatisticsDoneCount from "../components/StatisticsDoneCount";
import StatisticsContinuousRecord from "../components/StatisticsContinuousRecord";

export default {
  components: {
    TheHomeHeader,
    StatisticsDoneCount,
    StatisticsContinuousRecord,
  },
  data() {
    return {
      loading: true,
      loaded: false,
    };
  },

  methods: {
    changeloading() {
      this.loading = false;
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
  background: none;
  box-shadow: none;
}

@media screen and (max-width: 992px) {
  .wrapper {
    display: block;
  }

  .container {
    margin-top: 8px;
  }
}
</style>
