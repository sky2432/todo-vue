<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="container">
      <table class="table">
        <tr>
          <th>Todo</th>
          <th>完了日時</th>
          <th></th>
        </tr>
        <tr class="list" v-for="list in todoLists" :key="list.id">
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

      <div class="btn-wrap">
        <b-button type="submit" variant="info" @click="$router.push('/home')"
          >トップページへ</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import axios from "axios";
export default {
  components: {
    TheHomeHeader,
  },
  data() {
    return {
      todoLists: [],
    };
  },
  computed: {
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
  },
  watch: {
    myProperty: {
      immediate: true,
      handler() {
        this.showDoneTodo();
      },
    },
  },
  methods: {
    async showDoneTodo() {
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/doneTodoLists/" +
          this.$store.state.loginUser.id
      );
      this.todoLists = resData.data.data;
    },
    async returnTodo($id) {
      await axios.put("http://127.0.0.1:8000/api/doneTodoLists/" + $id);
      this.showDoneTodo();
    },
    async deleteTodo($id) {
      const deleteRes = await axios.delete(
        "http://127.0.0.1:8000/api/doneTodoLists/" + $id
      );
      console.log(deleteRes);
      this.showDoneTodo();
    },
  },
};
</script>

<style scoped>
/* todo-list */
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
</style>
