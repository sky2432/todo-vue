<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="container">
      <p class="user-name">{{ loginUser.name }}のTodoリスト</p>
      <table class="table">
        <!-- Todoリストの表示 -->
        <tr>
          <th>Todo</th>
          <th>期限</th>
        </tr>
        <tr class="list" v-for="list in todoLists" :key="list.id">
          <td :style="{ color: checkDeadline(list.deadline) }">
            <b-form-checkbox @change="checkTodo(list.id)">
              {{ list.todo_list }}
            </b-form-checkbox>
          </td>
          <td>
            {{ convertDeadline(list.deadline) }}
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

      <HomeAddModal ref="addModal" @reload-todo="showTodo"></HomeAddModal>
      <HomeEditModal
        ref="editModal"
        @reload-todo="showTodo"
        :ParentTodoLists="todoLists"
      ></HomeEditModal>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import HomeAddModal from "../components/HomeAddModal";
import HomeEditModal from "../components/HomeEditModal";
import $_createToday from "../helpers/utile";
import todoListsRepository from "../repositories/todoListsRepository.js";
import { mapState } from "vuex";

export default {
  components: {
    TheHomeHeader,
    HomeAddModal,
    HomeEditModal,
  },
  data() {
    return {
      todoLists: [],
      isActive: false,
      redColor: "red",
      blackColor: "black",
    };
  },
  computed: {
    ...mapState(["loginUser"]),

    //期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
        if (deadline !== null) {
          const today = this.$_createToday();
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
        const today = this.$_createToday();
        if (today <= todoDeadline) {
          return this.blackColor;
        }
        if (today > todoDeadline) {
          return this.redColor;
        }
      };
    },
  },

  created() {
    this.showTodo();
  },

  methods: {
    ...$_createToday,

    //Todoリストの表示
    async showTodo() {
      const resData = await todoListsRepository.getTodo(this.loginUser.id);
      this.todoLists = resData.data.data;
    },

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

    setToday() {
      this.$refs.addModal.setToday();
    },

    //編集するTodoリストの取得
    showUpdateModal(id) {
      this.$refs.editModal.showUpdateModal(id);
    },

    //Todoの完了
    async checkTodo(id) {
      await todoListsRepository.deleteTodo(id);
      this.showTodo();
    },
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
