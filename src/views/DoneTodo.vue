<template>
  <div id="app">
    <HomeHeader></HomeHeader>
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
            {{ list.updated_at }}
          </td>
          <td>
            <b-button variant="info" size="sm" @click="returnTodo(list.id)"
              >戻す</b-button
            >
          </td>
          <td> <b-button variant="info" size="sm" @click="deleteTodo(list.id)"
              >
              <b-icon icon="trash"></b-icon>
              削除</b-button
            ></td>
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
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      todoLists: [],
    };
  },
  methods: {
    async showDoneTodo() {
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/doneTodo/" + this.$store.state.name.id
      );
      this.todoLists = resData.data.data;
    },
    async returnTodo($id) {
      await axios.put("http://127.0.0.1:8000/api/doneTodo/" + $id);
      this.showDoneTodo();
    },
    async deleteTodo($id) {
      const deleteRes =  await axios.delete("http://127.0.0.1:8000/api/doneTodo/" + $id);
      console.log(deleteRes);
      this.showDoneTodo();
    },

  },
  created() {
    this.showDoneTodo();
  },
};
</script>

<style scoped>
/* todo-list */
.container {
  width: 50%;
  margin: 0 auto;
  background-color: #dbdbdb;
  margin-top: 100px;
  padding: 20px;
}

.list {
  border-bottom: 1px solid #16a2b8;
  margin-bottom: 15px;
}

.btn-wrap {
  text-align: center;
}
</style>
