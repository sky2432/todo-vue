<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="spinner-wrap" v-if="loading">
        <b-spinner
          variant="info"
          label="Loading..."
        ></b-spinner>
      </div>

      <div class="container" v-if="loaded">
        <div class="content">
          <div>
            <p>
              <img class="user-image" :src="createFileURL" />
            </p>
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <div class="todo">
          <p>Todo一覧</p>

          <div class="todo-wrap">
            <b-list-group>
              <b-list-group-item
                v-for="list in ListsForPaginate"
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
            <BasePagination
              :lists="todoLists"
              size="md"
              @paginate="ListsForPaginate = $event"
            ></BasePagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import BasePagination from "../components/BasePagination";
import usersRepository from "../repositories/usersRepository";
import todoListsRepository from "../repositories/todoListsRepository.js";
import windowWidthMixin from "../mixins/windowWidthMixin";

export default {
  components: {
    TheHomeHeader,
    BasePagination,
  },

  props: ["id"],
  mixins: [windowWidthMixin],

  data() {
    return {
      user: "",
      todoLists: [],
      ListsForPaginate: [],
      loading: true,
      loaded: false,
    };
  },

  computed: {
    createFileURL() {
      return "http://127.0.0.1:8000/storage/image/" + this.user.file_path;
    },

    chengeColor() {
      return function(list) {
        if (list.status === 1) {
          return "black";
        }
        if (list.status === 0) {
          return "grey";
        }
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
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.content {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 400px;
}

.todo {
  width: 50%;
  padding: 20px;
  height: 400px;
}

@media screen and (max-width: 768px) {
  .wrapper {
    display: block;
  }

  .container {
    height: auto;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
  }

  .content {
    width: 100%;
    height: auto;
  }

  .todo {
    width: 100%;
    height: auto;
  }
}
</style>
