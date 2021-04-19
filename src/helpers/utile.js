export default {
  $_createToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
  },

  $_createSpecificDate(date) {
    const todo = new Date(date);
    const todoDeadline = new Date(
      todo.getFullYear(),
      todo.getMonth(),
      todo.getDate()
    );
    return todoDeadline;
  },

  //比較用の明日の日付を作成
  $_createTomorrow() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return tomorrow;
  },

  $_validateDeadline(date) {
    const select = new Date(date);
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
};
