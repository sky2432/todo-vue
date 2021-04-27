<template>
  <div id="app">
    <!-- 編集モーダル -->
    <b-modal id="edit-modal" centered title="Todoを編集">
      <template #default>
        <div style="display: flex">
          <!-- Todo入力インプット -->
          <b-form-input v-model="updatedTodo" class="col-8"></b-form-input>
          <!-- 期限設定ボタン -->
          <div class="ml-1">
            <b-button
              id="edit-popover"
              variant="outline-info"
              ref="button"
              @click="resetDeadlineError"
            >
              <b-icon icon="calendar2-check"></b-icon>
              {{ convertDeadline(updatedTodoDeadline) }}
            </b-button>
          </div>
        </div>
        <!-- カレンダーポップオーバー -->
        <b-popover
          target="edit-popover"
          triggers="click"
          :show.sync="showPopover"
          placement="right"
        >
          <BaseCalender v-model="updatedTodoDeadline"></BaseCalender>

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
              @click="setUpdateDeadline"
              size="md"
              variant="outline-info"
              class="mr-2"
              >設定</b-button
            >
          </div>
        </b-popover>
      </template>

      <template #modal-footer>
        <b-button size="lg" variant="outline-danger" @click="editCancel">
          キャンセル
        </b-button>
        <b-button size="lg" variant="outline-info" @click="updateTodo">
          編集
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import BaseCalender from "../components/BaseCalender";
import todoListsRepository from "../repositories/todoListsRepository.js";

export default {
  components: {
    BaseCalender,
  },

  props: {
    ParentTodoLists: {
      type: Array,
    },
  },

  data() {
    return {
      updateTodoData: "",
      updatedTodo: "",
      updatedTodoDeadline: "",
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
          const today = this.$helpers.$_createToday();
          const todoDay = this.$helpers.$_createSpecificDate(deadline);
          const tommorrow = this.$helpers.$_createTomorrow();
          if (today.getTime() === todoDay.getTime()) {
            return "今日";
          }
          if (tommorrow.getTime() === todoDay.getTime()) {
            return "明日";
          }
          const convertDay = `${todoDay.getMonth() + 1} / ${todoDay.getDate()}`;
          return convertDay;
        }
      };
    },
  },

  methods: {
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

    // 編集するTodoリストの取得
    getTodoData(id) {
      let index = "";
      for (index in this.ParentTodoLists) {
        let list = this.ParentTodoLists[index];
        if (list.id === id) {
          this.updateTodoData = list;
          this.updatedTodo = list.todo_list;
          this.updatedTodoDeadline = list.deadline;
          this.remindDay = list.remind_day;
          this.remindTime = list.remind_time;
        }
      }
      if (this.remindDay !== null) {
        this.showRemindTime = true;
      }
      if (this.remindDay == null) {
        this.showRemindTime = false;
        this.remindTime = "09:00:00";
      }
    },

    //期限エラーのリセット
    resetDeadlineError() {
      this.showDeadlineError = false;
    },

    //期限なしボタン
    clearDeadline() {
      this.showPopover = false;
      this.updatedTodoDeadline = null;
      this.remindDay = null;
      this.showRemindTime = false;
    },

    // 設定ボタン
    setUpdateDeadline() {
      const resulet = this.$helpers.$_isBeforeToday(this.updatedTodoDeadline);
      if (resulet) {
        this.showPopover = false;
      } else {
        this.showDeadlineError = true;
      }
    },

    //キャンセルボタン
    editCancel() {
      this.$bvModal.hide("edit-modal");
    },

    checkRemind() {
      if (this.remindDay === null) {
        this.remindTime = "";
      }
    },

    //Todoリストを編集
    async updateTodo() {
      this.$bvModal.hide("edit-modal");
      const todoId = this.updateTodoData.id;
      const sendData = {
        todo_list: this.updatedTodo,
        deadline: this.updatedTodoDeadline,
        remind_day: this.remindDay,
        remind_time: this.remindTime,
      };
      await todoListsRepository.updateTodo(todoId, sendData);
      this.$emit("reload-todo");
    },
  },
};
</script>
