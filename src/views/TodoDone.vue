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
        <table class="table">
          <tr>
            <th>Todo</th>
            <th>完了日</th>
            <th></th>
            <th></th>
          </tr>
          <tr
            class="list"
            v-for="list in itemsForList"
            :key="list.id"
            id="my-table"
          >
            <td class="done-todo" :id="`popover-target-${list.id}`">
              <b-icon icon="check2-square"></b-icon>
              {{ cutLength(list.todo_list) }}
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

            <td class="done-todo">
              {{ convertDay(list.done_at) }}
            </td>
            <td>
              <b-button variant="outline-info" size="sm" @click="returnTodo(list.id)"
                >戻す</b-button
              >
            </td>
            <td>
              <b-button variant="outline-info" size="sm" @click="deleteTodo(list.id)">
                <b-icon icon="trash"></b-icon>
                削除</b-button
              >
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
      </div>
    </div>
  </div>
</template>

<script>
import todoListsDoneRepository from "../repositories/todoListsDoneRepository";
import TheHomeHeader from "../components/TheHomeHeader";
import { mapState } from "vuex";
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
    };
  },

  computed: {
    ...mapState(["loginUser"]),

    convertDay() {
      return function(done_at) {
        const day = new Date(done_at);
        const doneDay =
          day.getFullYear() +
          "\t" +
          "/" +
          "\t" +
          (day.getMonth() + 1) +
          "\t" +
          "/" +
          "\t" +
          day.getDate();
        return doneDay;
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
}
.btn-wrap {
  text-align: center;
}
.line {
  border-color: #16a2b8;
}
</style>
