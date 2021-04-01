<template>
  <div id="app">
    <HomeHeader></HomeHeader>
    <div class="container">
      <p class="user-name">{{ showUserName }}のTodoリスト</p>
      <table class="table">
        <!-- Todoリストの表示 -->
        <tr>
          <th>Todo</th>
          <th>期限</th>
        </tr>
        <tr class="list" v-for="list in todoLists" :key="list.id">
          <td :style="{ color: checkDeadline(list.deadline) }">
            <b-form-checkbox @change="checkTodo(list.id)">{{
              list.todo_list
            }}</b-form-checkbox>
          </td>
          <td>
            {{ convertDeadline(list.deadline) }}
            <!-- {{ list.deadline }} -->
          </td>
          <!-- 編集ボタン -->
          <td class="edit-btn-wrap">
            <b-button
              variant="info"
              size="sm"
              v-b-modal.edit-modal
              @click="showUpdateModal(list.id)"
            >
              <b-icon icon="pencil-square"></b-icon>
              編集
            </b-button>
          </td>
        </tr>
      </table>

      <!-- 新規登録ボタン -->
      <div class="btn-wrap">
        <b-button v-b-modal.add-modal variant="info" @click="setToday">
          <b-icon icon="file-arrow-up"></b-icon>
          新規登録
        </b-button>
      </div>

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
                  @click="clearDeadlin"
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

      <!-- 編集モーダル -->
      <div>
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
                  @click="clearDeadlin"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HomeHeader from "../components/HomeHeader";
export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      todoLists: [],
      newTodo: "",
      updateTodoData: "",
      updatedTodo: "",
      todoDeadline: "",
      updatedTodoDeadline: "",
      deadlineError: "",
      showDeadlineError: false,
      showPopover: false,
      isActive: false,
      redColor: "red",
      blackColor: "black",
    };
  },
  computed: {
    // ユーザーネームの取得
    showUserName() {
      return this.$store.state.loginUser.name;
    },
    //期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
        if (deadline !== null) {
          const today = this.createToday();
          const todoDay = this.createDeadlineDate(deadline);
          const tommorrow = this.createTomorrow();
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
    //期限が過ぎたTodoは赤色で表示
    checkDeadline() {
      return function(deadline) {
        if (deadline === null) {
          return this.blackColor;
        }
        const todoDeadline = this.createDeadlineDate(deadline);
        const today = this.createToday();
        if (today <= todoDeadline) {
          return this.blackColor;
        } else {
          return this.redColor;
        }
      };
    },
  },
  methods: {
    //比較用の期限日の日付を作成
    createDeadlineDate(deadline) {
      const todo = new Date(deadline);
      const todoDeadline = new Date(
        todo.getFullYear(),
        todo.getMonth(),
        todo.getDate()
      );
      return todoDeadline;
    },
    //比較用の今日の日付を作成
    createToday() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return today;
    },
    //比較用の明日の日付を作成
    createTomorrow() {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      return tomorrow;
    },
    // 期限設定ポップオーバー
    setAddDeadline() {
      this.validateDeadline(this.todoDeadline);
    },
    setUpdateDeadline() {
      this.validateDeadline(this.updatedTodoDeadline);
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
    //期限エラーのリセット
    resetDeadlineError() {
      this.showDeadlineError = false;
    },
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
    //期限なしボタン
    clearDeadlin() {
      this.showPopover = false;
      this.todoDeadline = "";
      this.updatedTodoDeadline = "";
    },

    //Todoリストの表示
    async showTodo() {
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/todo/" + this.$store.state.loginUser.id
      );
      this.todoLists = resData.data.data;
    },
    //編集するTodoリストの取得
    showUpdateModal($id) {
      let index = "";
      for (index in this.todoLists) {
        let list = this.todoLists[index];
        if (list.id === $id) {
          this.updateTodoData = list;
          this.updatedTodo = list.todo_list;
          this.updatedTodoDeadline = list.deadline;
        }
      }
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
      await axios.post("http://127.0.0.1:8000/api/todo", sendData);
      this.newTodo = "";
      this.todoDeadline = "";
      this.showTodo();
    },
    //Todoリストを編集
    async updateTodo() {
      this.$bvModal.hide("edit-modal"); //編集モーダルを閉じる
      const sendData = {
        todo_list: this.updatedTodo,
        deadline: this.updatedTodoDeadline,
      };
      await axios.put(
        "http://127.0.0.1:8000/api/todo/" + this.updateTodoData.id,
        sendData
      );
      this.showTodo();
    },
    //Todoの完了
    async checkTodo($id) {
      await axios.delete("http://127.0.0.1:8000/api/todo/" + $id);
      this.showTodo();
    },
    // 新規登録モーダルのキャンセルボタン
    addCancel() {
      this.$bvModal.hide("add-modal");
      this.newTodo = "";
      this.todoDeadline = "";
    },
    // 編集モーダルのキャンセルボタン
    editCancel() {
      this.$bvModal.hide("edit-modal");
    },
  },
  created() {
    this.showTodo();
  },
};
</script>

<style scoped>
.user-name {
  color: rgb(133, 133, 133);
}
.container {
  width: 50%;
  margin: 0 auto;
  background-color: #f0f0f0;
  margin-top: 150px;
  margin-bottom: 100px;
  padding: 20px;
  box-shadow: 0 7px #e1e0e0;
}
.list {
  border-bottom: 1px solid #16a2b8;
  margin-bottom: 15px;
}
.btn-wrap {
  text-align: center;
}
.edit-btn-wrap {
  text-align: right;
}
</style>
