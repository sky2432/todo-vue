<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <b-spinner v-if="loading" variant="info" label="Loading..."></b-spinner>

      <div class="container" v-if="showTable">
        <p class="display-today">
          {{ showToday }}
        </p>

        <ul>
          <li
            v-for="list in ListsForPaginate"
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

        <BasePagination
          :lists="todoLists"
          @paginate="ListsForPaginate = $event"
        ></BasePagination>

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
import BasePagination from "../components/BasePagination";
import todoListsRepository from "../repositories/todoListsRepository.js";
import { mapState } from "vuex";
import windowWidthHeightMixin from "../mixins/windowWidthHeightMixin";

export default {
  components: {
    TheHomeHeader,
    HomeAddModal,
    HomeEditModal,
    BasePagination,
  },

  mixins: [windowWidthHeightMixin],

  data() {
    return {
      todoLists: [],
      ListsForPaginate: [],
      loading: true,
      showTable: false,
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
        return this.$helpers.$_isLongLength(todo_list, this.width);
      };
    },

    cutLength() {
      return function(todo_list) {
        return this.$helpers.$_cutLength(todo_list, this.width);
      };
    },

    // 期限日の表示を変える
    convertDeadline() {
      return function(deadline) {
        if (deadline !== null) {
          const today = this.$helpers.$_createToday();
          const todoDay = this.$helpers.$_createSpecificDate(deadline);
          if (today.getTime() === todoDay.getTime()) {
            return "今日";
          }
        }
      };
    },

    convertRemindDay() {
      return function(remind_day) {
        return this.$helpers.$_convertRemindDay(remind_day);
      };
    },

    convertRemindTime() {
      return function(remind_time) {
        return this.$helpers.$_convertRemindTime(remind_time);
      };
    },
  },

  created() {
    this.showTodo();
  },

  methods: {
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
  },
};
</script>
