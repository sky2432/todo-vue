<template>
  <div id="app">
    <!-- 登録モーダル -->
    <b-modal id="add-modal" title="新しいTodoを入力" centered no-stacking>
      <template #default>
        <div class="input-btn-wrap">
          <!-- Todo入力インプット -->
          <b-form-input v-model="newTodo" class="modal-input"></b-form-input>
          <!-- 期限設定ボタン -->
          <div class="calendar-btn-wrap">
            <b-button
              id="calendar-popover"
              class="calendar-btn"
              variant="outline-info"
              v-b-modal.calendar-modal
            >
              <b-icon icon="calendar2-check"></b-icon>
              <span v-if="showDeadlineBtnText" class="ml-2">{{
                convertDeadline(todoDeadline)
              }}</span>
            </b-button>
          </div>
        </div>

        <!-- カレンダーポップオーバー -->
        <b-popover
          v-if="showCalendarPopover"
          :show.sync="showPopover"
          target="calendar-popover"
          triggers="click"
        >
          <BaseCalender v-model="todoDeadline"></BaseCalender>

          <!-- リマインダー -->
          <BaseRemindDaySelector
            :value="remindDay"
            @input="setRemindDay"
            class="mt-2"
          ></BaseRemindDaySelector>

          <BaseTimepicker
            v-if="showRemindTime"
            class="mt-2"
            v-model="remindTime"
          ></BaseTimepicker>

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
        <b-button :size="changeBtnSize" variant="outline-danger" @click="addCancel">
          キャンセル
        </b-button>
        <b-button :size="changeBtnSize" variant="outline-info" @click="createTodo">
          登録
        </b-button>
      </template>
    </b-modal>

    <!-- カレンダーモーダル -->
    <b-modal
      v-if="showCalendarModal"
      id="calendar-modal"
      title="期限・リマインドの設定"
      body-class="calendar-modal-content"
      centered
      no-stacking
    >
      <template #default>
        <BaseCalender
          v-model="todoDeadline"
          style="text-align: center;"
        ></BaseCalender>

        <!-- リマインダー -->
        <div class="remind-wrap">
          <BaseRemindDaySelector
            :value="remindDay"
            @input="setRemindDay"
            class="mt-2 remind-day-selecter"
          ></BaseRemindDaySelector>

          <div class="remind-timepicker-wrap" v-if="showRemindTime">
            <BaseTimepicker
              class="mt-2 remind-timepicker"
              v-model="remindTime"
            ></BaseTimepicker>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <div>
          <b-button
            @click="calendarModalClearDeadline"
            size="md"
            variant="outline-danger"
            class="mr-2"
            >期限なし</b-button
          >
          <b-button
            @click="closeCalendarModal"
            size="md"
            variant="outline-info"
            class="mr-2"
            >設定</b-button
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseCalender from "../components/BaseCalender";
import BaseRemindDaySelector from "../components/BaseRemindDaySelector";
import BaseTimepicker from "../components/BaseTimepicker";
import todoListsRepository from "../repositories/todoListsRepository.js";
import windowWidthMixin from "../mixins/windowWidthMixin";


export default {
  components: {
    BaseCalender,
    BaseRemindDaySelector,
    BaseTimepicker,
  },

  data() {
    return {
      newTodo: "",
      todoDeadline: "",
      showPopover: false,
      remindDay: null,
      remindTime: "",
      showRemindTime: false,
      showCalendarModal: false,
      showCalendarPopover: true,
    };
  },

  mixins: [windowWidthMixin],

  computed: {
    showDeadlineBtnText() {
      return this.$helpers.$_isNotEmpty(this.todoDeadline);
    },

    convertDeadline() {
      return function(deadline) {
        return this.$helpers.$_convertDeadline(deadline);
      };
    },

    changeBtnSize() {
      if (this.width >= 567) {
        return "lg";
      } else if (this.width < 567) {
        return "md";
      }
    },
  },


  watch: {
    width() {
      this.changeSettingDeadlineDisplayType();
    },
  },

  mounted() {
    this.changeSettingDeadlineDisplayType();
  },

  methods: {
    changeSettingDeadlineDisplayType() {
      if (this.width >= 567) {
        this.showCalendarPopover = true;
        this.showCalendarModal = false;
      } else if (this.width < 567) {
        this.showCalendarPopover = false;
        this.showCalendarModal = true;
      }
    },

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

    setToday() {
      // 期限の初期値(今日)設定
      this.todoDeadline = this.$helpers.$_convertDateToString(new Date());

      this.remindDay = null;
      this.showRemindTime = false;
      this.remindTime = "09:00:00";
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
      this.showPopover = false;
    },

    closeCalendarModal() {
      this.$bvModal.show("add-modal");
    },

    calendarModalClearDeadline() {
      this.todoDeadline = "";
      this.remindDay = null;
      this.showRemindTime = false;
      this.$bvModal.show("add-modal");
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
      this.resetTodoData();
      this.$emit("reload-todo");
    },

    resetTodoData() {
      this.newTodo = "";
      this.todoDeadline = "";
    },
  },
};
</script>

<style scoped>
.modal-input {
  width: 70%;
}

::v-deep .calendar-modal-content {
  padding: 16px 0;
}

.remind-wrap {
  text-align: center;
}

.remind-day-selecter,
.remind-timepicker {
  width: 250px;
}

.remind-timepicker-wrap {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 576px) {
  .modal-input {
    width: 100%;
  }
}
</style>
