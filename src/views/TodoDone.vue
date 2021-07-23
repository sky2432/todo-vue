<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <b-spinner v-if="loading" variant="info" label="Loading..."></b-spinner>

      <div class="container" v-if="showTable">
        <ul>
          <li
            v-for="list in ListsForPaginate"
            :key="list.id"
            id="my-table"
            class="todo-line"
          >
            <div class="check-wrap">
              <b-icon
                icon="check2-square"
                class="done-check-icon"
                :id="`check-icon-target-${list.id}`"
                @click="returnTodo(list.id)"
              ></b-icon>
              <b-popover
                :target="`check-icon-target-${list.id}`"
                triggers="hover"
                placement="top"
              >
                戻す
              </b-popover>
            </div>

            <div class="todo-content-wrap">
              <div class="todo-txt-wrap">
                <span
                  :id="`popover-target-${list.id}`"
                  class="todo-txt done-todo"
                  >{{ cutLength(list.todo_list) }}</span
                >
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
                    :id="`todo-icon-target-${list.id}`"
                    class="mr-3 todo-icon"
                    icon="trash"
                    @click="deleteTodo(list.id)"
                  ></b-icon>
                </div>
                <b-popover
                  :target="`todo-icon-target-${list.id}`"
                  triggers="hover"
                  placement="top"
                >
                  削除
                </b-popover>

                <p class="todo-date mr-3 done-todo">
                  {{ convertDay(list.done_at) }}
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
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import BasePagination from "../components/BasePagination";
import todoListsDoneRepository from "../repositories/todoListsDoneRepository";
import { mapState } from "vuex";
import windowWidthHeightMixin from "../mixins/windowWidthHeightMixin";

export default {
  components: {
    TheHomeHeader,
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

    convertDay() {
      return function(done_at) {
        const day = new Date(done_at.replace(/-/g, "/"));
        const doneDay = `${day.getMonth() + 1} / ${day.getDate()}`;
        return doneDay;
      };
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
  },

  created() {
    this.showTodoDone();
  },

  methods: {
    async showTodoDone() {
      const resData = await todoListsDoneRepository.getTodo(this.loginUser.id);
      this.todoLists = resData.data.data;
      this.loading = false;
      this.showTable = true;
    },

    async returnTodo(id) {
      await todoListsDoneRepository.returnTodo(id);
      this.showTodoDone();
    },

    async deleteTodo(id) {
      await todoListsDoneRepository.deleteTodo(id);
      this.showTodoDone();
    },
  },
};
</script>

<style scoped>
.done-todo {
  color: grey;
  cursor: default;
}

.done-check-icon {
  cursor: pointer;
  margin-right: 5px;
  color: grey;
}

.done-check-icon:hover {
  color: black;
}
</style>
