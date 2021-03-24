<template>
  <div id="app">
    <header>
      <h1 class="logo">Todo list</h1>
      <ul class="nav-items">
        <li class="nav-item">マイページ</li>
        <li class="nav-item logout" @click="$router.push({ name: 'TopPage' })">
          ログアウト
        </li>
      </ul>
    </header>
    <div class="container">
      <b-form-checkbox
        v-for="list in filteredLists"
        :key="list.id"
        class="list"
      >
        <p>{{ list.todo_list }}</p>
      </b-form-checkbox>
      <div class="btn-wrap">
        <b-button type="submit" variant="info" @click="change"
          >新規登録</b-button
        >
      </div>
      <div id="overlay" v-if="show">
        <div id="content">
          <b-form-input
            v-model="todo"
            placeholder="新しいTodoを入力"
          ></b-form-input>
          <b-button class="add-btn" variant="info" @click="insertTodo"
            >登録</b-button
          >
          <b-button class="cancel-btn" variant="info" @click="change"
            >キャンセル</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      todo: "",
      todoLists: [],
      filteredLists: [],
    };
  },
  methods: {
    async getTodo() {
      const resData = await axios.get("http://127.0.0.1:8003/api/todo");
      this.todoLists = resData.data.data;
      this.filterList();
    },
    filterList() {
      let index = "";
      for (index in this.todoLists) {
        let list = this.todoLists[index];
        if (list.member_id === 1) {
          this.filteredLists.push(list);
        }
      }
    },
    async insertTodo() {
      const sendData = {
        id: 1,
        todo: this.todo,
      };
      await axios.post("http://127.0.0.1:8003/api/todo", sendData);
      this.change();
    },
    change() {
      this.show = !this.show;
    },
  },
  created() {
    this.getTodo();
  },
};
</script>

<style scoped>
header {
  height: 70px;
  background-color: #16a2b8;
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
}
.logo {
  padding-left: 20px;
}
.nav-items {
  display: flex;
  list-style: none;
}
.nav-item {
  padding-right: 20px;
}
.logout {
  cursor: pointer;
}
.container {
  width: 50%;
  margin: 0 auto;
  background-color: #dbdbdb;
  margin-top: 100px;
  padding: 20px;
}
.btn-wrap {
  text-align: center;
}

.list {
  border-bottom: 1px solid #16a2b8;
}

.list {
  margin-bottom: 15px;
}
.btn-wrap {
  text-align: center;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  text-align: center;
  z-index: 2;
  width: 30%;
  padding: 10px;
  background: #fff;
}
.add-btn {
  margin-top: 10px;
  margin-right: 20px;
}

.cancel-btn {
  margin-top: 10px;
}
</style>
