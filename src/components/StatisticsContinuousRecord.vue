<template>
  <div id="app">
    <div class="tab-page row">
      <div class="numeric col-6">
        overview
      </div>
      <div class="check-calender col-6">
        <b-calendar
          v-model="value"
          :date-info-fn="dateClass"
          locale="ja"
          readonly
          hide-header
        ></b-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dateClass(ymd, date) {
      const day = date.getDate();
      return day >= 10 && day <= 20 ? "table-info" : "";
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

.check-calender {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
