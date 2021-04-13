<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="loading-container" v-if="loading">
      <b-spinner label="Loading..." class="loading" variant="info"></b-spinner>
    </div>
    <div class="container" v-if="showTable">
      <p class="user-name">{{ loginUser.name }}のTodoリスト</p>
      <table class="table">
        <!-- Todoリストの表示 -->
        <tr>
          <th>Todo</th>
          <th style="text-align: right">期限</th>
        </tr>
        <tr class="list" v-for="list in itemsForList" :key="list.id" id="my-table">
          <td :style="{ color: checkDeadline(list.deadline) }">
            <b-form-checkbox @change="checkTodo(list.id)">
              {{ list.todo_list }}
            </b-form-checkbox>
          </td>
          <td style="text-align: right">
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

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="center"
        class="mt-3"
        size="sm"
        pills
      >
        <template #first-text><span class="text-info">«</span></template>
        <template #prev-text><span class="text-info">‹</span></template>
        <template #next-text><span class="text-info">›</span></template>
        <template #last-text><span class="text-info">»</span></template>
      </b-pagination>

      <hr class="line" />

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
import $_createDeadlineDate from "../helpers/utile";
import $_createTomorrow from "../helpers/utile";
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
      loading: true,
      showTable: false,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["loginUser"]),

    // 期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
        if (deadline !== null) {
          const today = this.$_createToday();
          const todoDay = this.$_createDeadlineDate(deadline);
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

    //期限が過ぎたTodoは赤色で表示
    checkDeadline() {
      return function(deadline) {
        if (deadline === null) {
          return this.blackColor;
        }
        const todoDeadline = this.$_createDeadlineDate(deadline);
        const today = this.$_createToday();
        if (today <= todoDeadline) {
          return this.blackColor;
        }
        if (today > todoDeadline) {
          return this.redColor;
        }
      };
    },

    rows() {
      return this.todoLists.length;
    },

    itemsForList() {
      return this.todoLists.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },

  created() {
    this.showTodo();
  },

  methods: {
    ...$_createToday,
    ...$_createDeadlineDate,
    ...$_createTomorrow,

    //Todoリストの表示
    async showTodo() {
      const resData = await todoListsRepository.getTodayTodo(this.loginUser.id);
      this.todoLists = resData.data.data;
      this.loading = false;
      this.showTable = true;
    },

    // 新規登録ボタン
    setToday() {
      this.$refs.addModal.setToday();
    },

    // 編集ボタン
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
  margin-top: 50px;
  margin-bottom: 100px;
  padding: 20px;
  box-shadow: 0 7px #e1e0e0;
}
.list {
  margin-bottom: 15px;
}
.btn-wrap {
  text-align: center;
}
.edit-btn-wrap {
  text-align: right;
}
.loading-container {
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 80vh;
}
.loading {
  justify-self: center;
  align-self: center;
}
.line {
  border-color: #16a2b8;
}
</style>