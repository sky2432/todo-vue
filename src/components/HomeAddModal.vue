<template>
  <div id="app">
    <!-- 登録モーダル -->
    <b-modal id="add-modal" centered title="新しいTodoを入力">
      <template #default>
        <div style="display: flex">
          <!-- Todo入力インプット -->
          <b-form-input v-model="newTodo" class="col-8"></b-form-input>
          <!-- 期限設定ボタン -->
          <div class="ml-1 col-4">
            <b-button
              id="add-popover"
              variant="outline-info"
              @click="resetDeadlineError"
            >
              <b-icon icon="calendar2-check"></b-icon>
              {{ convertDeadline(todoDeadline) }}
            </b-button>
          </div>
        </div>

        <!-- カレンダーポップオーバー -->
        <b-popover
          target="add-popover"
          triggers="click"
          :show.sync="showPopover"
          placement="right"
        >
          <BaseCalender v-model="todoDeadline"></BaseCalender>

          <!-- エラーメッセージ -->
          <p v-if="showDeadlineError" class="error">
            今日以降の日付を選択してください
          </p>

          <!-- リマインダー -->
          <b-form-select
            :value="remindDay"
            @input="setRemindDay"
            :options="options"
            size="sm"
            class="mt-2"
          ></b-form-select>

          <b-form-timepicker
            v-if="showRemindTime"
            class="mt-2"
            v-model="remindTime"
            :placeholder="remindTime"
            size="sm"
            locale="ja"
            label-close-button="閉じる"
            close-button-variant="info"
            minutes-step="10"
            hide-header
          >
          </b-form-timepicker>

          <!-- ボタン -->
          <div class="my-3" style="text-align: right">
            <b-button
              @click="clearDeadline"
              size="md"
              variant="outline-danger"
              class="mr-2"
              >期限なし</b-button
            >
            <b-button
              @click="setAddDeadline"
              size="md"
              variant="outline-info"
              class="mr-2"
              >設定</b-button
            >
          </div>
        </b-popover>
      </template>

      <template #modal-footer>
        <b-button size="lg" variant="outline-danger" @click="addCancel">
          キャンセル
        </b-button>
        <b-button size="lg" variant="outline-info" @click="createTodo">
          登録
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import $_isBeforeToday from "../helpers/utile";
import $_createToday from "../helpers/utile";
import $_createSpecificDate from "../helpers/utile";
import $_createTomorrow from "../helpers/utile";
import BaseCalender from "../components/BaseCalender";
import todoListsRepository from "../repositories/todoListsRepository.js";
export default {
  components: {
    BaseCalender,
  },
  data() {
    return {
      newTodo: "",
      todoDeadline: "",
      showPopover: false,
      showDeadlineError: false,
      remindTime: "",
      showRemindTime: false,
      remindDay: null,
      options: [
        { value: null, text: "リマインドを設定" },
        { value: 0, text: "当日" },
        { value: 1, text: "1日前" },
        { value: 2, text: "2日前" },
      ],
    };
  },

  computed: {
    convertDeadline() {
      return function(deadline) {
        if (deadline === null) {
          return deadline;
        }
        if (deadline !== null) {
          const today = this.$_createToday();
          const todoDay = this.$_createSpecificDate(deadline);
          const tommorrow = this.$_createTomorrow();
          if (today.getTime() === todoDay.getTime()) {
            return "今日";
          }
          if (tommorrow.getTime() === todoDay.getTime()) {
            return "明日";
          }
          const convertDay =
            todoDay.getMonth() + 1 + "\t" + "/" + "\t" + todoDay.getDate();
          return convertDay;
        }
      };
    },
  },

  methods: {
    ...$_createToday,
    ...$_isBeforeToday,
    ...$_createSpecificDate,
    ...$_createTomorrow,

    setRemindDay(event) {
      this.remindDay = event;
      this.chaneShowRemindTime(event);
    },

    chaneShowRemindTime(event) {
      if (event !== null) {
        this.showRemindTime = true;
      }
      if (event === null) {
        this.showRemindTime = false;
      }
    },

    createDate(now) {
      const date =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2);
      return date;
    },

    setToday() {
      // 期限の初期値(今日)設定
      const now = new Date();
      this.todoDeadline = this.createDate(now);

      this.remindDay = null;
      this.showRemindTime = false;
      this.remindTime = "09:00:00";
    },

    //期限ボタン・期限エラーのリセット
    resetDeadlineError() {
      this.showDeadlineError = false;
    },

    //期限なしボタン
    clearDeadline() {
      this.showPopover = false;
      this.todoDeadline = null;
      this.remindDay = null;
      this.showRemindTime = false;
    },

    //設定ボタン
    setAddDeadline() {
      const result = this.$_isBeforeToday(this.todoDeadline);
      if (result) {
        this.showPopover = false;
      } else {
        this.showDeadlineError = true;
      }
    },

    // キャンセルボタン
    addCancel() {
      this.$bvModal.hide("add-modal");
      this.newTodo = "";
    },

    checkRemind() {
      if (this.remindDay === null) {
        this.remindTime = "";
      }
    },

    //Todoリストの作成
    async createTodo() {
      this.$bvModal.hide("add-modal"); //新規登録モーダルを閉じる
      this.checkRemind();
      const sendData = {
        user_id: this.$store.state.loginUser.id,
        todo_list: this.newTodo,
        deadline: this.todoDeadline,
        status: true,
        remind_day: this.remindDay,
        remind_time: this.remindTime,
      };
      await todoListsRepository.createTodo(sendData);
      this.newTodo = "";
      this.todoDeadline = "";
      this.remind = "";
      this.$emit("reload-todo");
    },
  },
};
</script>
