<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <b-spinner v-if="loading" variant="info" label="Loading..."></b-spinner>

      <div class="container" v-if="showTable">
        <ul>
          <li
            v-for="user in ListsForPaginate"
            :key="user.id"
            id="my-table"
            class="user-line"
          >
            <div class="user-id">
              {{ user.id }}
            </div>
            <div
              class="user-data"
              v-b-modal.edit-modal
              @click="moveUserDeatail(user.id)"
            >
              <div class="user-name">
                <img class="user-image" :src="user.file_path" />
                {{ user.name }}
              </div>

              <div class="user-email-wrap">
                <i
                  class="far fa-envelope"
                  :id="`popover-target-${user.id}`"
                ></i>
                <span class="user-email">{{ user.email }}</span>
              </div>

              <b-popover
                v-if="width < 576"
                :target="`popover-target-${user.id}`"
                triggers="hover"
                placement="top"
              >
                {{ user.email }}
              </b-popover>
            </div>
          </li>
        </ul>

        <BasePagination
          :lists="users"
          size="md"
          @paginate="ListsForPaginate = $event"
        ></BasePagination>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import BasePagination from "../components/BasePagination";
import usersRepository from "../repositories/usersRepository";
import windowWidthHeightMixin from "../mixins/windowWidthHeightMixin";

export default {
  components: {
    TheHomeHeader,
    BasePagination,
  },

  mixins: [windowWidthHeightMixin],

  data() {
    return {
      users: [],
      ListsForPaginate: [],
      loading: true,
      showTable: false,
    };
  },

  created() {
    this.getUser();
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
.user-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

.user-line {
  display: flex;
}

.user-line:hover {
  cursor: pointer;
  border-radius: 5px;
  background-color: #daf0f3;
}

.user-id {
  width: 50px;
  padding: 15px 0px 15px 10px;
  color: #16a2b8;
}

.user-data {
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
  padding: 15px 0;
}

.user-name {
  width: 40%;
}

.user-email-wrap {
  width: 60%;
}

.fa-envelope {
  padding-right: 10px;
  color: #16a2b8;
}

@media screen and (max-width: 576px) {
  .user-email-wrap {
    text-align: right;
    padding-right: 10px;
  }

  .user-email {
    display: none;
  }
}
</style>
