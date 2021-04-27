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

  $_isBeforeToday(value) {
    const select = new Date(value);
    const selectDay = new Date(
      select.getFullYear(),
      select.getMonth(),
      select.getDate()
    );
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (today > selectDay) {
      return false;
    } else {
      return true;
    }
  },

  //0埋めY-m-dフォーマットの作成
  $_convertDateToString(date) {
    const day = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
    return day;
  },

  $_isLongLength(value, width) {
    if (width >= 960) {
      if (value.length > 25) {
        return true;
      }
      return false;
    }
    if (width >= 768) {
      if (value.length > 20) {
        return true;
      }
      return false;
    }
    if (width >= 376) {
      if (value.length > 10) {
        return true;
      }
      return false;
    }
    if (width < 376) {
      if (value.length > 5) {
        return true;
      }
      return false;
    }
  },

  $_cutLength(value, width) {
    if (width >= 960) {
      if (value.length > 25) {
        return value.substr(0, 25) + "...";
      }
      return value;
    }
    if (width >= 768) {
      if (value.length > 20) {
        return value.substr(0, 20) + "...";
      }
      return value;
    }
    if (width >= 376) {
      if (value.length > 10) {
        return value.substr(0, 10) + "...";
      }
      return value;
    }
    if (width < 376) {
      if (value.length > 5) {
        return value.substr(0, 5) + "...";
      }
      return value;
    }
  },

  $_convertRemindDay(value) {
    if (value !== null) {
      if (value === 0) {
        return "当日\t";
      }
      if (value === 1) {
        return "1日前\t";
      }
      if (value === 2) {
        return "2日前\t";
      }
    }
  },

  $_convertRemindTime(value) {
    if (value !== null) {
      if (value.slice(0, 1) === "0") {
        return value.slice(1, 5);
      }
      return value.slice(0, 5);
    }
  },
};
