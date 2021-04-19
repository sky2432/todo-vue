<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <!-- ローディング -->
      <b-spinner
        class="loading"
        v-if="loading"
        label="Loading..."
        variant="info"
      ></b-spinner>

      <div class="container" v-if="showTable">
        <p class="user-name">
          {{ loginUser.name }}のTodoリスト<span class="ml-3">{{
            showToday
          }}</span>
        </p>
        <table class="table">
          <!-- Todoリストの表示 -->
          <thead>
            <tr style="width: 100%;">
              <th style="width: 50%;">Todo</th>
              <th style="width: 25%;">期限</th>
              <th style="width: 25%;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in itemsForList" :key="list.id" id="my-table">
              <td
                :style="{ color: checkDeadline(list.deadline) }"
                :id="`popover-target-${list.id}`"
              >
                <b-form-checkbox @change="checkTodo(list.id)">
                  {{ cutLength(list.todo_list) }}
                </b-form-checkbox>
              </td>

              <!-- Todo全文表示ポップオーバー -->
              <b-popover
                v-if="checkLength(list.todo_list)"
                :target="`popover-target-${list.id}`"
                triggers="hover"
                placement="top"
              >
                {{ list.todo_list }}
              </b-popover>

              <td :style="{ color: checkDeadline(list.deadline) }">
                {{ convertDeadline(list.deadline) }}
              </td>

              <!-- リマインド・編集ボタン -->
              <td class="edit-btn-wrap">
                <!-- リマインドボタン -->
                <b-button
                  class="mr-3"
                  variant="outline-info"
                  size="sm"
                  :id="`remind-target-${list.id}`"
                  v-if="list.remind_day !== null"
                >
                  <b-icon icon="alarm"></b-icon>
                </b-button>

                <!-- リマインドポップオーバー -->
                <b-popover
                  v-if="list.remind_day !== null"
                  :target="`remind-target-${list.id}`"
                  triggers="hover"
                  placement="top"
                >
                  {{ convertRemindDay(list.remind_day)
                  }}{{ convertRemindTime(list.remind_time) }}
                </b-popover>

                <!-- 編集ボタン -->
                <b-button
                  variant="outline-info"
                  size="sm"
                  v-b-modal.edit-modal
                  @click="showUpdateModal(list.id)"
                >
                  <b-icon icon="pencil-square"></b-icon>
                  編集
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ページネーション -->
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
          <b-button
            v-b-modal.add-modal
            variant="outline-info"
            @click="setToday"
          >
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
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import HomeAddModal from "../components/HomeAddModal";
import HomeEditModal from "../components/HomeEditModal";
import $_createToday from "../helpers/utile";
import $_createSpecificDate from "../helpers/utile";
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

    showToday() {
      const today = new Date();
      return (
        "本日:\t" + (today.getMonth() + 1) + "\t" + "/" + "\t" + today.getDate()
      );
    },

    //期限が過ぎたTodoは赤色で表示
    checkDeadline() {
      return function(deadline) {
        if (deadline === null) {
          return this.blackColor;
        }
        const todoDeadline = this.$_createSpecificDate(deadline);
        const today = this.$_createToday();
        if (today <= todoDeadline) {
          return this.blackColor;
        }
        if (today > todoDeadline) {
          return this.redColor;
        }
      };
    },

    checkLength() {
      return function(todo_list) {
        if (todo_list.length > 10) {
          return true;
        }
        return false;
      };
    },

    cutLength() {
      return function(todo_list) {
        if (todo_list.length > 10) {
          return todo_list.substr(0, 10) + "...";
        }
        return todo_list;
      };
    },

    // 期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
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

    convertRemindDay() {
      return function(remind_day) {
        if (remind_day !== null) {
          if (remind_day === 0) {
            return "当日\t";
          }
          if (remind_day === 1) {
            return "1日前\t";
          }
          if (remind_day === 2) {
            return "2日前\t";
          }
        }
      };
    },

    convertRemindTime() {
      return function(remind_time) {
        if (remind_time !== null) {
          if (remind_time.slice(0, 1) === "0") {
            return remind_time.slice(1, 5);
          }
          return remind_time.slice(0, 5);
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
    ...$_createSpecificDate,
    ...$_createTomorrow,

    //Todoリストの表示
    async showTodo() {
      const resData = await todoListsRepository.getTodo(this.loginUser.id);
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
      this.$refs.editModal.getTodoData(id);
    },

    //Todoの完了
    async checkTodo(id) {
      await todoListsRepository.checkTodo(id);
      this.showTodo();
    },
  },
};
</script>

<style scoped>
.user-name {
  color: rgb(133, 133, 133);
}
.btn-wrap {
  text-align: center;
}
.edit-btn-wrap {
  text-align: right;
}
.line {
  border-color: #16a2b8;
}
</style>
