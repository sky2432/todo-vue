<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="container row">
        <div class="content col-6">
          <div>
            <p>
              <img class="userImage" :src="createFileURL" />
            </p>
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <div class="todo col-6">
          <p>Todo一覧</p>

          <div v-if="loading" class="loading-container">
            <b-spinner
              label="Loading..."
              class="loading"
              variant="info"
            ></b-spinner>
          </div>

          <div v-if="showTable" class="todo-wrap">
            <b-list-group>
              <b-list-group-item
                v-for="list in itemsForList"
                :key="list.id"
                :style="{ color: chengeColor(list) }"
                id="my-table"
              >
                <div :id="`popover-target-${list.id}`">
                  <b-icon
                    icon="check2-square"
                    v-if="list.status === 0"
                  ></b-icon>
                  <b-icon icon="square" v-if="list.status === 1"></b-icon>
                  {{ cutLength(list.todo_list) }}
                </div>

                <!-- Todo全文表示ポップオーバー -->
                <b-popover
                  v-if="checkLength(list.todo_list)"
                  :target="`popover-target-${list.id}`"
                  triggers="hover"
                  placement="top"
                >
                  {{ list.todo_list }}
                </b-popover>
              </b-list-group-item>
            </b-list-group>

            <!-- ページネーション -->
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              align="center"
              class="mt-3"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import usersRepository from "../repositories/usersRepository";
import todoListsRepository from "../repositories/todoListsRepository.js";

export default {
  props: ["id"],
  components: {
    TheHomeHeader,
  },

  data() {
    return {
      user: "",
      todoLists: [],
      perPage: 5,
      currentPage: 1,
      greyColor: "grey",
      blackColor: "black",
      loading: true,
      showTable: false,
    };
  },

  computed: {
    createFileURL() {
      return "http://127.0.0.1:8000/storage/image/" + this.user.file_path;
    },

    chengeColor() {
      return function(list) {
        if (list.status === 1) {
          return this.blackColor;
        }
        if (list.status === 0) {
          return this.greyColor;
        }
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
    this.showUser();
    this.showTodo();
  },

  methods: {
    async showUser() {
      const resData = await usersRepository.showUser(this.id);
      this.user = resData.data.data;
    },
    async showTodo() {
      const resData = await todoListsRepository.getUserTodo(this.id);
      this.todoLists = resData.data.data;
      this.loading = false;
      this.showTable = true;
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 400px;
}
.userImage {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
.todo {
  padding: 20px;
  height: 400px;
  position: relative;
}
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
