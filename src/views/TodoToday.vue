<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <b-spinner
        v-if="loading"
        label="Loading..."
        class="loading"
        variant="info"
      ></b-spinner>
      <div class="container" v-if="showTable">
        <p class="display-today">
          {{ showToday }}
        </p>

        <ul>
          <li
            v-for="list in itemsForList"
            :key="list.id"
            id="my-table"
            class="todo-line"
          >
            <div class="check-wrap">
              <b-form-checkbox
                @change="checkTodo(list.id)"
                class="check-box"
              ></b-form-checkbox>
            </div>

            <div
              class="todo-content-wrap"
              v-b-modal.edit-modal
              @click="showUpdateModal(list.id)"
            >
              <div class="todo-txt-wrap">
                <span :id="`popover-target-${list.id}`" class="todo-txt">{{
                  cutLength(list.todo_list)
                }}</span>
                <b-popover
                  v-if="checkLength(list.todo_list)"
                  :target="`popover-target-${list.id}`"
                  triggers="hover"
                  placement="top"
                >
                  {{ list.todo_list }}
                </b-popover>
              </div>

              <div class="todo-icon-date-wrap">
                <div class="todo-icon-wrap">
                  <b-icon
                    icon="alarm"
                    class="mr-3 todo-icon"
                    :id="`todo-icon-target-${list.id}`"
                    v-if="list.remind_day !== null"
                  ></b-icon>
                </div>
                <!-- リマインドポップオーバー -->
                <b-popover
                  v-if="list.remind_day !== null"
                  :target="`todo-icon-target-${list.id}`"
                  triggers="hover"
                  placement="top"
                >
                  リマインド：{{ convertRemindDay(list.remind_day)
                  }}{{ convertRemindTime(list.remind_time) }}
                </b-popover>

                <p class="todo-date mr-3">
                  {{ convertDeadline(list.deadline) }}
                </p>
              </div>
            </div>
          </li>
        </ul>

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
        <div class="add-btn-wrap">
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
import todoListsRepository from "../repositories/todoListsRepository.js";
import { mapState } from "vuex";
import $_createToday from "../helpers/utile";
import $_createSpecificDate from "../helpers/utile";
import $_isLongLength from "../helpers/utile";
import $_cutLength from "../helpers/utile";

export default {
  components: {
    TheHomeHeader,
    HomeAddModal,
    HomeEditModal,
  },
  data() {
    return {
      todoLists: [],
      loading: true,
      showTable: false,
      perPage: 5,
      currentPage: 1,
      width: window.innerWidth,
    };
  },
  computed: {
    ...mapState(["loginUser"]),

    showToday() {
      const today = new Date();
      return `本日：${today.getMonth() + 1} / ${today.getDate()}`;
    },

    checkLength() {
      return function(todo_list) {
        return this.$_isLongLength(todo_list, this.width);
      };
    },

    cutLength() {
      return function(todo_list) {
        return this.$_cutLength(todo_list, this.width);
      };
    },

    // 期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
        if (deadline !== null) {
          const today = this.$_createToday();
          const todoDay = this.$_createSpecificDate(deadline);
          if (today.getTime() === todoDay.getTime()) {
            return "今日";
          }
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

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...$_createToday,
    ...$_createSpecificDate,
    ...$_isLongLength,
    ...$_cutLength,

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
      this.$refs.editModal.getTodoData(id);
    },

    //Todoの完了
    async checkTodo(id) {
      await todoListsRepository.checkTodo(id);
      this.showTodo();
    },

    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>
