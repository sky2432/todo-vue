<template>
  <div id="home-app">
    <HomeHeader></HomeHeader>
    <div class="container">
      <p class="user-name">{{ showUserName }}のTodoリスト</p>
      <table class="table">
        <tr class="list" v-for="list in todoLists" :key="list.id">
          <td>
            <b-form-checkbox @change="checkTodo(list.id)">{{
              list.todo_list
            }}</b-form-checkbox>
          </td>
          <td class="edit-btn-wrap">
            <b-button
              variant="info"
              size="sm"
              v-b-modal.edit-modal
              @click="showUpdateModal(list.id)"
            >
              <b-icon icon="pencil-square"></b-icon>
              編集
            </b-button>
          </td>
        </tr>
      </table>

      <div class="btn-wrap">
        <b-button v-b-modal.add-modal variant="info">
          <b-icon icon="file-arrow-up"></b-icon>
          新規登録
        </b-button>
      </div>

      <div>
        <b-modal id="add-modal" centered title="新しいTodoを入力">
          <b-form-input v-model="newTodo"></b-form-input>

          <template #modal-footer>
            <b-button size="lg" variant="danger" @click="addCancel">
              キャンセル
            </b-button>
            <b-button size="lg" variant="info" @click="createTodo">
              登録
            </b-button>
          </template>
        </b-modal>
      </div>

      <div>
        <b-modal id="edit-modal" centered title="Todoを編集">
          <b-form-input v-model="updatedTodo"></b-form-input>

          <template #modal-footer>
            <b-button size="lg" variant="danger" @click="editCancel">
              キャンセル
            </b-button>
            <b-button size="lg" variant="info" @click="updateTodo">
              編集
            </b-button>
          </template>
        </b-modal>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import HomeHeader from "../components/HomeHeader";
export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      todoLists: [],
      newTodo: "",
      updatedTodo: "",
      updateTodoData: "",
    };
  },
  computed: {
    showUserName() {
      return this.$store.state.name.name;
    },
  },
  methods: {
    async showTodo() {
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/todo/" + this.$store.state.name.id
      );
      this.todoLists = resData.data.data;
    },
    showUpdateModal($id) {
      let index = "";
      for (index in this.todoLists) {
        let list = this.todoLists[index];
        if (list.id === $id) {
          this.updateTodoData = list;
          this.updatedTodo = list.todo_list;
        }
      }
    },
    async createTodo() {
      this.$bvModal.hide("add-modal");
      const sendData = {
        id: this.$store.state.name.id,
        todo: this.newTodo,
      };
      await axios.post("http://127.0.0.1:8000/api/todo", sendData);
      this.newTodo = "";
      this.showTodo();
    },
    async updateTodo() {
      this.$bvModal.hide("edit-modal");
      const sendData = {
        todo_list: this.updatedTodo,
      };
      await axios.put(
        "http://127.0.0.1:8000/api/todo/" + this.updateTodoData.id,
        sendData
      );
      this.showTodo();
    },
    async checkTodo($id) {
      await axios.delete("http://127.0.0.1:8000/api/todo/" + $id);
      this.showTodo();
    },
    addCancel() {
      this.$bvModal.hide("add-modal");
      this.newTodo = "";
    },
    editCancel() {
      this.$bvModal.hide("edit-modal");
    },
  },
  created() {
    this.showTodo();
  },
};
</script>

<style scoped>
/* todo-list */

.user-name {
  color: rgb(92, 92, 92);
}
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

.edit-btn-wrap {
  text-align: right;
}



</style>
