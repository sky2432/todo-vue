<template>
  <div id="app">
    <div class="content">
      <div>
        <div class="mb-1">
          <b-alert show variant="danger">
            <h3>必ずご確認ください</h3>
            <p>
              アカウントを削除すると、これまでのデータはすべて削除されます。
            </p>
          </b-alert>
          <b-button v-b-modal.delete-confirm-modal variant="danger"
            >アカウントを削除</b-button
          >
        </div>
      </div>
      <b-modal id="delete-confirm-modal" title="確認" centered>
        <p class="my-4">本当に削除しますか？</p>
        <template #modal-footer>
          <b-button size="lg" variant="danger" @click="deleteUser">
            はい
          </b-button>
          <b-button size="lg" variant="info" @click="deleteCancel">
            いいえ
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    async deleteUser() {
      const userId = this.$store.state.loginUser.id;
      await axios.delete("http://127.0.0.1:8000/api/users/" + userId);
      this.logout();
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteCancel() {
      this.$bvModal.hide("delete-confirm-modal");
    },
  },
};
</script>

<style scoped>
.content {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
</style>
