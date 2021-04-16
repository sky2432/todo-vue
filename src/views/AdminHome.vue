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
          <p>ユーザー管理</p>
          <!-- Todoリストの表示 -->
          <tr>
            <th>id</th>
            <th></th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th></th>
          </tr>
          <tr
            class="list"
            v-for="user in itemsForList"
            :key="user.id"
            id="my-table"
          >
            <td>
              {{ user.id }}
            </td>
            <td style="text-align: right">
              <img class="userImage" :src="createFileURL(user.file_path)" />
            </td>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ user.email }}
            </td>
            <!-- 詳細ボタン -->
            <td class="detail-btn-wrap">
              <b-button
                variant="outline-info"
                size="sm"
                @click="moveUserDeatail(user.id)"
              >
                <b-icon icon="pencil-square"></b-icon>
                詳細
              </b-button>
            </td>
          </tr>
        </table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          class="mt-4"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import usersRepository from "../repositories/usersRepository";

export default {
  components: {
    TheHomeHeader,
  },
  data() {
    return {
      users: [],
      loading: true,
      showTable: false,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    createFileURL() {
      return function(file_path) {
        return "http://127.0.0.1:8000/storage/image/" + file_path;
      };
    },
    rows() {
      return this.users.length;
    },
    itemsForList() {
      return this.users.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },

  created() {
    this.getUser();
    console.log("created");
  },

  methods: {
    async getUser() {
      const resData = await usersRepository.getUser();
      this.users = resData.data.data;
      this.loading = false;
      this.showTable = true;
    },
    moveUserDeatail(userId) {
      this.$router.push({
        name: "AdminUsers",
        params: {
          id: userId,
        },
      });
    },
  },
};
</script>

<style scoped>
.user-name {
  color: rgb(133, 133, 133);
}
.table {
  border-bottom: 1px solid #16a2b8;
}
.btn-wrap {
  text-align: center;
}
.detail-btn-wrap {
  text-align: right;
}
.userImage {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
