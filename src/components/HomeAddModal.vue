<template>
  <div id="app">
    <!-- 登録モーダル -->
    <b-modal id="add-modal" centered title="新しいTodoを入力">
      <template #default>
        <div style="display: flex">
          <!-- Todo入力インプット -->
          <b-form-input v-model="newTodo" class="col-8"></b-form-input>
          <!-- 期限設定ボタン -->
          <div class="ml-1">
            <b-button
              id="add-popover"
              variant="info"
              ref="button"
              @click="resetDeadlineError"
            >
              <b-icon icon="calendar2-check"></b-icon>
              {{ todoDeadline }}
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
              @click="setAddDeadline"
              size="md"
              variant="info"
              class="mr-2"
              >設定</b-button
            >
          </div>
        </b-popover>
      </template>

      <template #modal-footer>
        <b-button size="lg" variant="danger" @click="addCancel">
          キャンセル
        </b-button>
        <b-button size="lg" variant="info" @click="createTodo">
          登録
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import $_validateDeadline from "../helpers/utile";
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
      deadlineError: "",
      showDeadlineError: false,
    };
  },

  methods: {
    ...$_validateDeadline,

    setToday() {
      // 期限の初期値(今日)設定
      const now = new Date();
      this.todoDeadline =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2);
    },

    //期限エラーのリセット
    resetDeadlineError() {
      this.showDeadlineError = false;
    },

    //期限なしボタン
    clearDeadline() {
      this.showPopover = false;
      this.todoDeadline = "";
    },

    //設定ボタン
    setAddDeadline() {
      this.$_validateDeadline(this.todoDeadline);
    },

    // キャンセルボタン
    addCancel() {
      this.$bvModal.hide("add-modal");
      this.newTodo = "";
    },

    //Todoリストの作成
    async createTodo() {
      this.$bvModal.hide("add-modal"); //新規登録モーダルを閉じる
      const sendData = {
        user_id: this.$store.state.loginUser.id,
        todo_list: this.newTodo,
        deadline: this.todoDeadline,
        status: true,
      };
      await todoListsRepository.createTodo(sendData);
      this.newTodo = "";
      this.todoDeadline = "";
      this.$emit("reload-todo");
    },
  },
};
</script>
