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
              variant="info"
              ref="button"
              @click="resetDeadlineError"
            >
              <b-icon icon="calendar2-check"></b-icon>
              {{ updatedTodoDeadline }}
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
          <!-- カレンダー -->
          <div class="">
            <b-calendar
              v-model="updatedTodoDeadline"
              width="200px"
              label-help=""
              nav-button-variant="info"
              locale="ja"
            ></b-calendar>
          </div>
          <!-- エラーメッセージ -->
          <p v-if="showDeadlineError" class="error">{{ deadlineError }}</p>
          <!-- ボタン -->
          <div class="my-3" style="text-align: right">
            <b-button
              @click="clearDeadline"
              size="md"
              variant="danger"
              class="mr-2"
              >期限なし</b-button
            >
            <b-button
              @click="setUpdateDeadline"
              size="md"
              variant="info"
              class="mr-2"
              >設定</b-button
            >
          </div>
        </b-popover>
      </template>

      <template #modal-footer>
        <b-button size="lg" variant="danger" @click="editCancel">
          キャンセル
        </b-button>
        <b-button size="lg" variant="info" @click="updateTodo">
          編集
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import $_validateDeadline from "../helpers/utile";

export default {
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
      deadlineError: "",
      showDeadlineError: false,
    };
  },

  methods: {
    ...$_validateDeadline,

    showUpdateModal($id) {
      this.$refs.commonModal.showUpdateModal($id);
    },

    // 編集するTodoリストの取得
    showUpdateModal($id) {
      let index = "";
      for (index in this.ParentTodoLists) {
        let list = this.ParentTodoLists[index];
        if (list.id === $id) {
          this.updateTodoData = list;
          this.updatedTodo = list.todo_list;
          this.updatedTodoDeadline = list.deadline;
        }
      }
    },

    //期限エラーのリセット
    resetDeadlineError() {
      this.showDeadlineError = false;
    },

    //期限なしボタン
    clearDeadline() {
      this.showPopover = false;
      this.updatedTodoDeadline = "";
    },

    // 設定ボタン
    setUpdateDeadline() {
      this.$_validateDeadline(this.updatedTodoDeadline);
    },

    //キャンセルボタン
    editCancel() {
      this.$bvModal.hide("edit-modal");
    },

    //Todoリストを編集
    async updateTodo() {
      this.$bvModal.hide("edit-modal");
      const sendData = {
        todo_list: this.updatedTodo,
        deadline: this.updatedTodoDeadline,
      };
      await axios.put(
        "http://127.0.0.1:8000/api/todoLists/" + this.updateTodoData.id,
        sendData
      );
      this.$emit("reload-todo");
    },
  },
};
</script>
