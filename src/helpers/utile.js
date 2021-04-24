export default {
  $_createToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
  },

  $_createSpecificDate(value) {
    const date = new Date(value);
    const specificDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return specificDate;
  },

  $_createSpecificMonth(value) {
    const date = new Date(value);
    const specificMonth = new Date(date.getFullYear(), date.getMonth());
    return specificMonth;
  },

  //比較用の明日の日付を作成
  $_createTomorrow() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return tomorrow;
  },

  $_validateDeadline(value) {
    const select = new Date(value);
    const selectDay = new Date(
      select.getFullYear(),
      select.getMonth(),
      select.getDate()
    );
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (today > selectDay) {
      this.showDeadlineError = true;
      this.deadlineError = "今日以降の日付を選択してください";
    } else {
      this.showPopover = false;
    }
  },

  //0埋めY-m-dフォーマットの作成
  $_convertDateToString(date) {
    const day = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
    return day;
  },
};
