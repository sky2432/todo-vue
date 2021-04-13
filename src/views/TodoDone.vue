<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="loading-container" v-if="loading">
      <b-spinner label="Loading..." class="loading" variant="info"></b-spinner>
    </div>
    <div class="container" v-if="showTable">
      <table class="table">
        <tr>
          <th>Todo</th>
          <th>完了日</th>
          <th></th>
        </tr>
        <tr class="list" v-for="list in itemsForList" :key="list.id" id="my-table">
          <td>
            {{ list.todo_list }}
          </td>
          <td>
            {{ convertDay(list.updated_at) }}
          </td>
          <td>
            <b-button variant="info" size="sm" @click="returnTodo(list.id)"
              >戻す</b-button
            >
          </td>
          <td>
            <b-button variant="info" size="sm" @click="deleteTodo(list.id)">
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

      <div class="btn-wrap">
        <b-button type="submit" variant="info" @click="$router.push('/home')"
          >トップページへ</b-button
        >
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
      return function(updateDay) {
        const day = new Date(updateDay);
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
