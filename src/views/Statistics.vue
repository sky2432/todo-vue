<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="container">
        <b-tabs>
          <b-tab title="完了数">
            <StatisticsDoneCount></StatisticsDoneCount>
          </b-tab>
          <b-tab title="継続記録" active>
            <StatisticsContinuousRecord></StatisticsContinuousRecord>
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
};
</script>

<style scoped>
.container {
  padding: 0px;
  background: none;
  box-shadow: none;
}
</style>
