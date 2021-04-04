export default {
  $_createToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
  },

  $_validateDeadline(value) {
    const select = new Date(value);
    const selectDay = new Date(
      select.getFullYear(),
      select.getMonth(),
      select.getDate()
    );
    const today = this.$_createToday();
    if (today > selectDay) {
      this.showDeadlineError = true;
      this.deadlineError = "今日以降の日付を選択してください";
    } else {
      this.showPopover = false;
    }
  },

};