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
        <ul>
          <li
            v-for="list in itemsForList"
            :key="list.id"
            id="my-table"
            class="todo-line"
          >
            <div class="check-wrap">
              <b-icon
                icon="check2-square"
                class="done-check-icon"
                @click="returnTodo(list.id)"
              ></b-icon>
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
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import todoListsDoneRepository from "../repositories/todoListsDoneRepository";
import { mapState } from "vuex";
import $_isLongLength from "../helpers/utile";
import $_cutLength from "../helpers/utile";
export default {
  components: {
    TheHomeHeader,
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

    convertDay() {
      return function(done_at) {
        const day = new Date(done_at);
        const doneDay = `${day.getMonth() + 1} / ${day.getDate()}`;
        return doneDay;
      };
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
    this.showTodoDone();
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...$_isLongLength,
    ...$_cutLength,

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

    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.done-todo {
  color: grey;
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
