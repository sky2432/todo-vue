<template>
  <div id="app">
    <!-- 編集モーダル -->
    <b-modal
      id="edit-modal"
      footer-class="edit-modal-footer"
      title="Todoを編集"
      centered
      no-stacking
    >
      <template #default>
        <div class="input-btn-wrap">
          <!-- Todo入力インプット -->
          <b-form-input
            v-model="updatedTodo"
            class="modal-input"
          ></b-form-input>
          <!-- 期限設定ボタン -->
          <div class="calendar-btn-wrap">
            <b-button
              id="edit-popover"
              class="calendar-btn"
              variant="outline-info"
              v-b-modal.edit-calendar-modal
            >
              <b-icon icon="calendar2-check"></b-icon>
              <span v-if="showDeadlineBtnText" class="ml-2">{{
                convertDeadline(updatedTodoDeadline)
              }}</span>
            </b-button>
          </div>
        </div>
        <!-- カレンダーポップオーバー -->
        <b-popover
          v-if="showCalendarPopover"
          target="edit-popover"
          triggers="click"
          :show.sync="showPopover"
        >
          <BaseCalender v-model="updatedTodoDeadline"></BaseCalender>

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
        <b-button
          :size="changeTrashBtnSize"
          variant="outline-danger"
          @click="deleteTodo(updateTodoData.id)"
        >
          <b-icon icon="trash"></b-icon>
        </b-button>
        <div>
          <b-button
            class="mr-2"
            :size="changeBtnSize"
            variant="outline-danger"
            @click="editCancel"
          >
            キャンセル
          </b-button>
          <b-button
            :size="changeBtnSize"
            variant="outline-info"
            @click="updateTodo"
          >
            更新
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- カレンダーモーダル -->
    <b-modal
      v-if="showCalendarModal"
      id="edit-calendar-modal"
      title="期限の設定"
      body-class="calendar-modal-content"
      centered
      no-stacking
    >
      <template #default>
        <BaseCalender
          v-model="updatedTodoDeadline"
          style="text-align: center;"
        ></BaseCalender>

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
            @click="editCalendarModalClearDeadline"
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
import todoListsDoneRepository from "../repositories/todoListsDoneRepository";
import windowWidthMixin from "../mixins/windowWidthMixin";

export default {
  components: {
    BaseCalender,
    BaseRemindDaySelector,
    BaseTimepicker,
  },

  props: {
    ParentTodoLists: {
      type: Array,
    },
  },

  mixins: [windowWidthMixin],

  data() {
    return {
      updateTodoData: "",
      updatedTodo: "",
      updatedTodoDeadline: "",
      showPopover: false,
      remindTime: "",
      showRemindTime: false,
      remindDay: null,
      showCalendarModal: false,
      showCalendarPopover: true,
    };
  },

  computed: {
    showDeadlineBtnText() {
      return this.$helpers.$_isNotEmpty(this.updatedTodoDeadline);
    },

    convertDeadline() {
      return function(deadline) {
        return this.$helpers.$_convertDeadline(deadline);
      };
    },

    changeBtnSize() {
      if (this.width >= 567) {
        return "lg";
      }
      return "md";
    },

    changeTrashBtnSize() {
      if (this.width >= 567) {
        return "md";
      }
      return "sm";
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
      this.changeShowRemindTime(event);
    },

    changeShowRemindTime(event) {
      if (event !== null) {
        this.showRemindTime = true;
      }
      if (event === null) {
        this.showRemindTime = false;
      }
    },

    // 編集するTodoリストの取得
    getTodoData(id) {
      for (let index in this.ParentTodoLists) {
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
      if (this.remindDay === null) {
        this.showRemindTime = false;
        this.remindTime = "09:00:00";
      }
    },

    //期限なしボタン
    clearDeadline() {
      this.showPopover = false;
      this.updatedTodoDeadline = "";
      this.remindDay = null;
      this.showRemindTime = false;
    },

    // 設定ボタン
    setUpdateDeadline() {
      this.showPopover = false;
    },

    //キャンセルボタン
    editCancel() {
      this.$bvModal.hide("edit-modal");
    },

    closeCalendarModal() {
      this.$bvModal.show("edit-modal");
    },

    editCalendarModalClearDeadline() {
      this.updatedTodoDeadline = "";
      this.remindDay = null;
      this.showRemindTime = false;
      this.$bvModal.show("edit-modal");
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

    async deleteTodo(id) {
      this.$bvModal.hide("edit-modal");
      await todoListsDoneRepository.deleteTodo(id);
      this.$emit("reload-todo");
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

::v-deep .edit-modal-footer {
  justify-content: space-between;
}

@media screen and (max-width: 576px) {
  .modal-input {
    width: 100%;
  }
}
</style>
