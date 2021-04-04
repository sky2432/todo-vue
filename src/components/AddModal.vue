<template>
  <div id="app">
    <!-- 登録モーダル -->
    <div>
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
            <!-- カレンダー -->
            <div class="">
              <b-calendar
                v-model="todoDeadline"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
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
    // 期限の初期値(今日)設定
    setToday() {
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
      // this.updatedTodoDeadline = "";
    },

    //設定ボタン
    setAddDeadline() {
      this.validateDeadline(this.todoDeadline);
    },

    validateDeadline(value) {
      const select = new Date(value);
      const selectDay = new Date(
        select.getFullYear(),
        select.getMonth(),
        select.getDate()
      );
      const today = this.createToday();
      if (today > selectDay) {
        this.showDeadlineError = true;
        this.deadlineError = "今日以降の日付を選択してください";
      } else {
        this.showPopover = false;
      }
    },

    //比較用の今日の日付を作成
    createToday() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return today;
    },

    // キャンセルボタン
    addCancel() {
      this.$bvModal.hide("add-modal");
      this.newTodo = "";
      this.todoDeadline = "";
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
      await axios.post("http://127.0.0.1:8000/api/todoLists", sendData);
      this.newTodo = "";
      this.todoDeadline = "";
      this.$emit("reload-todo");
    },
  },
};
</script>

<style></style>
